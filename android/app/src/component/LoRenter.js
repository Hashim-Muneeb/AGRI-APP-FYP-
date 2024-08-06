import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Filed from './Filed';
import Button from './Button';
import { darkgreen } from './Constants';
import firestore from '@react-native-firebase/firestore'; 

const { width } = Dimensions.get('window');

const LoRenter = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      
      const querySnapshot = await firestore()
        .collection('Renter')
        .where('phoneNumber', '==', phoneNumber)
        .where('password', '==', password)
        .get();

      if (!querySnapshot.empty) {
        let userName = ''; // Initialize userName variable

        // Retrieve user data from the query snapshot
        querySnapshot.forEach(doc => {
          const userData = doc.data();
          userName = userData.userName; // Assign the user's name
        });

        // Navigate to the dashboard and pass the user's name as a parameter
        navigation.navigate('OwnerDashboard', { userName , phoneNumber });
      }else {
        Alert.alert('خطا', 'غلط فون نمبر یا پاس ورڈ۔');

      }
    } catch (error) {
      console.error('Error signing in:', error);
      Alert.alert('خطا', 'ایک خطا واقع ہوئی۔ براہ کرم دوبارہ کوشش کریں۔');

    }
  };

  return (
    <LinearGradient colors={['#a8e063', '#56ab2f']} style={styles.gradient}>
      <View style={styles.container}>
      <Text style={styles.title}>مالک مشین</Text>

        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>خوش آمدید</Text>
          <Text style={styles.signInText}>اپنا اکاؤنٹ لاگ ان کریں۔</Text>
          <Filed
            placeholder="اپنا نمبر درج کریں"
            keyboardType={'numeric'}
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            style={styles.input}
          />
          <Filed
            placeholder="اپنا پاس ورڈ درج کریں"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
            style={styles.input}
          />
          <Button
            btnLable="دبائیں"
            bgColor={darkgreen}
            textColor="white"
            Press={handleSignIn}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 64,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 50,
    paddingHorizontal: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: width * 0.9,
  },
  welcomeText: {
    fontSize: 40,
    color: darkgreen,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  signInText: {
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 20,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: darkgreen,
    padding: 10,
    textAlign: 'right', 
  },
});

export default LoRenter;
