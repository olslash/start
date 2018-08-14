const env = require('veritone-dev-env');

module.exports = Object.assign({}, env.eslintReact, {
  plugins: env.eslintReact.plugins.concat('import'),
  rules: Object.assign({}, env.eslintReact.rules, {
    'import/order': 2,
    'react/jsx-no-bind': 0
  })
});
