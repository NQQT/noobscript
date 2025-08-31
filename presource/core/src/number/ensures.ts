/** Ensuring that the value is a number. If not, return 0 */
export const numberEnsures = (value: any) => {
  const result = value ? +value : 0;
  return isNaN(result) ? 0 : result;
};
