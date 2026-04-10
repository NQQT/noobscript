import { asStory } from '../story';

type StorybookParameters = {
    (): { [key: string]: any };
    // tslint:disable-next-line:unified-signatures
    (input?: { [key: string]: any }): { [key: string]: any };
};

export const $parameters: StorybookParameters = ((parameters: any) => {
    const context = asStory();

    const currentParameters = (context.parameters ||= {});

    Object.assign(currentParameters, parameters);

    return currentParameters;
}) as any;
