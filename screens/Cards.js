import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

import CreditCard from './CreditCard'; // Import the custom CreditCard component

// Helper function to format card number input
function formatCardNumberInput(input) {
  // Remove any non-digit characters and match groups of four digits
  const groups = input.replace(/\D/g, '').match(/.{1,4}/g);
  // Join groups with spaces and return the formatted string
  return groups ? groups.join(' ') : input;
}

const CardsScreen = () => {
  // State to handle the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmRemoveModalVisible, setConfirmRemoveModalVisible] = useState(false);

  // State to store the current card details
  const [fullName, setFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvv, setCVV] = useState('');

  // State to store the list of cards
  const [cards, setCards] = useState([]);

  // State to manage visibility of card details
  const [showDetails, setShowDetails] = useState({});

  // Load cards from AsyncStorage on component mount
  useEffect(() => {
    const loadCards = async () => {
      try {
        const storedCards = await AsyncStorage.getItem('cards');
        if (storedCards) {
          setCards(JSON.parse(storedCards));
        }
      } catch (error) {
        console.error('Failed to load cards:', error);
      }
    };
    loadCards();
  }, []);

  // Save cards to AsyncStorage whenever cards state changes
  useEffect(() => {
    const saveCards = async () => {
      try {
        await AsyncStorage.setItem('cards', JSON.stringify(cards));
      } catch (error) {
        console.error('Failed to save cards:', error);
      }
    };
    saveCards();
  }, [cards]);

  // Function to handle the confirmation of the card details
  const handleConfirm = () => {
    // Validation check to ensure all fields are filled
    if (!fullName || !cardNumber || !expMonth || !expYear || !cvv) {
      // Show an alert if any field is empty
      Alert.alert(
        'Incomplete Information',
        'Please fill in all fields before confirming the card details.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Validation check for card number length
    const strippedCardNumber = cardNumber.replace(/\D/g, ''); // Remove non-digit characters
    if (strippedCardNumber.length < 12 || strippedCardNumber.length > 16) {
      // Show an alert if card number length is not between 12 and 16 digits
      Alert.alert(
        'Invalid Card Number',
        'Card number must be between 12 and 16 digits.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Validation check for expiration month
    const expMonthNumber = parseInt(expMonth, 10);
    if (expMonthNumber < 1 || expMonthNumber > 12) {
      // Show an alert if expiration month is not between 1 and 12
      Alert.alert(
        'Invalid Expiration Month',
        'Expiration month must be between 1 and 12.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Create the expiration date string
    const expDate = `${expMonth}/${expYear}`;

    // Create a new card object
    const newCard = {
      fullName,
      cardNumber: strippedCardNumber, // Use stripped card number without formatting
      expDate,
      cvv,
    };

    // Add the new card to the list of cards
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);

    // Reset input fields
    setFullName('');
    setCardNumber('');
    setExpMonth('');
    setExpYear('');
    setCVV('');

    // Close the modal
    setModalVisible(false);
  };

  // Function to handle card removal
  // Function to handle card removal
const handleRemoveCard = () => {
  // If there's only one card, show the confirmation modal
  if (cards.length === 1) {
    setConfirmRemoveModalVisible(true);
    return;
  }

  // Prompt the user to choose which card to remove
  Alert.alert(
    'Choose a card to remove',
    'Select a card from the list:',
    cards.map((card, index) => ({
      text: `${card.fullName} - ${card.cardNumber.slice(-4)}`, // Display the full name and last 4 digits of the card number
      onPress: () => {
        // Show another confirmation alert before deleting the card
        Alert.alert(
          'Confirm Deletion',
          `Are you sure you want to delete ${card.fullName} - ${card.cardNumber.slice(-4)}?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Yes, delete',
              onPress: () => {
                // Remove the chosen card
                const updatedCards = cards.filter((_, i) => i !== index);
                setCards(updatedCards);
              },
            },
          ],
        );
      },
    })),
  );
};

  // Function to confirm the removal of the last card
  const confirmRemoveLastCard = () => {
    setCards([]);
    setConfirmRemoveModalVisible(false);
  };

  // Function to toggle visibility of card details
  const handleToggleVisibility = (index) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {cards.map((card, index) => (
          <View style={styles.cardsContainer} key={index}>
            <Text style={styles.indexCard}>Card {index + 1}</Text>
            <CreditCard
              card={card}
              cardLabel={`Card ${index + 1}`}
              showDetails={showDetails[index]}
              onToggleVisibility={() => handleToggleVisibility(index)}
            />
          </View>
        ))}

        {/* Button container */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
            <Text style={styles.buttonText}>Add card</Text>
          </TouchableOpacity>

          {/* Conditionally render the Remove card button */}
          {cards.length > 0 && (
            <TouchableOpacity onPress={handleRemoveCard} style={styles.removeButton}>
              <Text style={styles.buttonText}>Remove card</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Modal for adding card details */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* Add a close button (X) in the top right corner */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Add Card Details</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Card Number</Text>
                <TextInput
                  style={styles.input}
                  value={cardNumber}
                  onChangeText={(text) => setCardNumber(formatCardNumberInput(text))}
                  keyboardType="numeric"
                  maxLength={19} // Adjust the maximum length to account for spaces
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Exp Date (MM/YY)</Text>
                <View style={styles.expDateContainer}>
                  <TextInput
                    style={[styles.input, styles.expDateInput]}
                    value={expMonth}
                    onChangeText={setExpMonth}
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder="MM"
                  />
                  <Text style={styles.expDateSlash}>/</Text>
                  <TextInput
                    style={[styles.input, styles.expDateInput]}
                    value={expYear}
                    onChangeText={setExpYear}
                    keyboardType="numeric"
                    maxLength={2}
                    placeholder="YY"
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={styles.input}
                  value={cvv}
                  onChangeText={setCVV}
                  keyboardType="numeric"
                  maxLength={3} // Allow only 3 digits for CVV
                />
              </View>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal for confirming the removal of the last card */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmRemoveModalVisible}
          onRequestClose={() => setConfirmRemoveModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Confirm Card Removal</Text>
              <Text style={styles.modalText}>Are you sure you want to remove the last card?</Text>
              <View style={styles.confirmRemoveButtonContainer}>
                <TouchableOpacity
                  style={[styles.confirmRemoveButton, styles.confirmRemoveButtonConfirm]}
                  onPress={confirmRemoveLastCard}
                >
                  <Text style={styles.confirmRemoveButtonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.confirmRemoveButton, styles.confirmRemoveButtonCancel]}
                  onPress={() => setConfirmRemoveModalVisible(false)}
                >
                  <Text style={styles.confirmRemoveButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 50,
    backgroundColor: '#FFFFFF',
  },
  cardsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 40,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: 'black',
    borderRadius: 10,
    marginRight: 10,
  },
  removeButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  confirmButton: {
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 15,
    width: '100%',
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'black',
  },
  indexCard: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 5,
  },
  confirmRemoveButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmRemoveButton: {
    borderRadius: 20,
    padding: 15,
    width: '45%',
  },
  confirmRemoveButtonConfirm: {
    backgroundColor: 'red',
  },
  confirmRemoveButtonCancel: {
    backgroundColor: 'gray',
  },
  confirmRemoveButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  expDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expDateInput: {
    flex: 1,
    marginRight: 10,
  },
  expDateSlash: {
    marginRight: 10,
    fontSize: 18,
  },
});

export default CardsScreen;
