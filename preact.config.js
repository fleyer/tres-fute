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
    // const purgecss = require('@fullhuman/postcss-purgecss')({
    //   // Specify the paths to all of the template files in your project
    //   content: ['./src/**/*.js'],
  
    //   // Include any special characters you're using in this regular expression
    //   defaultExtractor: content => content.match(params.regex) || [],
    // });
  
    // const postCssLoaders = helpers.getLoadersByName(config, 'postcss-loader');
    // postCssLoaders.forEach(({ loader }) => {
    //   const plugins = loader.options.plugins;
  
    //   // Add tailwind css at the top.
    //   plugins.unshift(require('tailwindcss'));
  
    //   // Add PurgeCSS only in production.
    //   if (env.production) {
    //     plugins.push(purgecss);
    //   }
    // });

    //add dot env plugins
    config.plugins.push(
        new Dotenv({path: './.env'})
    )

    return config;
  };