import { $memory } from '../constant';

type StorybookStep = (title: string, step: () => Promise<void | HTMLElement>) => Promise<void>;
export const $step: StorybookStep = async (title, stepCallback) => {
    // Normal story step
    await $memory().playContext?.step(title, stepCallback as any);
};
