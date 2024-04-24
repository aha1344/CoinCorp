import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, Image } from 'react-native';

const SettingsScreen = ({ navigation }) => {
    // State variables
    const [isModalVisible, setModalVisible] = useState(false);
    const [isPasswordModalVisible, setPasswordModalVisible] = useState(false);
    const [isEmailModalVisible, setEmailModalVisible] = useState(false);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    // Function to handle back press
    const handleBackPress = () => {
        navigation.goBack();
    };

    // Function to handle option presses
    const handleOptionPress = (option) => {
        if (option === 'ChangeUserInfo') {
            setModalVisible(true);
        } else if (option === 'ChangePassword') {
            setPasswordModalVisible(true);
            setPasswordMatchError(false); // Reset the password match error
        } else if (option === 'SignOut') {
            handleSignOut();
        } else if (option === 'VerifyEmail') {
            setEmailModalVisible(true);
        }
        // Handle other option presses here
    };

    // Function to handle sign out
    const handleSignOut = async () => {
        // Display a confirmation alert
        Alert.alert(
            'Confirm Sign Out',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        // Do nothing, just close the alert
                    },
                    style: 'cancel'
                },
                {
                    text: 'Confirm',
                    onPress: async () => {
                        try {
                            navigation.navigate('Welcome');
                        } catch (error) {
                            console.error('Error signing out:', error);
                        }
                    }
                }
            ]
        );
    };

    // Function to handle confirming changes
    const handleConfirmChanges = () => {
        // Handle the confirmation of changes here
        // You can use the state values (name, number, email) to update the user information
        console.log(`Name: ${name}, Number: ${number}, Email: ${email}`);

        // Close the modal
        setModalVisible(false);
    };

    // Function to handle confirming password changes
    const handleConfirmPasswordChanges = () => {
        if (newPassword === confirmNewPassword) {
            // Handle the confirmation of password changes here
            // You can use the state values (currentPassword, newPassword, confirmNewPassword) to update the password
            console.log(`Current Password: ${currentPassword}, New Password: ${newPassword}, Confirm New Password: ${confirmNewPassword}`);

            // Close the modal
            setPasswordModalVisible(false);
        } else {
            setPasswordMatchError(true);
        }
    };

    // Function to handle closing the modal
    const handleCloseModal = () => {
        setModalVisible(false);
        setPasswordModalVisible(false);
        setEmailModalVisible(false);
        setPasswordMatchError(false); // Reset the password match error
    };

    // Function to handle sending the confirmation email
    const handleSendConfirmationEmail = () => {
        // Handle sending the confirmation email here
        console.log('Sending confirmation email to:', email);

        // Set email verification status to true
        setIsEmailVerified(true);
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
                {/* Change User Information button */}
                <TouchableOpacity style={[styles.option, { marginBottom: 30 }]} onPress={() => handleOptionPress('ChangeUserInfo')}>
                    <Text style={styles.optionText}>Change User Information</Text>
                </TouchableOpacity>

                {/* Other option buttons */}
                <TouchableOpacity style={[styles.option, { marginBottom: 30 }]} onPress={() => handleOptionPress('ChangeProfilePhoto')}>
                    <Text style={styles.optionText}>Change Profile Photo</Text>
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

            {/* Modal for changing user information */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* Modal header with close button */}
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={handleCloseModal}>
                                <Text style={styles.closeButton}>X</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Fields for changing user information */}
                        <Text style={styles.modalTitle}>Change User Information</Text>
                        <Text style={styles.fieldTitle}>Change Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new name..."
                            value={name}
                            onChangeText={setName}
                        />
                        <Text style={styles.fieldTitle}>Change Number:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new number..."
                            value={number}
                            onChangeText={setNumber}
                            keyboardType="phone-pad"
                        />
                        <Text style={styles.fieldTitle}>Change Email:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new email..."
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />

                        {/* Confirm button */}
                        <View style={styles.confirmButtonContainer}>
                            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmChanges}>
                                <Text style={styles.confirmButtonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal for changing password */}
            <Modal
                visible={isPasswordModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* Modal header with close button */}
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={handleCloseModal}>
                                <Text style={styles.closeButton}>X</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Fields for changing password */}
                        <Text style={styles.modalTitle}>Change Password</Text>
                        <Text style={styles.fieldTitle}>Current Password:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter current password..."
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            secureTextEntry
                        />
                        <Text style={styles.fieldTitle}>New Password:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter new password..."
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                        />
                        <Text style={styles.fieldTitle}>Confirm New Password:</Text>
                        <TextInput
                            style={[styles.input, passwordMatchError && styles.inputError]}
                            placeholder="Confirm new password..."
                            value={confirmNewPassword}
                            onChangeText={setConfirmNewPassword}
                            secureTextEntry
                        />
                        {passwordMatchError && (
                            <Text style={styles.errorText}>New password and confirm password do not match</Text>
                        )}

                        {/* Confirm button */}
                        <View style={styles.confirmButtonContainer}>
                            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPasswordChanges}>
                                <Text style={styles.confirmButtonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal for verifying email */}
            <Modal
                visible={isEmailModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* Modal header with close button */}
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={handleCloseModal}>
                                <Text style={styles.closeButton}>X</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Mail icon */}
                        <Image
                            source={require('../assets/mailConfirm.png')}
                            style={styles.mailIcon}
                        />

                        {/* Modal content */}
                        <Text style={styles.modalTitle}>Send confirmation email</Text>

                        {/* Confirm button */}
                        {!isEmailVerified ? (
                            <TouchableOpacity style={styles.confirmButton} onPress={handleSendConfirmationEmail}>
                                <Text style={styles.confirmButtonText}>Verify Email</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.verifiedButton}>
                                <Text style={styles.verifiedButtonText}>Verify Email</Text>
                            </View>
                        )}

                        {/* Check your email text */}
                        {isEmailVerified && (
                            <Text style={styles.checkEmailText}>Check your email</Text>
                        )}
                    </View>
                </View>
            </Modal>
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
    },
    // Modal styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    closeButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black', // Change "X" color to black
        marginBottom: 10, // Add margin to the close button
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 40,
        textAlign: 'center',
    },
    fieldTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10, // Add space between the field title and input
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 35, // Add more space between fields
        paddingHorizontal: 10,
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    // Confirm button styles
    confirmButtonContainer: {
        marginTop: 15,
        borderRadius: 10,
        overflow: 'hidden',

    },
    confirmButton: {
        backgroundColor: 'black', // Customize button background color
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: '600', // Sora Semi-Bold font weight
        fontSize: 16,
        textAlign: 'center',
    },
    mailIcon: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 20,
    },
    verifiedButton: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
    },
    verifiedButtonText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
    },
    checkEmailText: {
        marginTop: 10,
        fontSize: 12,
        textAlign: 'center',
        color: 'red',
        fontStyle: 'italic',
    },
});

export default SettingsScreen;