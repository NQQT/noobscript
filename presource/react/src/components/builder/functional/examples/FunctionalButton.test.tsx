import * as stories from './FunctionalButton.stories';
import { storybookTestRunner } from '@library/test';

describe('FunctionalButton Interaction Test', () => {
    storybookTestRunner(stories);
});
