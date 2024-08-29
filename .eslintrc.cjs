module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: [ 'dist', '.eslintrc.cjs' ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'indent': [ 'warn', 2 ],
    'quotes': [ 'warn', 'single' ],
    'semi': [ 'error', 'never' ],
    'no-trailing-spaces': [ 'warn' ],
    'space-before-blocks': [ 'warn', 'always' ],
    'space-in-parens': [ 'warn', 'always' ],
    'comma-dangle': [ 'warn', 'always-multiline' ],
    'eol-last': [ 'error', 'always' ],
    'no-multiple-empty-lines': [ 'warn', { 'max': 1 } ],
    'space-infix-ops': 'error',
    'prefer-template': 'error',
    'react-refresh/only-export-components': [ 'warn', { allowConstantExport: true } ],
    '@typescript-eslint/no-inferrable-types': [ 'warn' ],
    '@typescript-eslint/consistent-type-assertions': [ 'error', { 'assertionStyle': 'as' } ],
    '@typescript-eslint/no-explicit-any': 'warn',
  },
}
