import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import WelcomeScreen from './screens/WelcomeScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import SuccessfulSignup from './screens/Sign_UP_Succeeded';
import LoginScreen from './screens/Login';
import ResetScreen from './screens/Reset_Password';
import SuccessfulScreen from './Successfull_Reset';
import OTPScreen from './screens/OTP';
import HistoryScreen from './screens/HistoryScreen';
import FriendsScreen from './screens/Friends';
import AddFriendsScreen from './screens/Addfriends';
import NotificationsScreen from './screens/Notifications';
import SettingsScreen from './screens/Settings';
import CardScreen from './screens/Card';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="SuccessfulSignup" component={SuccessfulSignup} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Reset" component={ResetScreen} />
      <Stack.Screen name="Successfulreset" component={SuccessfulScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Friends" component={FriendsScreen} />
      <Stack.Screen name="AddFriends" component={AddFriendsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Card" component={CardScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;