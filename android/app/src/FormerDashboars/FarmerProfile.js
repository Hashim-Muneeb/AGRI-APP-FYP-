import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const FarmerProfile = ({ navigation }) => {
  const route = useRoute();
  const { userName, phoneNumber } = route.params;

  const [location, setLocation] = useState({ city: 'Loading...', country: 'Loading...' });
  const [farmerDetails, setFarmerDetails] = useState({
    name: 'Loading...',
    fatherName: 'Loading...',
    cnic: 'Loading...',
  });

  useEffect(() => {
    fetchLocation();
    fetchFarmerDetails();
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

  const fetchFarmerDetails = async () => {
    try {
      const querySnapshot = await firestore()
        .collection('Farmer')
        .where('phoneNumber', '==', phoneNumber)
        .get();

      if (!querySnapshot.empty) {
        const farmerData = querySnapshot.docs[0].data();
        setFarmerDetails({
          name: farmerData.name,
          fatherName: farmerData.fatherName,
          cnic: farmerData.cnicNumber,
        });
      } else {
        console.log('No matching document');
      }
    } catch (error) {
      console.error('Error fetching farmer details:', error);
    }
  };

  const handleWhatsAppSupport = () => {
    const phoneNumber = '+923425260324';
    const message = 'Hello, I need support.';
    const url = `whatsapp://send?text=${message}&phone=${phoneNumber}`;

    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "WhatsApp is not installed on this device.");
    });
  };

  return (
    <ScrollView style={styles.container}>
  <View style={styles.header}>
    <Text style={styles.headerText}>پروفائل</Text>
  </View>

  <View style={styles.profileSection}>
    <Text style={styles.label}>نام:</Text>
    <Text style={styles.text}>{farmerDetails.name}</Text>

    <Text style={styles.label}>والد کا نام:</Text>
    <Text style={styles.text}>{farmerDetails.fatherName}</Text>

    <Text style={styles.label}>فون نمبر:</Text>
    <Text style={styles.text}>{phoneNumber}</Text>

    <Text style={styles.label}>شناختی کارڈ نمبر:</Text>
    <Text style={styles.text}>{farmerDetails.cnic}</Text>

    <Text style={styles.label}>مقام:</Text>
    <Text style={styles.text}>{`${location.city}, ${location.country}`}</Text>
  </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Terms')}>
        <Text style={styles.buttonText}>شرائط و ضوابط</Text>

        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleWhatsAppSupport}>
        <Text style={styles.buttonText}>واٹس ایپ چیٹ کے ذریعے مدد</Text>

        </TouchableOpacity>
      </View>

      <Text style={styles.copyrightText}>© 2024 AGRI APP. All rights reserved.</Text>
    </ScrollView>
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
    marginBottom: 15,
    color: '#4b830d',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4b830d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  copyrightText: {
    marginTop: 140,
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
  },
});

export default FarmerProfile;
