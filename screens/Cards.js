import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const CardsScreen = () => {
  // State to handle the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text>X</Text>
            </TouchableOpacity>
            {/* Form fields for credit card information */}
            <Text style={styles.modalText}>Full Name</Text>
            <Text style={styles.modalText}>Credit Card Number</Text>
            <Text style={styles.modalText}>Exp Date</Text>
            <Text style={styles.modalText}>CVV</Text>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.confirmButtonText}>Confirm card</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'black',
    width: 150,
  },
  buttonText: {
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  confirmButtonText: {
    color: 'white',
  },
});

export default CardsScreen;
