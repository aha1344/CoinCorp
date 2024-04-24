import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NotificationsScreen = () => {
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'friendRequest',
            senderName: 'John Doe',
        },
        {
            id: 2,
            type: 'moneyRequest',
            senderName: 'Jane Smith',
            amount: '$50',
            message: 'Can you lend me some money?',
        },
        {
            id: 3,
            type: 'moneySend',
            senderName: 'Bob Johnson',
            amount: '$100',
            message: 'Here\'s the money I owe you.',
        },
    ]);
    const [searchText, setSearchText] = useState('');

    // Function to navigate back to Friends screen
    const goBack = () => {
        navigation.goBack();
    };

    // Function to handle accepting a friend request
    const acceptFriendRequest = (id) => {
        // Logic to add the user as a friend
        // Remove the notification from the list
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    // Function to handle rejecting a friend request
    const rejectFriendRequest = (id) => {
        // Remove the notification from the list
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    // Function to handle accepting a money request
    const acceptMoneyRequest = (id) => {
        // Logic to remove the money from the account and send it to the user
        // Remove the notification from the list
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    // Function to handle rejecting a money request
    const rejectMoneyRequest = (id) => {
        // Remove the notification from the list
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    // Function to handle accepting a money send
    const acceptMoneySend = (id) => {
        // Logic to add the money to the account
        // Remove the notification from the list
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    // Function to handle rejecting a money send
    const rejectMoneySend = (id) => {
        // Remove the notification from the list
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    // Function to render notification item
    const renderNotificationItem = ({ item }) => {
        const filteredNotification = item.senderName.toLowerCase().includes(searchText.toLowerCase()) ||
            (item.message && item.message.toLowerCase().includes(searchText.toLowerCase()));

        if (!filteredNotification) {
            return null;
        }

        if (item.type === 'friendRequest') {
            return (
                <View style={styles.notificationItem}>
                    <Text style={[styles.notificationText, { flex: 1, flexWrap: 'wrap' }]}>{item.senderName} has sent you a friend request</Text>
                    <View style={styles.verticalButtonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.acceptButton]}
                            onPress={() => acceptFriendRequest(item.id)}
                        >
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.rejectButton]}
                            onPress={() => rejectFriendRequest(item.id)}
                        >
                            <Text style={styles.buttonText}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else if (item.type === 'moneyRequest') {
            return (
                <View style={styles.notificationItem}>
                    <View style={styles.notificationContent}>
                        <Text style={styles.notificationText}>
                            {item.senderName} has requested {item.amount}
                        </Text>
                        <Text style={styles.notificationMessage}>{item.message}</Text>
                    </View>
                    <View style={styles.verticalButtonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.acceptButton]}
                            onPress={() => acceptMoneyRequest(item.id)}
                        >
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.rejectButton]}
                            onPress={() => rejectMoneyRequest(item.id)}
                        >
                            <Text style={styles.buttonText}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else if (item.type === 'moneySend') {
            return (
                <View style={styles.notificationItem}>
                    <View style={styles.notificationContent}>
                        <Text style={styles.notificationText}>
                            {item.senderName} wants to send you {item.amount}
                        </Text>
                        <Text style={styles.notificationMessage}>{item.message}</Text>
                    </View>
                    <View style={styles.verticalButtonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.acceptButton]}
                            onPress={() => acceptMoneySend(item.id)}
                        >
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.rejectButton]}
                            onPress={() => rejectMoneySend(item.id)}
                        >
                            <Text style={styles.buttonText}>Reject</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
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
                    <Text style={styles.title}>Notifications</Text>
                </View>
            </View>
            {/* Search bar */}
            <View style={styles.searchBar}>
                <TextInput
                    style={styles.searchBarInput}
                    placeholder="Search notifications..."
                    placeholderTextColor="#aaa"
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                />
            </View>
            {/* Content */}
            <View style={styles.content}>
                {/* If no notifications are present, display message */}
                {notifications.length === 0 && (
                    <Text style={styles.noNotificationsText}>You have no new notifications.</Text>
                )}
                {/* Otherwise, display notifications list */}
                <FlatList
                    data={notifications}
                    renderItem={renderNotificationItem}
                    keyExtractor={(item) => item.id.toString()}
                />
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
        alignItems: 'center', // Align elements vertically
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
    titleWrapper: {
        flex: 1, // Make this view take up remaining space
        justifyContent: 'center', // Center content horizontally within this view
        alignItems: 'center', // Center content vertically within this view
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginRight: 55,
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
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    noNotificationsText: {
        fontSize: 18,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
    },
    notificationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Align items at the top
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    notificationContent: {
        flex: 1,
        marginRight: 10,
    },
    notificationText: {
        fontSize: 16,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    notificationMessage: {
        fontSize: 14,
        color: 'gray',
    },
    verticalButtonContainer: {
        alignItems: 'flex-end',
    },
    button: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        marginVertical: 5,
        width: 80, // Set a fixed width for buttons
    },
    acceptButton: {
        backgroundColor: 'green',
    },
    rejectButton: {
        backgroundColor: 'red',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'center',
    },
});

export default NotificationsScreen;