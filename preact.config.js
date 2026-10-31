const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const tailwindcss = require('@tailwindcss/postcss')

module.exports = (config, env, helpers, params = defaultParams) => {
    const postCssLoaders = helpers.getLoadersByName(config, 'postcss-loader');

    config.resolve.alias.react = "preact/compat"
    config.resolve.alias['react-dom/test-utils'] = "preact/test-utils"
    config.resolve.alias['react-dom'] = "preact/compat"


    postCssLoaders.forEach(({ loader }) => {
        loader.options.postcssOptions.plugins = [
            tailwindcss(),
            ...loader.options.postcssOptions.plugins
        ]
    });

    // critters' CSS parser can't handle tailwind v4 output (cascade layers, nesting)
    config.plugins = config.plugins.filter(
        plugin => plugin.constructor.name !== 'Critters'
    )

    //add dot env plugins
    config.plugins.push(
        new Dotenv({path: './.env'})
    )

    return config;
  };