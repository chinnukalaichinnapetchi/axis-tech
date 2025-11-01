const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Exclude unused vector icon fonts to reduce bundle size
    blacklistRE: /node_modules\/react-native-vector-icons\/(AntDesign|Entypo|EvilIcons|FontAwesome|FontAwesome5|FontAwesome6|Foundation|MaterialIcons|MaterialCommunityIcons|Octicons|SimpleLineIcons|Zocial)\/.*\.ttf$/,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);