import React, { useState, useRef } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import TransactionItem from './TransactionItem';

export default function Transactions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('ascending');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const sortButtonRef = useRef(null);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!start || itemDate >= start) &&
      (!end || itemDate <= end)
    );
  });

  const sortedData = filteredData.sort((a, b) =>
    sortOrder === 'ascending' ? a.amount - b.amount : b.amount - a.amount
  );

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by title..."
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
      />
      <View style={styles.sortFilterContainer}>
        <Pressable
          ref={sortButtonRef}
          style={styles.sortButton}
          onPress={() => {
            sortButtonRef.current.measure((fx, fy, width, height, px, py) => {
              setButtonPosition({ x: px, y: py + height });
              setIsModalVisible(true);
            });
          }}>
          <Text>Sort By</Text>
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}>
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setIsModalVisible(false)}>
            <View style={[styles.modalView, { top: buttonPosition.y, left: buttonPosition.x }]}>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setSortOrder('ascending');
                  setIsModalVisible(false);
                }}>
                <Text>Ascending</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setSortOrder('descending');
                  setIsModalVisible(false);
                }}>
                <Text>Descending</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>

        <View style={styles.dateTimePickerContainer}>
        <Text style={styles.datePickerLabel}>Start Date</Text>
          <DateTimePicker
            style={styles.dateTimePicker}
            value={startDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setStartDate(selectedDate);
            }}
          />
          <Text style={styles.datePickerLabel}>End Date</Text>
          <DateTimePicker
            style={styles.dateTimePicker}
            value={endDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setEndDate(selectedDate);
            }}
          />
        </View>
      </View>
      <FlatList
        data={sortedData}
        renderItem={({ item }) => <TransactionItem data={item} />}
        keyExtractor={(item) => item.date}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerTitle}> Transactions</Text>
          </View>
        )}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
}

// Sample data
const data = [
  {
    title: 'Akamai Coffee Shop',
    location: 'Kihei, HI',
    date: '2024-03-09',
    amount: (Math.random() * 10).toFixed(2),
    icon: '#FB8E41',
  },
  {
    title: 'Shops at Wailea',
    location: 'Wailea, HI',
    date: '2024-02-28',
    amount: (Math.random() * 25).toFixed(2),
    icon: '#0091FF',
  },
  {
    title: 'Ono Hawaiian BBQ',
    location: 'Paia, HI',
    date: '2024-02-10',
    amount: (Math.random() * 25).toFixed(2),
    icon: '#0091FF',
  },
  {
    title: 'Fond',
    location: 'Lahaina, HI',
    date: '2024-01-25',
    amount: (Math.random() * 25).toFixed(2),
    icon: '#0091FF',
  },
  {
    title: 'Fond',
    location: 'Lahaina, HI',
    date: '2024-05-25',
    amount: (Math.random() * 25).toFixed(2),
    icon: '#0091FF',
  },
  {
    title: 'Ula’Ula Cafe',
    location: 'Waihee-Waiehu, HI',
    date: '2023-12-30',
    amount: (Math.random() * 15).toFixed(2),
    icon: '#FB8E41',
  },
  {
    title: "Tante's Fishmarket",
    location: 'Wailuku, HI',
    date: '2023-12-16',
    amount: (Math.random() * 10).toFixed(2),
    icon: '#0091FF',
  },
  
  
];

const styles = StyleSheet.create({
  dateTimePickerContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  datePickerLabel: {
    marginBottom: 4,
    fontSize: 12,
    color: '#666',
  },  
  header: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#ecf0f1',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    color: '#666',
  },
  searchInput: {
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
  },
  sortFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sortButton: {
    width: '50%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 6,
  },
  modalView: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '50%',
  },
  modalOption: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 6,
    backgroundColor: '#ddd',
    width: '100%',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },  
  datePickerButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 6,
  },
});
