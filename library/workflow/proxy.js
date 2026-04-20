import http from 'http';
import https from 'https';
import { URL } from 'url';

const PORT = process.env.PORT || 3000;

const HOP_BY_HOP = new Set([
    'connection',
    'keep-alive',
    'proxy-authenticate',
    'proxy-authorization',
    'te',
    'trailers',
    'transfer-encoding',
    'upgrade',
    'host',
    'x-proxy-target'
]);

// Strip ALL access-control-* headers from target response — proxy owns these
function isCorsSensitiveHeader(key) {
    const lower = key.toLowerCase();
    return lower.startsWith('access-control-');
}

const server = http.createServer((req, res) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(204, buildCorsHeaders(req));
        return res.end();
    }

    const targetUrl = req.headers['x-proxy-target'] || new URL(req.url, `http://localhost`).searchParams.get('url');

    if (!targetUrl) {
        res.writeHead(400, { 'Content-Type': 'text/plain', ...buildCorsHeaders(req) });
        return res.end('Missing target URL.');
    }

    let parsedTarget;
    try {
        parsedTarget = new URL(targetUrl);
    } catch {
        res.writeHead(400, { 'Content-Type': 'text/plain', ...buildCorsHeaders(req) });
        return res.end(`Invalid target URL: ${targetUrl}`);
    }

    const protocol = parsedTarget.protocol === 'https:' ? https : http;

    const forwardedHeaders = {};
    for (const [key, value] of Object.entries(req.headers)) {
        const lower = key.toLowerCase();
        if (!HOP_BY_HOP.has(lower) && !isCorsSensitiveHeader(lower)) {
            forwardedHeaders[key] = value;
        }
    }
    forwardedHeaders['host'] = parsedTarget.host;

    const options = {
        hostname: parsedTarget.hostname,
        port: parsedTarget.port || (parsedTarget.protocol === 'https:' ? 443 : 80),
        path: parsedTarget.pathname + parsedTarget.search,
        method: req.method,
        headers: forwardedHeaders
        // Follow redirects manually so we can rewrite headers at each hop
    };

    console.log(`[PROXY] ${req.method} ${targetUrl}`);

    const proxyReq = protocol.request(options, (proxyRes) => {
        // Handle redirects — re-proxy the location URL so CORS headers stay consistent
        if ([301, 302, 303, 307, 308].includes(proxyRes.statusCode) && proxyRes.headers['location']) {
            const location = proxyRes.headers['location'];
            // Consume the body to free the socket
            proxyRes.resume();
            const absLocation = location.startsWith('http') ? location : new URL(location, targetUrl).href;
            const corsHeaders = buildCorsHeaders(req);
            res.writeHead(proxyRes.statusCode, {
                ...corsHeaders,
                // Rewrite Location to go back through the proxy
                location: `http://localhost:${PORT}/?url=${encodeURIComponent(absLocation)}`
            });
            return res.end();
        }

        console.log(`[PROXY] Response: ${proxyRes.statusCode}`);

        const responseHeaders = {};
        for (const [key, value] of Object.entries(proxyRes.headers)) {
            // Drop ALL CORS headers from target — proxy sets its own
            if (!isCorsSensitiveHeader(key.toLowerCase())) {
                responseHeaders[key] = value;
            }
        }

        // Proxy owns all CORS headers — always echo exact origin
        Object.assign(responseHeaders, buildCorsHeaders(req));

        res.writeHead(proxyRes.statusCode, responseHeaders);
        proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
        console.error(`[PROXY] Error: ${err.message}`);
        if (!res.headersSent) {
            res.writeHead(502, { 'Content-Type': 'text/plain', ...buildCorsHeaders(req) });
            res.end(`Proxy error: ${err.message}`);
        }
    });

    req.pipe(proxyReq, { end: true });
});

function buildCorsHeaders(req) {
    const origin = req.headers['origin'] || 'http://localhost';
    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers':
            'Content-Type, Authorization, Cookie, X-Proxy-Target, X-Request-ID, X-Correlation-ID, Accept, Accept-Language, Cache-Control',
        'Access-Control-Expose-Headers': 'Content-Disposition, Content-Length, X-Request-ID'
    };
}

server.listen(PORT, () => {
    console.log(`Proxy server listening on http://localhost:${PORT}`);
});
