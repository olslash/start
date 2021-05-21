module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',

  plugins: ['import', '@typescript-eslint'],
  rules: {
    'no-use-before-define': 0,
    'import/order': 2,
    'react/jsx-no-bind': 0,
    'react/prop-types': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'no-unused-vars': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
