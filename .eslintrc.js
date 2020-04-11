module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',

  plugins: ['import', '@typescript-eslint'],
  rules: {
    'import/order': 2,
    'react/jsx-no-bind': 0,
    'react/prop-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/camelcase': 0
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
