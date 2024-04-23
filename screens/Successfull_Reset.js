import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { StackActions } from '@react-navigation/native';

const greenCheck = require('../assets/greencheck.png');

const Successfulreset = ({ navigation }) => {
  const login = () => {
    navigation.dispatch(StackActions.push('Login'));
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <View style={styles.successContainer}>
          <Text style={styles.successText}>Password reset Successfully</Text>
          <Image source={greenCheck} style={styles.checkIcon} />
        </View>
        <TouchableOpacity onPress={login} style={styles.ResetButton}>
          <Text style={styles.ResetButtonText}>Return to log-in page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    width: '100%',
    alignItems: 'center',
  },
  successContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  successText: {
    fontSize: 20,
    marginRight: 10,
  },
  ResetButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    width: '80%',
    alignItems: 'center',
  },
  ResetButtonText: {
    color: 'white',
    fontSize: 16,
  },
  checkIcon: {
    width: 24,
    height: 24,
  },
});

export default Successfulreset;
