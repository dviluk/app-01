module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          // '@app-*': ['src/*'],
          '@app/tests': ['./__test__/'],
          '@app/components': './src/components',
          '@app/router': './src/router',
          '@app/theme': './src/theme',
          '@app/screens': './src/screens',
          '@app/services': './src/services',
          '@app/utils': './src/utils',
        },
      },
    ],
  ],
};
