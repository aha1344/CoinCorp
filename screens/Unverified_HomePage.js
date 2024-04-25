import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { Switch } from "react-native-paper";
import History from "./History";
import Friends from "./Friends";
import Cards from "./Cards";

const Unverified_HomePage = ({ navigation, route }) => {
  const { authToken } = route.params;
  const [profile, setProfile] = useState(null); // State to store user profile
  const [balance, setBalance] = useState();
  const [currency, setCurrency] = useState("USD");
  const [walletPin, setWalletPin] = useState();
  const [walletCodeOrEmail, setWalletCodeOrEmail] = useState("");
  const [isUSD, setIsUSD] = useState(true);
  const [cardColor, setCardColor] = useState("#076934");
  const [phoneNumber, setPhoneNumber] = useState("+961 71 259 564");
  const [activeTab, setActiveTab] = useState("home");
  const [paymentMethod, setPaymentMethod] = useState("wallet");
  const [amount, setAmount] = useState("");
  const [sendCurrency, setSendCurrency] = useState("USD");
  const exchangeRate = 88000;
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const openQrModal = () => setQrModalVisible(true);
  const closeQrModal = () => setQrModalVisible(false);
  const [requestModalVisible, setRequestModalVisible] = useState(false);
  const openRequestModal = () => setRequestModalVisible(true);
  const closeRequestModal = () => setRequestModalVisible(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [topUpModalVisible, setTopUpModalVisible] = useState(false);
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const openTopUpModal = () => setTopUpModalVisible(true);
  const closeTopUpModal = () => setTopUpModalVisible(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const openWithdrawModal = () => setWithdrawModalVisible(true);
  const closeWithdrawModal = () => setWithdrawModalVisible(false);
  const [payModalVisible, setPayModalVisible] = useState(false);
  const openPayModal = () => setPayModalVisible(true);
  const closePayModal = () => setPayModalVisible(false);

  useEffect(() => {
    // Fetch user profile using the token
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://192.168.1.102:3000/auth/profile", {
        method: "GET",
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      setProfile(data.result);
      const balanceResponse = await fetch(
        "http://192.168.1.102:3000/wallet/balance",
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      const balanceData = await balanceResponse.json();
      setBalance(balanceData.result);
      // Update phone number if available in the profile
      if (data.result.phone_number) {
        setPhoneNumber(data.result.phone_number);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  const Checkbox = ({ isSelected, onPress, label }) => (
    <TouchableOpacity style={styles.checkboxBase} onPress={onPress}>
      <View style={styles.checkboxIcon}>
        {isSelected && (
          <Image
            source={require("../assets/tick.png")}
            style={styles.checkboxTick}
          />
        )}
      </View>
      <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
  );

  const handleSendMoney = () => {
    let amountNumber = parseFloat(amount);
    if (sendCurrency === "LBP") {
      amountNumber = amountNumber / exchangeRate;
    }

    if (!isNaN(amountNumber) && amountNumber > 0 && amountNumber <= balance) {
      setBalance((currentBalance) => currentBalance - amountNumber);
      setAmount("");
      closeModal();
    } else {
      alert("Invalid amount or insufficient balance.");
    }
  };

  const handleCurrencyChange = () => {
    setIsUSD(!isUSD);
    setCurrency(isUSD ? "LBP" : "USD");
    setCardColor(isUSD ? "#105D6F" : "#076934");
  };

  const handleTabPress = (tabName) => {
    if (tabName === activeTab) {
      return;
    }
    setActiveTab(tabName);
  };

  const handleSettingsPress = () => {
    navigation.navigate("Settings", { authToken: authToken });
  };

  const formatBalance = (balance, isUSD) => {
    const displayBalance = isUSD ? balance : balance * exchangeRate;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: isUSD ? "USD" : "LBP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(displayBalance);
  };

  const handleTransfer = async () => {
    try {
      // Check if amount is valid
      const amountNumber = parseFloat(amount);
      if (isNaN(amountNumber) || amountNumber <= 0) {
        alert("Invalid amount");
        return;
      }

      // Check if wallet code or email and wallet pin are provided
      if (!walletCodeOrEmail || !walletPin) {
        alert("Please provide wallet code or email and wallet pin");
        return;
      }

      // Prepare the transfer data
      const transferData = {
        amount: amountNumber,
        wallet_code_or_email: walletCodeOrEmail,
        wallet_pin: `${walletPin}`,
      };

      // Send POST request to transfer money
      const response = await fetch(
        "http://192.168.1.102:3000/wallet/transfer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(transferData),
        }
      );

      if (response.ok) {
        // Transfer successful, update balance and clear fields
        setBalance((currentBalance) => currentBalance - amountNumber);
        setAmount("");
        setWalletCodeOrEmail("");
        setWalletPin("");
        closeModal(); // Close the modal after successful transfer
        alert("Transfer successful");
      } else {
        // Handle error response
        const errorData = await response.json();
        alert(`Transfer failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error transferring money:", error);
      alert("Error transferring money. Please try again later.");
    }
  };

  return (
    <View style={styles.container1}>
      {/* Render user profile if available */}
      {profile && activeTab === "home" && (
        <View style={styles.container}>
          <View style={styles.topSection}>
            <View style={styles.wallpaper}>
              <Image
                source={require("../assets/person.webp")}
                style={styles.profilepicture}
              />
              <View style={styles.textContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.name}>
                    {profile.first_name} {profile.last_name}
                  </Text>
                  {profile.verified && (
                    <Image
                      source={require("../assets/verified.png")}
                      style={styles.verifiedImage}
                    />
                  )}
                </View>
                <Text style={styles.phone}>{phoneNumber}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={handleSettingsPress}
            >
              <Image
                source={require("../assets/settings.png")}
                style={styles.settingsIcon}
              />
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
                    isSelected={paymentMethod === "wallet"}
                    onPress={() => setPaymentMethod("wallet")}
                    label="Wallet"
                  />
                  <Checkbox
                    isSelected={paymentMethod === "card"}
                    onPress={() => setPaymentMethod("card")}
                    label="Card"
                  />
                </View>
                <TextInput
                  style={styles.input}
                  onChangeText={setWalletPin}
                  value={walletPin}
                  placeholder="Wallet PIN"
                  secureTextEntry={true}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={setAmount}
                  value={amount}
                  placeholder="Amount"
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholder="To"
                  keyboardType="Text"
                  value={walletCodeOrEmail}
                  onChangeText={setWalletCodeOrEmail}
                />
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isSelected={sendCurrency === "USD"}
                    onPress={() => setSendCurrency("USD")}
                    label="USD"
                  />
                  <Checkbox
                    isSelected={sendCurrency === "LBP"}
                    onPress={() => setSendCurrency("LBP")}
                    label="LBP"
                  />
                </View>
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleTransfer}
                >
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
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
                <Text style={styles.modalTitle}>
                  Top-up Wallet from Credit Card
                </Text>
                <Text style={styles.text1}>Choose Card:</Text>
                <TextInput style={styles.input} />
                <TextInput
                  style={styles.input}
                  onChangeText={setAmount}
                  value={amount}
                  placeholder="Amount"
                  keyboardType="numeric"
                />
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isSelected={sendCurrency === "USD"}
                    onPress={() => setSendCurrency("USD")}
                    label="USD"
                  />
                  <Checkbox
                    isSelected={sendCurrency === "LBP"}
                    onPress={() => setSendCurrency("LBP")}
                    label="LBP"
                  />
                </View>
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={closeTopUpModal}
                >
                  <Text style={styles.sendButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
          <Modal
            visible={qrModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={closeQrModal}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPressOut={closeQrModal}
            >
              <View>
                <Image
                  source={require("../assets/scan.png")}
                  style={{ width: 200, height: 200 }}
                />
              </View>
            </TouchableOpacity>
          </Modal>
          <Modal
            visible={requestModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={closeRequestModal}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPressOut={closeRequestModal}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Request Payment</Text>
                <Text style={styles.text1}>Sender's Phone Number:</Text>
                <TextInput style={styles.input} keyboardType="numeric" />
                <TextInput
                  style={styles.input}
                  onChangeText={setAmount}
                  value={amount}
                  placeholder="Amount"
                  keyboardType="numeric"
                />
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isSelected={sendCurrency === "USD"}
                    onPress={() => setSendCurrency("USD")}
                    label="USD"
                  />
                  <Checkbox
                    isSelected={sendCurrency === "LBP"}
                    onPress={() => setSendCurrency("LBP")}
                    label="LBP"
                  />
                </View>
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={closeRequestModal}
                >
                  <Text style={styles.sendButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
          <Modal
            visible={withdrawModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={closeWithdrawModal}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPressOut={closeWithdrawModal}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Withdraw Funds</Text>
                <Text style={styles.text1}>Receiver Full Name:</Text>
                <TextInput style={styles.input} />
                <Text style={styles.text1}>Sender's Phone Number:</Text>
                <TextInput style={styles.input} keyboardType="numeric" />
                <TextInput
                  style={styles.input}
                  onChangeText={setAmount}
                  value={amount}
                  placeholder="Amount"
                  keyboardType="numeric"
                />
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isSelected={sendCurrency === "USD"}
                    onPress={() => setSendCurrency("USD")}
                    label="USD"
                  />
                  <Checkbox
                    isSelected={sendCurrency === "LBP"}
                    onPress={() => setSendCurrency("LBP")}
                    label="LBP"
                  />
                </View>
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={closeWithdrawModal}
                >
                  <Text style={styles.sendButtonText}>Withdraw</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
          <Modal
            visible={payModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={closePayModal}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPressOut={closePayModal}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Pay Online</Text>
                <Text style={styles.text2}>Pay from Wallet:</Text>
                <View style={styles.checkboxContainer}>
                  <Checkbox
                    isSelected={sendCurrency === "USD"}
                    onPress={() => setSendCurrency("USD")}
                    label="USD"
                  />
                  <Checkbox
                    isSelected={sendCurrency === "LBP"}
                    onPress={() => setSendCurrency("LBP")}
                    label="LBP"
                  />
                </View>
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={closePayModal}
                >
                  <Text style={styles.sendButtonText}>Pay</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Modal>
          <View style={[styles.creditCard, { backgroundColor: cardColor }]}>
            <Text style={styles.walletBalance}>Wallet Balance</Text>
            <Text style={styles.balance}>{formatBalance(balance, isUSD)}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                  <Image
                    source={require("../assets/Send.png")}
                    style={styles.boxes}
                  />
                  <Text style={styles.texts}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openTopUpModal}>
                  <Image
                    source={require("../assets/Top-up.png")}
                    style={styles.boxes}
                  />
                  <Text style={styles.texts}>Top-up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={openQrModal}
                  style={styles.scanButton}
                >
                  <Image
                    source={require("../assets/qrcode.png")}
                    style={styles.boxes}
                  />
                  <Text style={styles.texts}>Scan</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.optionButtons]}>
                <TouchableOpacity onPress={openRequestModal}>
                  <Image
                    source={require("../assets/Request.png")}
                    style={styles.boxes}
                  />
                  <Text style={styles.texts}>Request</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openPayModal}>
                  <Image
                    source={require("../assets/PayOnline.png")}
                    style={styles.boxes}
                  />
                  <Text style={styles.texts}>Payment</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openWithdrawModal}>
                  <Image
                    source={require("../assets/Withdraw.png")}
                    style={styles.boxes}
                  />
                  <Text style={styles.texts}>Withdraw</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}

      {activeTab === "history" && <History />}
      {activeTab === "friends" && <Friends />}
      {activeTab === "cards" && <Cards />}

      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={activeTab === "home" && styles.activeTab}
          onPress={() => handleTabPress("home")}
        >
          <Image source={require("../assets/Home.png")} style={styles.boxes} />
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTab === "history" && styles.activeTab}
          onPress={() => handleTabPress("history")}
        >
          <Image
            source={require("../assets/History.png")}
            style={styles.boxes}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTab === "cards" && styles.activeTab}
          onPress={() => handleTabPress("cards")}
        >
          <Image source={require("../assets/Card.png")} style={styles.boxes} />
        </TouchableOpacity>
        <TouchableOpacity
          style={activeTab === "friends" && styles.activeTab}
          onPress={() => handleTabPress("friends")}
        >
          <Image
            source={require("../assets/Friends.png")}
            style={styles.boxes}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  container1: {
    flex: 1,
    backgroundColor: "white",
    height: "100%",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  text1: {
    fontSize: 14,
    alignSelf: "flex-start",
    marginLeft: 15,
    marginBottom: 10,
  },
  text2: {
    fontSize: 14,
    alignSelf: "center",
    marginBottom: 10,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    elevation: 20,
    alignItems: "center",
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  checkboxBase: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    marginRight: 10,
  },
  checkboxIcon: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  checkboxTick: {
    width: 15,
    height: 15,
    resizeMode: "contain",
  },
  checkboxLabel: {
    marginLeft: 5,
  },
  input: {
    width: "90%",
    padding: 12,
    borderWidth: 1.5,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 5,
    width: "90%",
    alignItems: "center",
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "black",
    width: "100%",
    height: "20%",
  },
  textContainer: {
    marginLeft: 10,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    top: 10,
    left: 20,
  },
  unverified: {
    marginLeft: 10,
  },
  unverifiedImage: {
    width: 20,
    height: 20,
    marginLeft: 5,
    top: 10,
    left: 20,
  },
  texts: {
    textAlign: "center",
    marginRight: 2,
  },
  phone: {
    color: "white",
    fontSize: 16,
    marginRight: 10,
    top: 20,
    left: 20,
  },
  settingsIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    right: 18,
  },
  creditCard: {
    padding: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
    width: "80%",
    alignSelf: "center",
  },
  wallpaper: {
    flexDirection: "row",
    alignItems: "center",
  },
  walletBalance: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  balance: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
  },
  paymentOptions: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  paymentText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  optionButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 20,
  },
  boxes: {
    backgroundColor: "black",
    height: 70,
    width: 70,
    borderRadius: 20,
    marginBottom: 20,
    left: -1,
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  navButton: {
    padding: 10,
    borderRadius: 5,
    width: "25%",
    alignItems: "center",
  },
  profilepicture: {
    width: 65,
    height: 65,
    borderRadius: 50,
    top: 9,
    left: 15,
  },
  activeTab: {
    borderTopWidth: 5,
    borderTopColor: "black",
  },
});

export default Unverified_HomePage;
