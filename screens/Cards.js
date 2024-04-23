import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';

const CardsScreen = () => {
  // State to handle the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  // State to store the credit card details
  const [fullName, setFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCVV] = useState('');

  // Function to handle the confirmation of the card details
  const handleConfirm = () => {
    // You can implement your logic here to handle the confirmation of the card details
    // For example, validate the card details and then save them or send them to your server
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Button to open the modal */}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.button}>
        <Text style={styles.buttonText}>Add card</Text>
      </TouchableOpacity>

      {/* Modal for adding card details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Credit Card Number</Text>
                <TextInput
                  style={styles.input}
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Exp Date (MM/YY)</Text>
                <TextInput
                  style={styles.input}
                  value={expDate}
                  onChangeText={setExpDate}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>CVV</Text>
                <TextInput
                  style={styles.input}
                  value={cvv}
                  onChangeText={setCVV}
                  keyboardType="numeric"
                />
              </View>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
              >
                <Text style={styles.confirmButtonText}>Confirm card</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

// Styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // You can change this color to match your theme
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'black',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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
    width: '90%', // Adjust as needed
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  closeButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD', // Change the border color as needed
    padding: 10,
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#FFF', // Change the background color as needed
  },
  confirmButton: {
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 15,
    elevation: 2,
    width: '100%', // Adjust as needed
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CardsScreen;