import { Args, Story } from '@storybook/react';
import {
  userEvent as storybookUser,
  waitFor as storybookWaitFor,
  within as storybookWithin,
} from '@storybook/testing-library';
import { expect as storybookExpect } from '@storybook/jest';
import { arrayEach, typeSwitch } from '@library/presource';

/** To Set up a Storybook Template */
export const storybookSetupTemplate = (Template: Story) => {
  return (...data: any[]): Story<Args> => {
    const variant: any = Template.bind({});

    // Scanning through the array
    arrayEach(data, ({ value: entry }) => {
      typeSwitch(entry, {
        function: ({ value: callback }: any) => {
          variant.play = async (interactionData: any) => {
            if (interactionData.canvasElement) {
              await callback({
                screen: storybookWithin(interactionData.canvasElement),
                user: storybookUser,
                expect: storybookExpect,
                waitFor: storybookWaitFor,
              });
            }
          };
        },
        // !Task: Fill in Object Query
        // object: () => {},
      });
    });
    // Returning the Template Variant
    return variant;
  };
};
