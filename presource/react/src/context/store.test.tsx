import * as stories from './store.stories';
import { storybookTestRunner } from '@library/test';
// import userEvent from '@testing-library/user-event';

describe('React Context Store Interaction Test', () => {
    storybookTestRunner(stories);
});
