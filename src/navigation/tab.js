import React from 'react';
import {Image} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import CUSTOM_COLOR from '../constants/colors.js';
import Home_Question from '../screens/Home_Question.js';
import History from '../screens/History.js';
import Account from '../screens/Account.js';
import {
  IC_home,
  IC_history,
  IC_account,
  IC_homeChoose,
  IC_historyChoose,
  IC_accountChoose,
} from '../assets/icons/index.js';
const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home_Question"
      activeColor={CUSTOM_COLOR.FruitSalad}
      inactiveColor={CUSTOM_COLOR.Black}
      barStyle={{
        position: 'absolute',
        backgroundColor: CUSTOM_COLOR.White,
      }}>
      <Tab.Screen
        name="Home_Question"
        component={Home_Question}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? IC_homeChoose : IC_home}
              style={{width: 30, height: 30, resizeMode: 'contain'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? IC_historyChoose : IC_history}
              style={{width: 30, height: 30, resizeMode: 'contain'}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? IC_accountChoose : IC_account}
              style={{width: 30, height: 30, resizeMode: 'contain'}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
