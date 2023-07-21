module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-typescript',
  ],
  plugins: [
    'transform-inline-environment-variables',
    'react-native-reanimated/plugin',
  ],
};
