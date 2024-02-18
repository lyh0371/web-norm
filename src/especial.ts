export const teepEslintConfig = {
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-nested-ternary': ['error'],
    'max-lines': [
      'error',
      {
        max: 1000,
        skipBlankLines: true,
        skipComments: true
      }
    ],
    complexity: ['error', 20],
    eqeqeq: 2
  }
}
