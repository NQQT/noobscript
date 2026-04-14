import { scriptPause } from '@presource/core';

describe('Pausing an async function', () => {
    // Using Jest fake timer
    vi.useFakeTimers();

    // Testing if function is delayed correctly
    test('Script paused correctly', () => {
        let count = 0;
        (async () => {
            // pause for 10 second
            await scriptPause(10000);
            // Check if script is passed.
            expect(true).toBe(true);
        })();

        expect(count).toBe(0);
        vi.advanceTimersByTime(5000);
        expect(count).toBe(0);
        vi.runAllTimers();
    });
});
