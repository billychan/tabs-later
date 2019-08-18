/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

const purgecss = require('@fullhuman/postcss-purgecss')({

  content: [
    './src/**/*.tsx',
    './src/**/*.html',
  ],

  // Pattern to preserve Tailwind classes
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],

  // Reserve all Blueprint global css rules
  whitelistPatterns: [/bp3-/],

  whitelist: [
    // Some dynamically composed Tailwind classes
    'w-11/12',
    'w-12/12',
  ],
});

module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('precss')({ stage: 3 }),
    ...process.env.NODE_ENV === 'production' ? [purgecss] : [],
  ],
};
