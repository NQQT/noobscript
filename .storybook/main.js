const webpackConfig = require('../webpack.config.js');

module.exports = {
    stories: ['../**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-docs'],

    core: {
        builder: 'webpack5'
    },

    framework: {
        name: '@storybook/react-webpack5',
        options: {}
    },

    webpackFinal: (config) => ({
        ...config,

        resolve: {
            ...config.resolve,
            ...webpackConfig.resolve,
            alias: {
                ...config.resolve.alias,
                ...webpackConfig.resolve.aliases
            }
        },

        module: {
            ...config.module,
            rules: [...config.module.rules, ...webpackConfig.module.rules]
        }
    })
};
