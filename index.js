/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Import the required module for Realtime Database
// import '@react-native-firebase/database';

AppRegistry.registerComponent(appName, () => App);
