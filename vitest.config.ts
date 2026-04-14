import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom', // Same as testEnvironment: 'jsdom' in Jest
        globals: true, // Lets you use describe/it/expect without imports
        include: ['**/*.{test,spec}.{ts,tsx,js,jsx}'] // Same pattern as your old testRegex
    }
});
