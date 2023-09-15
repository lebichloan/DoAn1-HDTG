import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Account from '../screens/Account';
import ChangePassword from '../screens/ChangePassword';
import ForgotPassword_Succeed from '../screens/ForgotPassword_Succeed';
import ForgotPassword_Email from '../screens/ForgotPassword_Email';
import GettingStarted from '../screens/GettingStarted';
import Help from '../screens/Help';
import History from '../screens/History';
import HistoryDetail from '../screens/HistoryDetail';
import Home_Question from '../screens/Home_Question';
import Intro from '../screens/Intro';
import Profile from '../screens/Profile';
import SignIn from '../screens/SignIn.js';
import SignUp from '../screens/SignUp.js';
import SignUp_Succeed from '../screens/SignUp_Succeed';
import Tabs from './tab';

const Stack = createNativeStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen
        name="ForgotPassword_Succeed"
        component={ForgotPassword_Succeed}
      />
      <Stack.Screen
        name="ForgotPassword_Email"
        component={ForgotPassword_Email}
      />
      <Stack.Screen name="GettingStarted" component={GettingStarted} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="HistoryDetail" component={HistoryDetail} />
      <Stack.Screen name="Home_Question" component={Home_Question} />
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignUp_Succeed" component={SignUp_Succeed} />
      <Stack.Screen name="Tabs" component={Tabs} />
    </Stack.Navigator>
  );
}

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;
