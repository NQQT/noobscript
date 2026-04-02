// Checking if something is a React component
export const isReactComponent = (input: any) => {
    return !!input.$$typeof;
};
