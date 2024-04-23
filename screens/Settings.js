import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SettingsScreen = ({ navigation }) => {
    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleOptionPress = (option) => {
        
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

});

export default SettingsScreen;
