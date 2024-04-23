import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SettingsScreen = ({ navigation }) => {
    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleOptionPress = (option) => {
        // Handle option press here
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
        alignItems: 'center', // Vertical alignment
        justifyContent: 'space-between', // Horizontal alignment (distribute items)

        height: 95, // Reduced header height
        backgroundColor: 'black',
        paddingHorizontal: 20, // Added horizontal padding
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
        // Removed text alignment (centered by justifyContent)
    },
    optionsContainer: {
        flex: 1,
        paddingVertical: 20, // Adjusted vertical padding
        paddingHorizontal: 20, // Added horizontal padding
    },
    option: {
        paddingVertical: 15, // Adjusted padding
    },
    optionText: {
        fontSize: 18,
        fontWeight: '600',
    },

});

export default SettingsScreen;