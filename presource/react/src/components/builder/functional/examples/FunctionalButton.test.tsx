import meta, { FunctionalButton } from './FunctionalButton.stories';
import { interactionTestRunner } from '@library/test';

describe('FunctionalButton Interaction Test', () => {
    interactionTestRunner(meta, {
        FunctionalButton
    });
});
