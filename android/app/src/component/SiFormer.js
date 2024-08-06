import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Filed from './Filed';
import Button from './Button';
import firestore from '@react-native-firebase/firestore';
import { darkgreen } from './Constants';

const { width } = Dimensions.get('window');

const SiFormer = ({ navigation }) => {
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cnicNumber, setCnicNumber] = useState('');
  const [password, setPassword] = useState('');

  const saveUserData = async () => {
    if (!name || !fatherName || !phoneNumber || !cnicNumber || !password) {
      Alert.alert('خطا', 'براہ کرم تمام خانے بھریں۔');

      return;
    }

    if (password.length < 8) {
      Alert.alert('خطا', 'پاس ورڈ کم از کم 8 حروف کا ہونا ضروری ہے۔');

      return;
    }

    if (phoneNumber.length !== 11) {
      Alert.alert('خطا', 'فون نمبر 11 ہندسوں کا ہونا ضروری ہے۔');

      return;
    }

    if (cnicNumber.length !== 13) {
      Alert.alert('خطا', 'شناختی کارڈ نمبر 13 ہندسوں کا ہونا ضروری ہے۔');

      return;
    }

    try {
      const usersRef = firestore().collection('Farmer');
      await usersRef.add({
        name,
        fatherName,
        phoneNumber,
        cnicNumber,
        password,
      });
      console.log('User data saved successfully!');
      navigation.navigate('FormerDash', { name, phoneNumber });
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <LinearGradient colors={['#a8e063', '#56ab2f']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>کسان</Text>
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>خوش آمدید</Text>
          <Text style={styles.signUpText}>اپنا اکاؤنٹ بنائیں</Text>
          <Filed
            placeholder="اپنا نام درج کریں"
            value={name}
            onChangeText={(value) => setName(value)}
          />
          <Filed
            placeholder="اپنے والد کا نام درج کریں"
            value={fatherName}
            onChangeText={(value) => setFatherName(value)}
          />
          <Filed
            placeholder="اپنا نمبر درج کریں"
            keyboardType={'numeric'}
            value={phoneNumber}
            onChangeText={(value) => setPhoneNumber(value)}
          />
          <Filed
            placeholder="اپنا CNIC نمبر درج کریں"
            keyboardType={'numeric'}
            value={cnicNumber}
            onChangeText={(value) => {
              // Ensure only numeric input
              const numericValue = value.replace(/[^0-9]/g, '');
              setCnicNumber(numericValue);
            }}
          />
          <Filed
            placeholder="اپنا پاس ورڈ درج کریں"
            secureTextEntry={true}
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
          <Button
            btnLable="دبائیں"
            bgColor={darkgreen}
            textColor="white"
            Press={() => {
              saveUserData();
            }}
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
    width: '100%',
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
  signUpText: {
    color: 'gray',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SiFormer;
