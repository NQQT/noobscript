type Config = {};

type Callback = () => Promise<boolean | void>;

export type ScriptManager = (config?: Config) => {
    (script: Callback): void;
    kill: () => void;
};

export const scriptManager: ScriptManager = (config = {}) => {
    type ScriptEntry = { index: number; callback: Callback };

    let insertionCounter = 0;
    const queue: ScriptEntry[] = [];
    let killed = false;
    let isRunning = false;

    const runNext = async () => {
        if (isRunning || killed || queue.length === 0) return;
        isRunning = true;

        const entry = queue.shift()!;
        const result = await entry.callback();

        if (result === false) {
            queue.push(entry);
        }

        isRunning = false;

        // Schedule the next script only if queue still has items
        if (queue.length > 0 && !killed) {
            setTimeout(runNext, 0);
        }
    };

    const handler = (script: Callback) => {
        if (killed) return;
        queue.push({ index: insertionCounter++, callback: script });
        // Only kick off if not already running
        if (!isRunning) setTimeout(runNext, 0);
    };

    Object.assign(handler, {
        kill: () => {
            killed = true;
            queue.length = 0;
        }
    });

    return handler as ReturnType<ScriptManager>;
};
