module.exports = {
  root: true,
  extends: [require.resolve('@umijs/lint/dist/config/eslint'), '@react-native'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
  },
};
