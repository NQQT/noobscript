import { signalState } from '@presource/react';
import { act, renderHook } from '@testing-library/react';

describe('How to use signal correctly', () => {
    it('should cause re-rendering to happen', () => {
        const animal = signalState('cat');

        let renderCounter = 0;
        const { result } = renderHook(() => {
            renderCounter++;
            return animal();
        });

        expect(renderCounter).toBe(1);
        expect(result.current).toBe('cat');

        // You can also use the portal method to execute
        act(() => {
            animal('dog');
        });

        expect(renderCounter).toBe(2);
        expect(result.current).toBe('dog');
    });
});
