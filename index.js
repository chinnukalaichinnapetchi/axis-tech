/**
 * @format
 */
import 'react-native-gesture-handler';
//import 'react-native-reanimated';
import 'react-native-get-random-values';

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Fix window reference errors - after imports to avoid breaking module registration
if (typeof global !== 'undefined' && typeof global.window === 'undefined') {
  global.window = global;
}

AppRegistry.registerComponent(appName, () => App);
