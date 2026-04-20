export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
        extractArgTypes: () => ({})
    },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
};
