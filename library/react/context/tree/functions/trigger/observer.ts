/** Trigger Observer Function */
export const triggerObserverFunction = (context: any) => context.observer.forEach((trigger: any) => trigger({}));
