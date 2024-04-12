import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoadingScreen from './screens/Loading';
import WelcomeScreen from './screens/Welcome';
import CreateAccountScreen from './screens/Create_Account';
import SuccessfulSignup from './screens/Sign_UP_Succeeded';
import Unverified_HomePage from './screens/Unverified_HomePage';
import Terms_Conditions from './screens/Terms&Conditions';
import LoginScreen from './screens/Login';
import ResetScreen from './screens/Reset_Password';
import SuccessfulScreen from './screens/Successfull_Reset';
import OTPScreen from './screens/OTP';
import HistoryScreen from './screens/History';


const Stack = createStackNavigator();

export default function App() {
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppReady(true);
    }, 2000); 
  }, []);

  if (!isAppReady) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Reset' component={ResetScreen} options={{headerShown: false}}/>
        <Stack.Screen name="SuccessfulSignup" component={SuccessfulSignup} options={{ headerShown: false}}/>
        <Stack.Screen name="Unverified_HomePage" component={Unverified_HomePage} options={{headerShown: false}}/>
        <Stack.Screen name='Terms_Conditions' component={Terms_Conditions} options={{headerShown: false}}/>
        <Stack.Screen name="Successfulreset" component={SuccessfulScreen} options={{headerShown: false}}/>
        <Stack.Screen name="OTP" component={OTPScreen} options={{headerShown: false}}/>
        <Stack.Screen name="History" component={HistoryScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


