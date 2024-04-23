import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native'

const FriendsScreen = () => {
    const [friendsCount] = useState(0);
    const navigation = useNavigation();
    const goToNotifications = () => {
        navigation.navigate('Notifications');
    };
    const goToAddFriends = () => {
        navigation.navigate('AddFriends');
    };

    const addFriend = () => {
        setFriendsCount(prevCount => prevCount + 1);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goToAddFriends} style={styles.iconContainer}>
                    <Image source={require('../assets/Plus.png')} style={styles.headerIcon} />
                </TouchableOpacity>
                <Text style={styles.title}>Friends</Text>
                <TouchableOpacity onPress={goToNotifications} style={styles.iconContainer}>
                    <Image source={require('../assets/Mail.png')} style={styles.headerIcon} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchBarInput}
                    placeholder="Search friends..."
                    placeholderTextColor="#aaa"
                />
            </View>

            <View style={styles.content}>
                {friendsCount === 0 && <Text style={styles.noFriendsText}>You have no friends yet.</Text>}
            </View>

            <View style={styles.bottomNavigation}>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        marginTop: 5,
    },
    headerIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 10,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noFriendsText: {
        fontSize: 18,
        color: 'gray',
    },
    bottomNavigation: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
        paddingVertical: 10,
    },
    searchBar: {
        marginTop: 15,
        marginBottom: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',
        height: 40,
    },
    searchBarInput: {
        marginTop: 9,
        fontSize: 16,
        color: 'black',
    },
});

export default FriendsScreen;
