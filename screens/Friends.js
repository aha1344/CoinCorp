import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FriendsScreen = () => {
    const [friendsList, setFriendsList] = useState([
        { id: 1, name: 'Alice Johnson', number: '1234567890' },
        { id: 2, name: 'Bob Smith', number: '9876543210' },
        { id: 3, name: 'Charlie Brown', number: '5555555555' },
        { id: 4, name: 'David Lee', number: '1111111111' },
        { id: 5, name: 'Emily Davis', number: '9999999999' },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');

    const navigation = useNavigation();

    const goToNotifications = () => {
        navigation.navigate('Notifications');
    };

    const goToAddFriends = () => {
        navigation.navigate('AddFriends');
    };

    const handleManagePress = (friend) => {
        setSelectedFriend(friend);
        setModalVisible(true);
    };

    const handleRemoveFriend = () => {
        setModalVisible(false);
        setConfirmModalVisible(true);
    };

    const confirmRemoveFriend = () => {
        setFriendsList((prevList) =>
            prevList.filter((friend) => friend.id !== selectedFriend.id)
        );
        setConfirmModalVisible(false);
        setSelectedFriend(null);
    };

    const cancelRemoveFriend = () => {
        setConfirmModalVisible(false);
        setSelectedFriend(null);
    };

    const renderFriendItem = ({ item }) => {
        const filteredFriend = item.name.toLowerCase().includes(searchText.toLowerCase());

        if (!filteredFriend) {
            return null;
        }

        return (
            <View style={styles.friendItem}>
                <Image source={require('../assets/user.png')} style={styles.profilePicture} />
                <View style={styles.friendInfo}>
                    <Text style={styles.friendName}>{item.name}</Text>
                    <Text style={styles.friendNumber}>{item.number}</Text>
                </View>
                <TouchableOpacity
                    style={styles.manageButton}
                    onPress={() => handleManagePress(item)}
                >
                    <Image source={require('../assets/manage.png')} style={styles.manageIcon} />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Plus icon for adding friends */}
                <TouchableOpacity onPress={goToAddFriends} style={styles.iconContainer}>
                    <Image source={require('../assets/Plus.png')} style={styles.headerIcon} />
                </TouchableOpacity>
                {/* Title */}
                <Text style={styles.title}>Friends</Text>
                {/* Mail icon for notifications */}
                <TouchableOpacity onPress={goToNotifications} style={styles.iconContainer}>
                    <Image source={require('../assets/Mail.png')} style={styles.headerIcon} />
                </TouchableOpacity>
            </View>
            {/* Search bar */}
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchBarInput}
                    placeholder="Search friends..."
                    placeholderTextColor="#aaa"
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
            </View>
            {/* Friends list */}
            <FlatList
                data={friendsList.sort((a, b) => a.name.localeCompare(b.name))}
                renderItem={renderFriendItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.friendsList}
            />
            {/* Manage friend modal */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Manage Friend</Text>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>Send</Text>
                            </TouchableOpacity>
                            <View style={styles.buttonSeparator} />
                            <TouchableOpacity style={styles.modalButton}>
                                <Text style={styles.modalButtonText}>Request</Text>
                            </TouchableOpacity>
                            <View style={styles.buttonSeparator} />
                            <TouchableOpacity
                                style={[styles.modalButton, styles.removeButton]}
                                onPress={handleRemoveFriend}
                            >
                                <Text style={[styles.modalButtonText, styles.removeButtonText]}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {/* Confirm remove friend modal */}
            <Modal visible={confirmModalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Remove Friend</Text>
                        <Text style={styles.modalText}>
                            Are you sure you want to remove {selectedFriend?.name} as a friend?
                        </Text>
                        <View style={styles.confirmButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={confirmRemoveFriend}
                            >
                                <Text style={styles.confirmButtonText}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={cancelRemoveFriend}
                            >
                                <Text style={styles.confirmButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
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
        paddingTop: 40, // Added padding to move content below status bar
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        marginTop: 5, // Adjust this value as needed
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
    searchBar: {
        marginTop: 15, // Add margin to position below title
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
    friendsList: {
        paddingHorizontal: 20,
    },
    friendItem: {
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
    friendInfo: {
        flex: 1,
    },
    friendName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    friendNumber: {
        fontSize: 14,
        color: 'gray',
    },
    manageButton: {
        padding: 5,
    },
    manageIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        margin: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 5,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 25,
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        flex: 1,
    },
    buttonSeparator: {
        width: 1,
        backgroundColor: 'black',
    },
    removeButton: {
        backgroundColor: 'white',
    },
    removeButtonText: {
        color: 'red',
    },
    modalButtonText: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'Sora-SemiBold',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    confirmButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 20,
    },
    confirmButton: {
        backgroundColor: 'red',
        borderRadius: 5,
        marginRight: 10,
    },
    cancelButton: {
        backgroundColor: 'gray',
        borderRadius: 5,
        marginLeft: 10,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Sora-SemiBold',
    },
});

export default FriendsScreen;