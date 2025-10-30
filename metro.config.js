const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  transformer: {
    // Enable aggressive minification
    minifierConfig: {
      keep_fnames: false,
      mangle: {
        keep_fnames: false,
        toplevel: true,
      },
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
      },
    },
  },
  resolver: {
    // Exclude unused vector icon fonts to reduce bundle size
    blacklistRE: /node_modules\/react-native-vector-icons\/(AntDesign|Entypo|EvilIcons|FontAwesome|FontAwesome5|FontAwesome6|Foundation|MaterialIcons|MaterialCommunityIcons|Octicons|SimpleLineIcons|Zocial)\/.*\.ttf$/,
  },
  serializer: {
    // Optimize bundle
    getModulesRunBeforeMainModule: () => [],
    // Remove source maps in production
    getSourceMapURL: () => null,
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
