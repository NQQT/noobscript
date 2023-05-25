import { arrayEach } from '@library/presource';

/** Triggering the Listeners */
export const triggerListenerFunction = (context: any, fields: string[]) =>
  arrayEach(fields, ({ v }) => {
    // Triggering the Listerner
    context.listener[v]?.forEach((trigger: any) => trigger({}));
  });
