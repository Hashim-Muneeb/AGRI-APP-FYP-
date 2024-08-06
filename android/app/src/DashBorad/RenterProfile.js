import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const { width } = Dimensions.get('window');

const RenterProfile = ({ navigation }) => {
  const route = useRoute();
  const { userName, phoneNumber } = route.params;

  const [location, setLocation] = useState({ city: 'Loading...', country: 'Loading...' });
  const [RenterDetails, setRenterDetails] = useState({
    name: 'Loading...',
    fatherName: 'Loading...',
    cnic: 'Loading...',
  });

  useEffect(() => {
    // Fetch location on component mount
    fetchLocation();

    // Fetch Renter details from Firestore
    fetchRenterDetails();
  }, []);

  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchCityAndCountry(latitude, longitude);
      },
      (error) => {
        console.log(error.code, error.message);
        setLocation({ city: 'Unknown', country: 'Unknown' });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const fetchCityAndCountry = async (latitude, longitude) => {
    try {
      const response = await axios.get(`https://geocode.xyz/${latitude},${longitude}?json=1`);
      const { city, country } = response.data;
      setLocation({ city, country });
    } catch (error) {
      console.error('Error fetching location:', error);
      setLocation({ city: 'Unknown', country: 'Unknown' });
    }
  };

  const fetchRenterDetails = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('Renter')
        .where('phoneNumber', '==', phoneNumber)
        .get();

      if (!querySnapshot.empty) {
        const renterData = querySnapshot.docs[0].data();
        setRenterDetails({
          name: renterData.userName,
          fatherName: renterData.fatherName,
          cnic: renterData.cnicNumber,
        });
      } else {
        console.log('No matching document');
      }
    } catch (error) {
      console.error('Error fetching Rental Owner details:', error);
    }
  };

  const handleWhatsAppSupport = () => {
    const supportPhoneNumber = '+923425260324'; // Replace with your support number
    const message = 'Hello, I need support.';
    const url = `whatsapp://send?text=${message}&phone=${supportPhoneNumber}`;

    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "WhatsApp is not installed on this device.");
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>مالک مشین کا پروفائل</Text>

      </View>

      <View style={styles.profileSection}>
        <Text style={styles.label}>نام:</Text>
        <Text style={styles.text}>{RenterDetails.name}</Text>

        <Text style={styles.label}>والد کا نام:</Text>
        <Text style={styles.text}>{RenterDetails.fatherName}</Text>

        <Text style={styles.label}>فون نمبر:</Text>
        <Text style={styles.text}>{phoneNumber}</Text>

        <Text style={styles.label}>شناختی کارڈ نمبر:</Text>
        <Text style={styles.text}>{RenterDetails.cnic}</Text>

        <Text style={styles.label}>مقام:</Text>
        <Text style={styles.text}>{`${location.city}, ${location.country}`}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Terms')}>
        <Text style={styles.buttonText}>شرائط و ضوابط</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleWhatsAppSupport}>
        <Text style={styles.buttonText}>واٹس ایپ چیٹ کے ذریعے مدد</Text>
      </TouchableOpacity>

      <Text style={styles.copyRightText}>© 2024 AGRI APP. All rights reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'deepskyblue',
    padding: 20,
  },
  header: {
    backgroundColor: '#4b830d',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  profileSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#4b830d',
  },
  button: {
    backgroundColor: '#042704',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  copyRightText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 'auto',
  },
});

export default RenterProfile;
