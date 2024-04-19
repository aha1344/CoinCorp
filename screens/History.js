import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, SectionList, Image,SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';


const HistoryScreen = () => {
  const allTransactions = [
    { id: 1, name: 'Toters', time: 'Today 12:32', amount: '-$35.23', paidWith: 'Card', imageUrl: require('../assets/Toters.png') },
    { id: 2, name: 'Ahmad Adada', time: 'Today 15:21', amount: '+$100', paidWith: 'Wallet', imageUrl: require('../assets/sent.png') },
    { id: 3, name: 'Netflix', time: 'Today 09:45', amount: '-$20.00', paidWith: 'Card', imageUrl: require('../assets/Netflix.png') },
    { id: 4, name: 'ABC', time: 'Yesterday 12:32', amount: '-LBP 1,200,000', paidWith: 'Wallet', imageUrl: require('../assets/ABC.png') },
    { id: 5, name: 'Nike', time: 'Yesterday 02:12', amount: '-$50.23', paidWith: 'Card', imageUrl: require('../assets/Nike.png') },
    { id: 6, name: 'Uber', time: 'Yesterday 15:21', amount: '-$15.00', paidWith: 'Wallet', imageUrl: require('../assets/Uber.png') },
    { id: 7, name: 'Amazon.com', time: 'December 27 12:32', amount: '-$76.20', paidWith: 'Wallet', imageUrl: require('../assets/Amazon.png') },
    { id: 8, name: 'Dad', time: 'December 27 15:21', amount: '+$300', paidWith: 'Card', imageUrl: require('../assets/user.png') },
    { id: 9, name: 'Sony.com', time: 'December 27 09:45 ', amount: '-$51.00', paidWith: 'Wallet', imageUrl: require('../assets/Sony.png') },
  ];

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState(allTransactions);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [priceSort, setPriceSort] = useState('highest_to_lowest');
  const [paidWith, setPaidWith] = useState(null);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [transactionModalVisible, setTransactionModalVisible] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);


  const report = () => {
      alert('Report sent!');
    };
  const handleCopyToClipboard = () => {
    const { transactionNumber } = selectedTransaction;
    if (transactionNumber) {
      Clipboard.setStringAsync(transactionNumber.toString());
      // Show some feedback to the user, e.g., a toast message
      alert('Transaction number copied to clipboard!');
    }
  };
  const getRandomTransactionNumber = () => {
    return Math.floor(Math.random() * 9000000000) + 1000000000; // Generates a random 10-digit number
  };
  const handleArrowPress = (transaction) => {
    setSelectedTransaction({ ...transaction, transactionNumber: getRandomTransactionNumber() });
    setTransactionModalVisible(true);
  };
  const groupTransactionsByDay = () => {
    const transactionsByDay = {};
    searchResults.forEach((transaction) => {
      const day = transaction.time.split(' ')[0];
      if (!transactionsByDay[day]) {
        transactionsByDay[day] = [];
      }
      transactionsByDay[day].push(transaction);
    });
    return Object.entries(transactionsByDay).map(([day, data]) => ({ title: day, data }));
  };
  const filterTransactions = () => {
    if (searchText.trim()) {
      const filteredTransactions = allTransactions.filter(transaction =>
        transaction.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setSearchResults(filteredTransactions);
    } else {
      setSearchResults(allTransactions);
    }
  };
      // This function is called every time the search text is updated
    const handleSearch = (text) => {
      setSearchText(text);
      filterTransactions(text);
    };
  
    // Call filterTransactions whenever searchText is updated
    useEffect(() => {
      filterTransactions();
    }, [searchText]);
  

  const handleFilterPress = () => {
    setFilterModalVisible(true);
  };

  const togglePriceSort = (sortOrder) => {ç
    setPriceSort(sortOrder);
    filterTransactions();
  };

  const handlePaidWithChange = (paymentMethod) => {
    setPaidWith(paymentMethod);
    filterTransactions();
  };

  const setDateFromValue = (date) => {
    setDateFrom(date);
    filterTransactions();
  };

  const setDateToValue = (date) => {
    setDateTo(date);
    filterTransactions();
  };
  const handleDonePress = () => {
    setTransactionModalVisible(false);
  };
  const renderTransactionItem = ({ item }) => (
    <View style={[styles.transactionItem, styles.borderBottom]}>
      <Image source={item.imageUrl} style={styles.transactionImage} />
      <View style={styles.transactionTextContainer}>
        <Text style={styles.transactionName}>{item.name}</Text>
        <Text style={styles.transactionTime}>{item.time}</Text>
      </View>
      <Text style={[styles.transactionAmount, { color: item.amount.includes('-') ? 'red' : 'green' }]}>{item.amount}</Text>
      <TouchableOpacity style={styles.arrowButton} onPress={() => handleArrowPress(item)}>
      <Ionicons name="arrow-forward-outline" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
      <View style={styles.container}>
      <View style={styles.searchAndFilterContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Transaction..."
          value={searchText}
          onChangeText={handleSearch}
        />
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={groupTransactionsByDay()}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={renderTransactionItem}
        renderSectionHeader={({ section: { title } }) => (
          <View style={[styles.sectionHeader, styles.borderBottom]}>
            <Text style={styles.sectionHeaderTextWithBorder}>{title}</Text>
          </View>
        )}
      />

     <Modal visible={filterModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setFilterModalVisible(false)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Choose filter</Text>
            <View style={styles.modalFilterSection}>
              <Text style={styles.modalFilterLabel}>Price</Text>
              <View style={styles.filterOptionsContainer}>
                <TouchableOpacity
                  style={[
                    styles.sortOrderButton,
                    priceSort === 'lowest_to_highest' && styles.sortOrderButtonPressed,
                  ]}
                  onPress={() => togglePriceSort('lowest_to_highest')}
                />
                <Text style={styles.filterOptionText}>Lowest to highest</Text>
                <TouchableOpacity
                  style={[
                    styles.sortOrderButton,
                    priceSort === 'highest_to_lowest' && styles.sortOrderButtonPressed,
                  ]}
                  onPress={() => togglePriceSort('highest_to_lowest')}
                />
                <Text style={styles.filterOptionText}>Highest to lowest</Text>
              </View>
            </View>
            <View style={styles.modalFilterSection}>
              <Text style={styles.modalFilterLabel}>Paid with</Text>
              <View style={styles.filterOptionsContainer}>
                <TouchableOpacity
                  style={[
                    styles.sortOrderButton,
                    paidWith === 'Card' && styles.sortOrderButtonPressed,
                  ]}
                  onPress={() => handlePaidWithChange('Card')}
                />
                <Text style={styles.filterOptionText}>Card</Text>
                <TouchableOpacity
                  style={[
                    styles.sortOrderButton,
                    paidWith === 'Wallet' && styles.sortOrderButtonPressed,
                  ]}
                  onPress={() => handlePaidWithChange('Wallet')}
                />
                <Text style={styles.filterOptionText}>Wallet</Text>
              </View>
            </View>
            <View style={styles.modalFilterSection}>
              <Text style={styles.modalFilterLabel}>Date</Text>
              <View style={styles.dateFilterBox}>
                <Text style={styles.sortOrderText}>From: </Text>
                <TextInput
                  style={styles.dateInput}
                  value={dateFrom}
                  onChangeText={setDateFromValue}
                />
                <Text style={styles.sortOrderText}>To: </Text>
                <TextInput
                  style={styles.dateInput}
                  value={dateTo}
                  onChangeText={setDateToValue}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {selectedTransaction && (
       <Modal
       visible={transactionModalVisible}
       animationType="slide"
       transparent={true}
     >
       <View style={styles.modalOverlay}>
         <View style={[styles.transactionModal, styles.bottomModal]}>
           <View style={styles.transactionDetailContainer}>
             <View style={styles.transactionDetailHeader}>
               <Image
                 source={selectedTransaction.imageUrl}
                 style={styles.transactionDetailImage}
               />
               <View style={styles.transactionDetailNameContainer}>
                 <Text style={styles.transactionDetailName}>
                   {selectedTransaction.name}
                 </Text>
                 <Text style={styles.transactionDetailPaymentMethod}>
                  Paid with: {selectedTransaction.paidWith}
                </Text>
                 
               </View>
               <TouchableOpacity
                 style={styles.doneButton}
                 onPress={handleDonePress}
               >
                 <Text style={styles.doneButtonText}>Done</Text>
               </TouchableOpacity>
             </View>
             <View
                style={[
                  styles.transactionDetailAmountContainer,
                  {
                    backgroundColor: selectedTransaction.amount.includes('-')
                      ? '#f8d7da' // Background color for negative amounts
                      : '#d4edda', // Background color for positive amounts
                    borderRadius: 5,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.transactionDetailAmount,
                    {
                      color: selectedTransaction.amount.includes('-')
                        ? '#721c24' // Text color for negative amounts
                        : '#155724', // Text color for positive amounts
                    },
                  ]}
                >
                  {selectedTransaction.amount}
                </Text>
              </View>
              <View style={styles.Container2}>
                <Text style={styles.textmodal}>{selectedTransaction.time}</Text>
              </View>
              <View style={[styles.Container2, { flexDirection: 'row', alignItems: 'center' }]}>
                <Text style={styles.textmodal}> Transaction no.:</Text>
                <Text style={styles.textmodal}> {selectedTransaction.transactionNumber}</Text>
                <TouchableOpacity onPress={() => handleCopyToClipboard(selectedTransaction)}>
                  <Image source={require('../assets/copy.png')} style={styles.copyIcon} />
                </TouchableOpacity>
              </View>
           </View>
            <TouchableOpacity onPress={() => report()}>
              <Image source={require('../assets/Report.png')} style={styles.flag} />
            </TouchableOpacity>
         </View>
       </View>
     </Modal>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  searchAndFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '70%',
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  filterText: {
    color: 'white',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  transactionTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  transactionDay: {
    fontSize: 16,
    color: 'grey',
  },
  transactionName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  transactionTime: {
    fontSize: 16,
    color: 'grey',
  },
  transactionAmount: {
    fontSize: 16,
    color: 'red',
    marginRight: 5,
  },
  arrowButton: {
    padding: 8,
  },
  transactionImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: '90%',
    borderRadius: 10,
    position: 'relative',
  },
  bottomModal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalFilterSection: {
    marginBottom: 20,
  },
  modalFilterLabel: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sortOrderButton: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'transparent',
  },
  sortOrderButtonPressed: {
    backgroundColor: 'black',
  },
  sortOrderText: {
    fontSize: 14,
  },
  dateFilterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateInput: {
    flex: 1,
    height: 30,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  filterOptionText: {
    marginLeft: 5,
  },
  sectionHeader: {
    backgroundColor: '#f7f7f7',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  sectionHeaderTextWithBorder: {
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  transactionModal: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    paddingTop: 0,
  },
  modalHeader: {
    backgroundColor: 'black',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  transactionDetailContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  transactionDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  transactionDetailImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  transactionDetailNameContainer: {
    flex: 1,
  },
  transactionDetailName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionDetailTime: {
    fontSize: 14,
    color: 'black',
    textAlign: 'left', // Align text to the left
    width: '100%', // Ensure it takes full width to align properly
    borderBottomWidth: 6, // Add bottom border
    borderBottomColor: 'grey', // Set border color
    paddingBottom: 5, // Padding bottom for visual comfort
  },
  doneButton: {
    backgroundColor: 'black',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  doneButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionDetailAmountContainer: {
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  transactionDetailAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d9534f',
  },
  transactionDetailPaymentMethod: {
    fontSize: 14,
    marginBottom: 10,
  },
  transactionDetailNumber: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left', // Align text to the left
    width: '100%', // Ensure it takes full width to align properly
    borderBottomWidth: 1, // Add bottom border
    borderBottomColor: '#ddd', // Set border color
    paddingBottom: 5, // Padding bottom for visual comfort
  },
  Container2: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1, // Add border on all sides
    borderColor: 'lightgrey', // Set border color
    borderRadius: 5, // Round the corners
    padding: 20, // Add some padding
    marginBottom: 10, // Add margin at the bottom
  },
  copyIcon: {
    width: 20,
    height: 20,
    marginLeft: 130, // Align to the right
  },
  textmodal: {  
    fontSize: 12,
    padding: 0,
  },
  flag: {
    width: 150,
    height: 150,
    marginLeft: 20,
  },
});

export default HistoryScreen;