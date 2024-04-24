import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const colorSchemes = [
    { primary: 'red', secondary: '#142c34', tertiary: '#FFFFFF' },
    { primary: 'red', secondary: '#06054e', tertiary: '#21c8f1' },
    { primary: 'red', secondary: '#0d1c22', tertiary: '#d1d1d1' },
    { primary: 'red', secondary: '#040327', tertiary: '#1a99c0' },
];

// Helper function to format card number
function formatCardNumber(cardNumber) {
    return cardNumber.match(/.{1,4}/g).join(' ');
}

// Helper function to mask card number
function maskCardNumber(cardNumber) {
    const maskedSection = '*'.repeat(cardNumber.length - 4);
    const visibleSection = cardNumber.slice(-4);
    const maskedCardNumber = maskedSection + visibleSection;
    return maskedCardNumber.match(/.{1,4}/g).join(' ');
}

const CreditCard = ({ card, showDetails, onToggleVisibility }) => {
    const [colorScheme, setColorScheme] = useState({});

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * colorSchemes.length);
        setColorScheme(colorSchemes[randomIndex]);
    }, []);

    return (
        <View style={[styles.container, { backgroundColor: colorScheme.primary }]}>
            <View style={styles.circles}>
                <View style={[styles.circle1, { backgroundColor: colorScheme.secondary }]} />
                <View style={[styles.circle2, { backgroundColor: colorScheme.secondary }]} />
            </View>
            <View style={[styles.card, { backgroundColor: colorScheme.secondary }]}>
                {showDetails ? (
                    <MaterialIcons name="visibility" size={24} color={colorScheme.tertiary} onPress={onToggleVisibility} style={styles.visibilityIcon} />
                ) : (
                    <MaterialIcons name="visibility-off" size={24} color={colorScheme.tertiary} onPress={onToggleVisibility} style={styles.visibilityIcon} />
                )}
                <View style={styles.visaLogo}>
                    <Image
                        source={require('../assets/cardStock.png')}
                        style={styles.visaLogoImage}
                    />
                </View>
                <View style={styles.visaInfo}>
                    <Image
                        source={require('../assets/chip.png')}
                        style={styles.chipImage}
                    />
                    <Text style={[styles.cardNumber, { color: colorScheme.tertiary }]}>
                        {showDetails ? formatCardNumber(card.cardNumber) : maskCardNumber(card.cardNumber)}
                    </Text>
                </View>
                <View style={styles.visaCrinfo}>
                    <Text style={[styles.expDate, { color: colorScheme.tertiary }]}>{showDetails ? card.expDate : '**/**'}</Text>
                    <View style={styles.cardDetailsContainer}>
                        <Text style={[styles.cardholderName, { color: colorScheme.tertiary }]}>{card.fullName}</Text>
                        <Text style={[styles.cvv, { color: colorScheme.tertiary }]}>CVV: {showDetails ? card.cvv : '***'}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative',
    },
    circles: {
        position: 'absolute',
        height: 270,
        width: 450,
        top: '50%',
        left: '50%',
        transform: [{ translateX: -225 }, { translateY: -135 }],
    },
    circle1: {
        position: 'absolute',
        top: -50,
        borderRadius: 80,
        left: 10,
        height: 160,
        width: 160,
        opacity: 0.8,
    },
    circle2: {
        position: 'absolute',
        borderRadius: 80,
        right: 40,
        top: 80,
        height: 160,
        width: 160,
        opacity: 0.8,
    },
    card: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        padding: 20,
        position: 'relative',
        zIndex: 1,
    },
    visaLogo: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    visaLogoImage: {
        width: 70,
        height: 40,
    },
    visaInfo: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    chipImage: {
        width: 60,
        height: 45,
        marginRight: 10,
    },
    cardNumber: {
        fontSize: 18,
        letterSpacing: 2,
    },
    visaCrinfo: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    expDate: {
        fontSize: 16,
    },
    cardDetailsContainer: {
        alignItems: 'flex-end',
    },
    cardholderName: {
        fontSize: 16,
    },
    cvv: {
        fontSize: 16,
    },
    visibilityIcon: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 2,
    },
});

export default CreditCard;