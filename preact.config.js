const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const tailwindcss = require('tailwindcss')

module.exports = (config, env, helpers, params = defaultParams) => {
    const postCssLoaders = helpers.getLoadersByName(config, 'postcss-loader');

    config.resolve.alias.react = "preact/compat"
    config.resolve.alias['react-dom/test-utils'] = "preact/test-utils"
    config.resolve.alias['react-dom'] = "preact/compat"


    postCssLoaders.forEach(({ loader }) => {
        loader.options.postcssOptions.plugins = [
            tailwindcss('./tailwind.config.js'),
            ...loader.options.postcssOptions.plugins
        ]
    });

    //add dot env plugins
    config.plugins.push(
        new Dotenv({path: './.env'})
    )

    return config;
  };