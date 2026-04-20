import meta, { StateHook } from './state.stories';
import { interactionTestRunner } from '@library/test';
// import userEvent from '@testing-library/user-event';

describe('React StateHook Interaction Test', () => {
    interactionTestRunner(meta, {
        StateHook
    });
});
