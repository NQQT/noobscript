import { storybookTestRunner } from '@library/test';
import * as stories from './state.stories';
import { describe } from 'vitest';

describe('React StateHook Interaction Test', () => {
    storybookTestRunner(stories);
});
