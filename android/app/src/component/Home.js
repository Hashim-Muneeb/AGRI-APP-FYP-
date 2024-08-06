import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from './Button';

const {width} = Dimensions.get('window');
const earthGreen = '#4b830d'; // Deep green
const lightGreen = '#a8e063'; // Light green

const Home = ({navigation}) => {
  return (
    <LinearGradient colors={['#a8e063', '#56ab2f']} style={styles.gradient}>
      <View style={styles.container}>
        <Image
          source={require('../Images/logo.webp')} // Update the path to your logo
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>ایگری ایپ</Text>
        <Text style={styles.subtitle}>میں خوش آمدید</Text>
        <Button
          style={styles.button}
          bgColor={earthGreen}
          textColor="white"
          btnLable="لاگ ان کریں"
          Press={() => navigation.navigate('Login')}
        />
        <Button
          style={[styles.button, styles.signupButton]}
          bgColor="white"
          textColor={earthGreen}
          btnLable="اکاؤنٹ بنائیں"
          Press={() => navigation.navigate('Signup')}
        />
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
    fontSize: width * 0.12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: width * 0.08,
    marginBottom: 40,
  },
  button: {
    width: '80%',
    marginVertical: 10,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  signupButton: {
    borderColor: earthGreen,
    borderWidth: 2,
  },
});

export default Home;
