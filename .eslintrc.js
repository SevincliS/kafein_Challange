module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    quotes: [2, 'single', 'avoid-escape'],
    'prettier/prettier': ['error', { singleQuote: true, parser: 'flow' }],
  },
};
