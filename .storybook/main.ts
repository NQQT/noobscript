/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
    stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-docs'],

    framework: {
        name: '@storybook/react-vite',
        options: {}
    }
};

export default config;
