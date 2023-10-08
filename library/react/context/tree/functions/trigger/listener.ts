/** Triggering the Listeners */
import { arrayEach } from '@library/presource/js/array/each';

export const triggerListenerFunction = (context: any, fields: string[]) =>
  arrayEach(fields, ({ v }) => {
    // Triggering the Listerner
    context.listener[v]?.forEach((trigger: any) => trigger({}));
  });
