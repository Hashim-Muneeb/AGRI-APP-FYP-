import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { darkgreen } from './Constants';

const { width } = Dimensions.get('window');

const Signup = ({ navigation }) => {
  const StyledButton = ({ title, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    // <LinearGradient colors={['#a8e063', '#56ab2f']} style={styles.gradient}>
    <View style={styles.container}>
      <Text style={styles.title}>اپنا اکاؤنٹ بنائیں</Text>
      <View style={styles.formContainer}>
        <Text style={styles.welcomeText}>خوش آمدید</Text>
        <StyledButton
          title="کسان کے طور پر اکاؤنٹ بنائیں"
          onPress={() => navigation.navigate('SiFormer')}
        />
        <StyledButton
          title="مالک مشین کے طور پر اکاؤنٹ بنائیں"
          onPress={() => navigation.navigate('SiRenter')}
        />
      </View>
    </View>
    // </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'deepskyblue', // Change background color here
  },
  title: {
    color: '#006400',
    fontSize: 34,
    fontWeight: 'bold',
    marginVertical: 30,
    borderRadius: 10,
    backgroundColor: '#90EE90',
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    width: width * 0.9, // Responsive width
    maxWidth: 400, // Max width for larger screens
  },
  welcomeText: {
    fontSize: 40,
    color: darkgreen,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: darkgreen,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 10,
    width: '100%', // Full width
    maxWidth: 400, // Max width for larger screens
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Signup;
