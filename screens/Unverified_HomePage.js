import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal,TextInput} from 'react-native';
import { Switch, Checkbox } from 'react-native-paper';
import History from './History'; // Import the HistoryContent component
import Friends from './Friends'; // Import the FriendsContent component
import Cards from './Cards'; // Import the CardsContent component

const Unverified_HomePage = ({ navigation }) => {
  const [balance, setBalance] = useState(100);
  const [currency, setCurrency] = useState('USD');
  const [isUSD, setIsUSD] = useState(true);
  const [cardColor, setCardColor] = useState('#076934');
  const [phoneNumber, setPhoneNumber] = useState('+961 71 259 564');
  const [activeTab, setActiveTab] = useState('home');
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [amount, setAmount] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [topUpModalVisible, setTopUpModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const openTopUpModal = () => setTopUpModalVisible(true);
  const closeTopUpModal = () => setTopUpModalVisible(false);

  const Checkbox = ({ isSelected, onPress, label }) => (
    <TouchableOpacity style={[styles.checkboxBase, isSelected && styles.checkboxChecked]} onPress={onPress}>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    if (isUSD) {
      setBalance(100);
    }
  }, [isUSD]);

  const handleCurrencyChange = () => {
    if (isUSD) {
      setBalance(previousBalance => previousBalance * 88000);
      setCurrency('LBP');
      setCardColor('#105D6F');
    } else {
      setBalance(previousBalance => previousBalance / 88000);
      setCurrency('USD');
      setCardColor('#076934');
    }
    setIsUSD(!isUSD);
  };
  

  const handleTabPress = (tabName) => {
    if (tabName === activeTab) {
      return; // If the tab being pressed is already active, do nothing
    }
    setActiveTab(tabName);
  };

  const handleSettingsPress = () => {
    navigation.navigate('Settings');
  };

  const formatBalance = (balance, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(balance);
  };

  return (
    <View style={styles.container1}>
      {activeTab === 'home' && (
        <View style={styles.container}>
          <View style={styles.topSection}>
            <View style={styles.wallpaper}>
              <Image source={require('../assets/adada.jpg')} style={styles.profilepicture} />
              <View style={styles.textContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>AhmadAdada</Text>
                  <Image source={require('../assets/unverified.png')} style={styles.unverifiedImage} />
                </View>
                <Text style={styles.phone}>{phoneNumber}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
              <Image source={require('../assets/settings.png')} style={styles.settingsIcon} />
            </TouchableOpacity>
          </View>
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={closeModal}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPressOut={closeModal}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Send Money</Text>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isSelected={paymentMethod === 'wallet'}
                    onPress={() => setPaymentMethod('wallet')}
                    label="Wallet"
                  />
                  <Checkbox
                    isSelected={paymentMethod === 'card'}
                    onPress={() => setPaymentMethod('card')}
                    label="Card"
                  />
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={setAmount}
                  value={amount}
                  placeholder="Amount"
                  keyboardType="numeric"
                />
                <TouchableOpacity style={styles.sendButton} >
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
          
          <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={closeModal}
        >
          <View style={styles.modalContent}>
            <Text>Send Money</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
        {/* New Modal for Top-up */}
        <Modal
          visible={topUpModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={closeTopUpModal}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPressOut={closeTopUpModal}
          >
            <View style={styles.modalContent}>
              <Text>Top Up Account</Text>
              <TouchableOpacity onPress={closeTopUpModal}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
          <View style={[styles.creditCard, { backgroundColor: cardColor }]}>
            <Text style={styles.walletBalance}>Wallet Balance</Text>
            <Text style={styles.balance}>{formatBalance(balance, currency)}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.balance}>USD</Text>
              <Switch
                value={!isUSD}
                onValueChange={handleCurrencyChange}
                color="#009688"
              />
              <Text style={styles.balance}>LBP</Text>
            </View>
          </View>
            <View style={styles.container1}>
            <View style={styles.paymentOptions}>
              <Text style={styles.paymentText}>Payment Options</Text>

            <View style={[styles.optionButtons]}>
            <TouchableOpacity onPress={openModal}>
              <Image source={require('../assets/Send.png')} style={styles.boxes} />
              <Text style={styles.texts}>Send</Text>
            </TouchableOpacity>
              <TouchableOpacity onPress={openTopUpModal}>
                <Image source={require('../assets/Top-up.png')} style={styles.boxes} />
                <Text style={styles.texts}>Top-up</Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <Image source={require('../assets/qrcode.png')} style={styles.boxes} />
                <Text style={styles.texts}>Scan</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.optionButtons]}>
              <TouchableOpacity >
                <Image source={require('../assets/Request.png')} style={styles.boxes} />
                <Text style={styles.texts}>Request</Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <Image source={require('../assets/PayOnline.png')} style={styles.boxes} />
                <Text style={styles.texts}>Payment</Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <Image source={require('../assets/Withdraw.png')} style={styles.boxes} />
                <Text style={styles.texts}>Withdraw</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </View>
      )}

      {activeTab === 'history' && (
        <History />
      )}
      {activeTab === 'friends' && (
        <Friends />
      )}
      {activeTab === 'cards' && (
        <Cards />
      )}


      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={activeTab === 'home' && styles.activeTab}
          onPress={() => handleTabPress('home')}>
          <Image source={require('../assets/Home.png')} style={styles.boxes} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={activeTab === 'history' && styles.activeTab}
          onPress={() => handleTabPress('history')}>
          <Image source={require('../assets/History.png')} style={styles.boxes} />
        </TouchableOpacity>
        <TouchableOpacity style={activeTab === 'cards' && styles.activeTab}
          onPress={() => handleTabPress('cards')}>
          <Image source={require('../assets/Card.png')} style={styles.boxes} />
        </TouchableOpacity>
        <TouchableOpacity style={activeTab === 'friends' && styles.activeTab}
          onPress={() => handleTabPress('friends')}>
          <Image source={require('../assets/Friends.png')} style={styles.boxes} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  container1: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkboxBase: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'grey',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: 'lightblue',
  },
  checkboxLabel: {
    marginLeft: 5,
  },
  input: {
    width: '90%',
    padding: 12,
    borderWidth: 1.5,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black',
    width: '100%',
    height: '20%',
  },
  textContainer: {
    marginLeft: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    top: 10,
    left: 20
  },
  unverified: {
    marginLeft: 10,
  },
  unverifiedImage: {
    width: 20,
    height: 20,
    marginLeft: 5,
    top: 10,
    left: 20
  },
  texts: {
    textAlign: 'center',
    marginRight: 2
  },
  phone: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
    top: 20,
    left: 20
  },
  settingsIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    right: 18
  },
  creditCard: {
    padding: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 80,
    width: '80%',
    alignSelf: 'center',
  },
  wallpaper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletBalance: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  balance: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  },
  paymentOptions: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  paymentText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
  },
  optionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  boxes: {
    backgroundColor: 'black',
    height: 70,
    width: 70,
    borderRadius: 20,
    marginBottom: 20,
    left: -1
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  navButton: {
    padding: 10,
    borderRadius: 5,
    width: '25%',
    alignItems: 'center',
  },
  profilepicture: {
    width: 65,
    height: 65,
    borderRadius: 50,
    top: 9,
    left: 15
  },
  activeTab: {
    borderTopWidth: 5,
    borderTopColor: 'black',
  },
});

export default Unverified_HomePage;
