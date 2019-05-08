/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  parser: 'postcss-scss',
  plugins: [
    require('postcss-import')(),
    require('precss')({ stage: 3 }),
  ],
};
