import React, {useState} from 'react';
import {firebase} from './Firebase/firebase';
import MainNavigator from './src/navigation/navigation';
import Tabs from './src/navigation/tab';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  // const [user, setUser] = useState(false);

  // const checkSignInStatus = () => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       console.log('User is signed in:', user.uid);
  //       setUser(true);
  //       // User is signed in, you can perform further actions here
  //     } else {
  //       console.log('User is not signed in');
  //       // User is not signed in
  //       setUser(false);
  //     }
  //   });
  // };

  // checkSignInStatus();

  // while (!user) {
  //   if (!user) {
  //     return <MainNavigator />;
  //   }
  //   checkSignInStatus();
  // }

  // return (
  //   <NavigationContainer>
  //     <Tabs />
  //   </NavigationContainer>
  // );

  return <MainNavigator />;

}

export default () => {
  return <App />;
};
