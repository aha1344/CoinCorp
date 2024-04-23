import React, { useState, useRef } from 'react'; 
import { View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList, Modal, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

import downArrow from '../assets/down-arrow.png';
import facebookLogo from '../assets/facebook.png';
import googleLogo from '../assets/google.png';
import appleLogo from '../assets/apple.png';

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const countryCodeButtonRef = useRef(null);
    const [showCountryCodes, setShowCountryCodes] = useState(false);
    const [selectedCountryCode, setSelectedCountryCode] = useState('+961');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCodeButtonLayout, setCountryCodeButtonLayout] = useState(null);

    const countryCodes = [
        { code: '+1', country: 'USA' },
        { code: '+91', country: 'India' },
        { code: '+961', country: 'Lebanon' },
    ];

    const handleCountryCodeSelect = (code) => {
        setSelectedCountryCode(code);
        setShowCountryCodes(false);
    };

    const handleContinue = () => {
        navigation.navigate('CreateAccount', { phoneNumber });
    };

    const handleLogin = () => {
        navigation.dispatch(
            StackActions.push('Login')
        );
    };

    const handleCountryCodeButtonLayout = (event) => {
        setCountryCodeButtonLayout(event.nativeEvent.layout);
    };

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            setShowCountryCodes(false);
        }}>
            <View style={styles.container}>
                <View style={styles.blackBox}>
                    <Text style={styles.welcomeText}>Welcome to</Text>
                    <Text style={styles.welcomeText}>CoinCorp!</Text>
                </View>

                <Text style={styles.enterMobile}>Enter your </Text>
                <Text style={styles.enterMobile}>mobile number</Text>
                <View style={styles.outerContainer}>
                    <Text style={styles.label}>Mobile number</Text>
                    <View style={styles.inputContainer}>
                    <TouchableOpacity
                        ref={countryCodeButtonRef}
                        style={styles.countryCodeButton}
                        onPress={() => setShowCountryCodes(true)}
                        onLayout={handleCountryCodeButtonLayout}
                    >
                        <View style={styles.countryCodeContainer}>
                            <Text style={styles.countryCode}>{selectedCountryCode}</Text>
                            <Image source={downArrow} style={styles.downArrow} />
                        </View>
                    </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            keyboardType="phone-pad"
                            onChangeText={(text) => setPhoneNumber(text)}
                            value={phoneNumber}
                        />
                    </View>
                    <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>

                    <View style={styles.separatorContainer}>
                        <View style={styles.separator} />
                        <Text style={styles.orText}>or continue using</Text>
                        <View style={styles.separator} />
                    </View>

                    <View style={styles.logosContainer}>
                        <View style={styles.logoContainer}>
                            <Image source={appleLogo} style={styles.logo} />
                        </View>
                        <View style={styles.logoContainer}>
                            <Image source={facebookLogo} style={styles.logo} />
                        </View>
                        <View style={styles.logoContainer}>
                            <Image source={googleLogo} style={styles.logo} />
                        </View>
                    </View>

                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText}>Already have an account? </Text>
                        <TouchableOpacity onPress={handleLogin}>
                            <Text style={styles.login}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal
                    visible={showCountryCodes}
                    transparent={true}
                    animationType="slide"
                >
                    <TouchableOpacity
                        style={styles.fullScreenTouchable}
                        activeOpacity={1}
                        onPress={() => setShowCountryCodes(false)}
                    >
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            style={styles.centeredView}
                        >
                            <View style={styles.modalView}>
                                <FlatList
                                    data={countryCodes}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.countryCodeListItem}
                                            onPress={() => handleCountryCodeSelect(item.code)}
                                        >
                                            <Text style={styles.countryCodeListItemText}>
                                                {item.code} - {item.country}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item) => item.code}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </TouchableOpacity>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    fullScreenTouchable: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    blackBox: {
        backgroundColor: 'black',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%',
    },
    welcomeText: {
        marginTop: 15,
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    outerContainer: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    enterMobile: {
        top: 15,
        alignSelf: 'flex-start',
        marginLeft: 20,
        fontSize: 26,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
    },
    label: {
        alignSelf: 'flex-start',
        top: 30,
        color: 'black',
        fontWeight: 'bold',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
    },
    countryCodeButton: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: 1,
        backgroundColor: '#FFF',
    },
    countryCode: {
        fontSize: 16,
    },
    input: {
        padding: 10,
        flex: 1,
        height: 40,
    },
    continueButton: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
        marginTop: 80,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    logosContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around',
        width: '100%',
    },
    logoContainer: {
        width: 120,
        height: 60,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 40,
        height: 40,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    countryCodeItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        width: '100%',
        alignItems: 'center',
    },
    countryCodeListItemText: {
        fontSize: 16,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    downArrow: {
        width: 10,
        height: 6,
        marginLeft: 5,
    },
    countryCodeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: 'lightgray',
        marginHorizontal: 10,
    },
    orText: {
        fontSize: 14,
        color: 'gray',
    },
    loginContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    loginText: {
        marginTop: 50,
        fontWeight: 'bold',
        fontSize: 15,
    },
    login: {
        marginTop: 50,
        fontWeight: 'bold',
        color: '#635DFF',
        fontSize: 17
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 35,
    },
    countryCodeListItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    countryCodeListItemText: {
        fontSize: 16,
    },
});

export default WelcomeScreen;
