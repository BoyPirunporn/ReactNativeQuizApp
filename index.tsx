import { AppRegistry, Platform } from 'react-native';
import App from './App'; // หรือไฟล์ที่เป็น root component ของแอป
import { expo } from './app.json';
import { registerRootComponent } from 'expo';

// if(Platform.OS === "android"){

// }else{
//     AppRegistry.registerComponent(expo.name, () => App);
// }
registerRootComponent(App);