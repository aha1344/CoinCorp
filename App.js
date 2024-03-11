import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Card from './components/Card';
import Balance from './components/Balance';
import Transactions from './components/Transactions';
import UserInfo from './screens/userinfo.js'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name= " " component={HomeScreen} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.staticSection}>
        <UserInfoButton />
        <Card />
        <Balance />
      </View>
      <Transactions />
    </View>
  );
}

function UserInfoButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('UserInfo')}>
      <Image
        source={require('C:/Users/jadal/OneDrive/Desktop/CMPS 271/CMPS271-Ropemaxxing/assets/user_icon.jpg')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 2,
    gap: 50,
    paddingTop: 10 + Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    overflowX: 'hidden',
  },
  staticSection: {
    paddingHorizontal: 16,
  },
  image: {
    position: 'absolute',
    top: 8,
    right: 10,
    width: 45,
    height: 45,
  },
});
