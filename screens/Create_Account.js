import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';

import facebookLogo from '../assets/facebook.png';
import googleLogo from '../assets/google.png';
import appleLogo from '../assets/apple.png';
import eyeOffLogo from '../assets/eye-icon.png';
import eyeLogo from '../assets/blind-eye-sign.png';
import { StackActions } from '@react-navigation/native';

const CreateAccountScreen = ({ navigation,route }) => {
    const { phoneNumber } = route.params;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkboxError, setCheckboxError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');

    const handleCreateAccount = () => {
        let isValid = true;

        if (!validateEmail(email)) {
            setEmailError('Invalid email address! Try again.');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!validatePassword(password)) {
            setPasswordError(
                'Weak Password.'
            );
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (name.trim() === '') {
            setNameError('Name cannot be empty.');
            isValid = false;
        } else {
            setNameError('');
        }

        if (isValid && checkboxChecked) {
            navigation.dispatch(StackActions.push('SuccessfulSignup'));
        } else if (!checkboxChecked) {
            setCheckboxError('Please accept the terms and conditions to continue.');
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    };
    const toggleAcceptTerms = () => {
        navigation.dispatch(StackActions.push('Terms_Conditions'));
    };

    const handleCheckboxToggle = () => {
        setCheckboxChecked(!checkboxChecked);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
        return passwordRegex.test(password);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Back Button */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>{'< Back'}</Text>
                </TouchableOpacity>
                <View>
                    <Text style={styles.createaccount}>{'Create Account'}</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.header}>{'Name'}</Text>
                    <TextInput
                        style={[styles.input, nameError ? styles.inputError : null]}
                        placeholder="e.g. Nour Zamel"
                        onChangeText={(text) => {
                            setName(text);
                            if (text.trim() === '') {
                                setNameError('Name cannot be empty.');
                            } else {
                                setNameError('');
                            }
                        }}
                        value={name}
                    />
                    {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

                    <Text style={styles.header}>{'Email'}</Text>
                    <TextInput
                        style={[styles.input, emailError ? styles.inputError : null]}
                        placeholder="e.g. email@example.com"
                        onChangeText={setEmail} // Only set the email state here
                        value={email}
                        keyboardType="email-address"
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <View style={styles.passwordContainer}>
                        <Text style={styles.header}>{'Password'}</Text>
                        <TextInput
                            style={[styles.input, passwordError ? styles.inputError : null]}
                            placeholder="Enter your password"
                            onChangeText={(text) => {
                                setPassword(text);
                                if (!validatePassword(text)) {
                                    setPasswordError(
                                        'Weak Password.'
                                    );
                                } else {
                                    setPasswordError('');
                                }
                            }}
                            value={password}
                            secureTextEntry={passwordVisibility}
                        />
                        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
                            <Image source={passwordVisibility ? eyeOffLogo : eyeLogo} style={styles.eyeIcon} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity
                            style={[styles.checkbox, checkboxChecked ? styles.checked : null]}
                            onPress={handleCheckboxToggle}
                        />
                        <TouchableOpacity onPress={toggleAcceptTerms} style={styles.backButton}>
                            <Text style={styles.termsText1}>
                                I accept <Text style={styles.blueText}>terms and conditions</Text> and{' '}
                                <Text style={styles.blueText}>privacy policy</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {checkboxError ? <Text style={styles.errorText}>{checkboxError}</Text> : null}
                    <TouchableOpacity onPress={handleCreateAccount} style={styles.createButton}>
                        <Text style={styles.createButtonText}>Create Account</Text>
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
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.loginLink}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginTop: 10,
    },
    createaccount: {
        fontWeight: 'bold',
        marginBottom: 40,
        fontSize: 25,
    },
    header: {
        marginBottom: 10,
    },
    backButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 20,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
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
    content: {
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: 'lightgray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 0,
        width: '100%',
    },
    inputError: {
        borderColor: 'red', // Change border color to indicate error
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    termsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    checkmark: {
        color: 'black',
        fontSize: 16,
    },
    termsText1: {
        fontSize: 13,
        marginBottom: 10,
    },
    blueText: {
        fontSize: 13,
        color: 'blue',
    },
    createButton: {
        backgroundColor: 'black',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginBottom: 20,
        width: '100%',
    },
    createButtonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    logosContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 10,
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
    loginButton: {
        position: 'absolute',
        top: 600,
    },
    loginButtonText: {
        color: '#635DFF',
        fontSize: 16,
        left: 70,
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        position: 'center',
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 20, // Adjust this value as needed
    },
    loginText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        marginRight: 5,
    },
    loginLink: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 16,
    },
    eyeButton: {
        position: 'absolute',
        right: 10,
        top: '43%',
    },
    eyeIcon: {
        width: 25,
        height: 25,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 3,
        borderWidth: 3,
        borderColor: '#000',
        marginRight: 10,
        borderColor: 'black',
    },
    checked: {
        backgroundColor: '#000',
    },
    checkboxLabel: {
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    
});

export default CreateAccountScreen;
