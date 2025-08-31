// This is the type condition for if then
type Condition = (args: { callback: Callback }) => boolean;
type Callback = (args: { condition: Condition }) => any;

/** If then condition. If something is true, then condition */
export const ifThen = (condition: Condition, callback: Callback) => {
  // Calling itself. Triggering within itself.
  if (condition({ callback })) return callback({ condition });
};
