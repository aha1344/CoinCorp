import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddFriendsScreen = () => {
    const navigation = useNavigation();
    const [searchResults, setSearchResults] = useState([
        { id: 1, name: 'John Doe', number: '1234567890', isFriend: false, requestSent: false },
        { id: 2, name: 'Jane Smith', number: '9876543210', isFriend: true, requestSent: false },
        { id: 3, name: 'Bob Johnson', number: '5555555555', isFriend: false, requestSent: true },
    ]);

    // Function to navigate back to Friends screen
    const goBack = () => {
        navigation.goBack();
    };

    // Function to handle friend request button press
    const handleFriendRequest = (userId) => {
        setSearchResults((prevResults) =>
            prevResults.map((user) => {
                if (user.id === userId) {
                    return { ...user, requestSent: true };
                }
                return user;
            })
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Back button */}
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                {/* Title wrapper */}
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>Add Friends</Text>
                </View>
            </View>
            {/* Search bar */}
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchBarInput}
                    placeholder="Find users via name or number"
                    placeholderTextColor="#aaa"
                />
            </View>
            {/* Search results */}
            <View style={styles.searchResults}>
                {searchResults.map((user) => (
                    <View key={user.id} style={styles.userItem}>
                        <Image
                            source={require('../assets/user.png')}
                            style={styles.profilePicture}
                        />
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{user.name}</Text>
                            <Text style={styles.userNumber}>{user.number}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => handleFriendRequest(user.id)}
                            style={[
                                styles.friendRequestButton,
                                user.requestSent && styles.friendRequestButtonSent,
                                user.isFriend && styles.friendRequestButtonDisabled,
                            ]}
                            disabled={user.isFriend || user.requestSent}
                        >
                            <Text style={[
                                styles.friendRequestButtonText,
                                user.requestSent && styles.friendRequestButtonTextSent,
                                user.isFriend && styles.friendRequestButtonTextDisabled,
                            ]}>
                                {user.isFriend
                                    ? 'Already friends'
                                    : user.requestSent
                                        ? 'Request sent'
                                        : 'Add friend'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 40, // Added padding to move content below status bar
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Align elements at the top
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 10,
    },
    backButton: {
        marginRight: 10,
    },
    backText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 5, // Lower "Back" slightly
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginRight: 55,
    },
    titleWrapper: {
        flex: 1, // Make this view take up remaining space
        justifyContent: 'center', // Center content horizontally within this view
        alignItems: 'center', // Center content vertically within this view
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noNotificationsText: {
        fontSize: 18,
        color: 'gray',
    },
    searchBar: {
        marginTop: 0, // Add margin to position below title
        marginBottom: 10, // Add margin for spacing
        marginHorizontal: 20, // Add horizontal margin
        paddingHorizontal: 10, // Add padding for text input
        backgroundColor: 'white', // Light background for search bar
        borderRadius: 5, // Rounded corners for search bar
        borderWidth: 1,
        borderColor: 'grey',
        height: 40,
    },
    searchBarInput: {
        marginTop: 9,
        fontSize: 16,
        color: 'black',
    },
    searchResults: {
        marginHorizontal: 20,
    },
    userItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    userNumber: {
        fontSize: 14,
        color: 'gray',
    },
    friendRequestButton: {
        backgroundColor: 'black',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    friendRequestButtonSent: {
        backgroundColor: 'white',
        borderWidth: 1,
    },
    friendRequestButtonDisabled: {
        backgroundColor: 'lightgray',
    },
    friendRequestButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    friendRequestButtonTextSent: {
        color: 'black',
        outlineColor: 'black',

    },
    friendRequestButtonTextDisabled: {
        color: 'green',
    },
});

export default AddFriendsScreen;