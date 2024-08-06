import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert, Modal, TextInput, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import starFilledImage from '../Images/star_filled.png';
import starCornerImage from '../Images/star_corner.png';

const BookingScreen = ({ navigation, route }) => {
  const { phoneNumber } = route.params;
  const { name } = route.params;

  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [stars, setStars] = useState('');
  const [comments, setComments] = useState('');

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

  const handleFinishBooking = (booking) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const handleSubmitReview = async () => {
    if (!selectedBooking || !stars || !comments) {
      Alert.alert('براہ کرم تمام خانے بھریں۔');

      return;
    }
  
    try {
      // Add review to Reviews collection
      await firestore()
        .collection('Reviews')
        .add({
          name: selectedBooking.name,
          bookingId: selectedBooking.id,
          Id2: selectedBooking.contactNumber,
          stars: parseInt(stars),
          comments,
        });
  
      // Delete booking from Booked collection
      await firestore()
        .collection('Booked')
        .doc(selectedBooking.id)
        .delete();
  
      // Update quantity in Machine collection
      const machineRef = firestore().collection('Machine').where('name', '==', selectedBooking.name);
      const machineSnapshot = await machineRef.get();
      
      if (!machineSnapshot.empty) {
        // Only one document should match, assuming 'name' is unique
        const machineDoc = machineSnapshot.docs[0];
        const currentQuantity = machineDoc.data().quantity || 0;
        const updatedQuantity = currentQuantity + 1;
      
        await machineDoc.ref.update({
          quantity: updatedQuantity,
        });
      } else {
        console.error('Machine document not found:', selectedBooking.name);
        Alert.alert('مشین نہیں ملی، مقدار اپ ڈیٹ نہیں کی جا سکتی۔');

      }
  
      Alert.alert('جائزہ جمع کر دیا گیا اور بکنگ کامیابی سے مکمل ہوگئی ہے۔');

      setModalVisible(false);
      setSelectedBooking(null);
      setStars('');
      setComments('');
    } catch (error) {
      console.error('Error submitting review and updating booking:', error);
      Alert.alert('جائزہ جمع کرنے اور بکنگ اپ ڈیٹ کرنے میں خطا آیا ہے۔');

    }
  };

  const renderBookingItem = ({ item }) => (
    <View style={styles.bookingItem}>
      <Text style={styles.bookingText}>نام: {item.name}</Text>
      <Text style={styles.bookingText}>مالک کا نام: {item.ownername}</Text>
      <Text style={styles.bookingText}>گھنٹے: {item.hours}</Text>
      <Text style={styles.bookingText}>کل قیمت: {item.totalPrice}</Text>
      <Text style={styles.bookingText}>پتہ: {item.address}</Text>
      <Text style={styles.bookingText}>رابطہ نمبر: {item.contactNumber}</Text>
      <Button title="بکنگ مکمل کریں" onPress={() => handleFinishBooking(item)} />
    </View>
  );

  const renderStar = (index) => {
    return (
      <TouchableOpacity onPress={() => setStars(index + 1)}>
        <Image
          source={index < stars ? starFilledImage : starCornerImage}
          style={styles.star}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>بکنگز</Text>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        renderItem={renderBookingItem}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>اپنا جائزہ جمع کروائیں</Text>

          <View style={styles.starContainer}>
            {[...Array(5)].map((_, index) => (
              <View key={index}>{renderStar(index)}</View>
            ))}
          </View>

          <TextInput
            placeholder="تبصرے"
            value={comments}
            onChangeText={setComments}
            style={styles.input}
          />
          <View style={styles.modalButtons}>
            <Button title="جائزہ جمع کریں" onPress={handleSubmitReview} />
            <View style={{ height: 10 }} />
            <Button title="منسوخ کریں" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'deepskyblue',
  },
  bookingItem: {
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '80%',
  },
  starContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  star: {
    width: 40,
    height: 40,
    marginRight: 5,
  },
  modalButtons: {
    marginTop: 20,
  },
});

export default BookingScreen;
