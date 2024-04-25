import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

const SettingsScreen = ({ navigation, route }) => {
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleOptionPress = (option) => {
        if (option === 'SetWalletPin') {
            if (!pin || !confirmPin) {
                Alert.alert('Error', 'Please enter both PIN and confirm PIN.');
                return;
            }
            if (pin !== confirmPin) {
                Alert.alert('Error', 'PINs do not match. Please enter matching PINs.');
                return;
            }
            setWalletPin(pin);
        }
    };

    const setWalletPin = async (pin) => {
        const authToken = route.params.authToken; // Assuming authToken is passed as a route parameter
        try {
            const response = await fetch('http://192.168.1.102:3000/wallet/set-pin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({ pin, confirm_pin: confirmPin }),
            });
            if (response.ok) {
                Alert.alert('Success', 'Wallet PIN set successfully.');
            } else {
                Alert.alert('Error', 'Failed to set wallet PIN. Please try again later.');
            }
        } catch (error) {
            console.error('Error setting wallet PIN:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress}>
                    <Text style={styles.backButton}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>
            <View style={styles.optionsContainer}>
                <TouchableOpacity style={[styles.option, { marginBottom: 30 }]} onPress={() => handleOptionPress('ChangeProfilePhoto')}>
                    <Text style={styles.optionText}>Change Profile Photo</Text>
                </TouchableOpacity>
                {/* Add the option for setting wallet PIN */}
                <Text style={styles.optionText}>Set/Change Pin</Text>
                <View style={{ marginBottom: 30 }}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter PIN"
                        value={pin}
                        onChangeText={setPin}
                        keyboardType="numeric"
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm PIN"
                        value={confirmPin}
                        onChangeText={setConfirmPin}
                        keyboardType="numeric"
                        secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('SetWalletPin')}>
                        <Text style={styles.optionText}>Set Wallet PIN</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.option, { marginBottom: 30 }]} onPress={() => handleOptionPress('ChangeUserInfo')}>
                    <Text style={styles.optionText}>Change User Information</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.option, { marginBottom: 30 }]} onPress={() => handleOptionPress('ChangePassword')}>
                    <Text style={styles.optionText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.option, { marginBottom: 30 }]} onPress={() => handleOptionPress('VerifyEmail')}>
                    <Text style={styles.optionText}>Verify Email</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.option, { marginBottom: 30 }]} onPress={() => handleOptionPress('SignOut')}>
                    <Text style={styles.optionText}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between', 
        height: 95, 
        backgroundColor: 'black',
        paddingHorizontal: 20, 
    },
    backButton: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 18,
    },
    headerTitle: {
        color: 'white',
        fontSize: 32,
        fontWeight: '600',
        marginTop: 18,
        marginRight: 110,
    },
    optionsContainer: {
        flex: 1,
        paddingVertical: 20, 
        paddingHorizontal: 20, 
    },
    option: {
        paddingVertical: 15, 
    },
    optionText: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
});

export default SettingsScreen;
