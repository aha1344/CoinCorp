import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const LoadingScreen = () => {
    return (
        <View style={styles.container}>

            <Image source={require('../assets/logo_coin_corp.png')} style={styles.logo} />

            <Text style={styles.loadingText}>Coin Corp</Text>
        
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    loadingText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18,
        marginBottom: 10,
    },
});

export default LoadingScreen;
