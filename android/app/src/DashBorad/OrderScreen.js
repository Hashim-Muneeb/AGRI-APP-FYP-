import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore'; 

const OrderScreen = ({ route }) => {
  const { phoneNumber } = route.params;

  const [bookings, setBookings] = useState([]);
  const [bookingDetails, setBookingDetails] = useState([]);

  useEffect(() => {
    const unsubscribeBookings = firestore()
      .collection('Booked')
      .where('FarmerNumber', '==', phoneNumber)
      .onSnapshot(snapshot => {
        const fetchedBookings = [];
        snapshot.forEach(doc => {
          fetchedBookings.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setBookings(fetchedBookings);
      });

    return () => {
      unsubscribeBookings();
    };
  }, []);

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const fetchBookingDetails = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('Booked')
        .where('contactNumber', '==', phoneNumber)
        .get();
      const details = [];
      querySnapshot.forEach(doc => {
        details.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setBookingDetails(details);
    } catch (error) {
      console.error('Error fetching booking details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>آرڈرز</Text>
      </View>
      
      {bookingDetails.map(detail => (
        <View key={detail.id} style={styles.notificationItem}>
          <Text style={styles.bookingText}>خریدار کا نام: {detail.buyerName}</Text>
          <Text style={styles.bookingText}>پتہ: {detail.address}</Text>
          <Text style={styles.bookingText}>کسان کا نمبر: {detail.FarmerNumber}</Text>
          <Text style={styles.bookingText}>گھنٹے: {detail.hours}</Text>
          <Text style={styles.bookingText}>کل قیمت: {detail.totalPrice}</Text>
          <Text style={styles.bookingText}>مشین کا نام: {detail.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'deepskyblue',
  },
  notificationItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    backgroundColor: '#4b830d',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  bookingText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default OrderScreen;
