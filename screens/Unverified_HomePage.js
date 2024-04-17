import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation


const Unverified_HomePage = () => {
  const navigation = useNavigation(); // Initialize navigation object

  const [balance, setBalance] = useState(100);
  const [currency, setCurrency] = useState('USD');
  const [isUSD, setIsUSD] = useState(true);
  const [cardColor, setCardColor] = useState('#076934');
  const [phoneNumber, setPhoneNumber] = useState('+9617125964');
  const [activeTab, setActiveTab] = useState('home');

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
    if (tabName === 'home' && activeTab === 'home') {
      return; // If already on Home screen, do nothing
    }

    setActiveTab(tabName);
    switch (tabName) {
      case 'home':
        // No navigation needed if already on Home screen
        break;
      case 'history':
        navigation.navigate('History');
        break;
      case 'cards':
        navigation.navigate('Cards');
        break;
      case 'friends':
        navigation.navigate('Friends');
        break;
      default:
        break;
    }
  };


  const handleSettingsPress = () => {
    navigation.navigate('Settings'); // Navigate to SettingsScreen
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
        </View>

        <View style={[styles.optionButtons]}>
          <TouchableOpacity onPress={() => handleTabPress('home')}>
            <Image source={require('../assets/Send.png')} style={styles.boxes} />
            <Text style={styles.texts}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabPress('history')}>
            <Image source={require('../assets/Top-up.png')} style={styles.boxes} />
            <Text style={styles.texts}>Top-up</Text>
          </TouchableOpacity>
          <TouchableOpacity >
            <Image source={require('../assets/qrcode.png')} style={styles.boxes} />
            <Text style={styles.texts}>Scan to pay</Text>
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
            <Text style={styles.texts}>withdraw</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomNavigation}>
          <TouchableOpacity
            style={activeTab === 'home' ? [styles.navButton, styles.activeTab] : styles.navButton}
            onPress={() => handleTabPress('home')}>
            <Image source={require('../assets/Home.png')} style={styles.boxes} />
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === 'history' ? [styles.navButton, styles.activeTab] : styles.navButton}
            onPress={() => handleTabPress('history')}>
            <Image source={require('../assets/History.png')} style={styles.boxes} />
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === 'cards' ? [styles.navButton, styles.activeTab] : styles.navButton}
            onPress={() => handleTabPress('cards')}>
            <Image source={require('../assets/Card.png')} style={styles.boxes} />
          </TouchableOpacity>
          <TouchableOpacity
            style={activeTab === 'friends' ? [styles.navButton, styles.activeTab] : styles.navButton}
            onPress={() => handleTabPress('friends')}>
            <Image source={require('../assets/Friends.png')} style={styles.boxes} />
          </TouchableOpacity>
        </View>
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
    backgroundColor: 'white',
    height: '100%',
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
  },
  unverified: {
    marginLeft: 10,
  },
  unverifiedImage: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  texts: {
    textAlign: 'center',
  },
  phone: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
  settingsIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
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
  },
  activeTab: {
    borderTopWidth: 5,
    borderTopColor: 'black',
  },
});

export default Unverified_HomePage;
