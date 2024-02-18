export const teepEslintConfig = {
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-nested-ternary': ['error'],
    'max-lines': [
      'error',
      {
        max: 1500,
        skipBlankLines: true,
        skipComments: true
      }
    ],
    complexity: ['error', 15],
    eqeqeq: 2
  }
}
