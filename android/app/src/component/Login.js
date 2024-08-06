import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {darkgreen} from './Constants';

const {width} = Dimensions.get('window');

const Login = ({navigation}) => {
  const StyledButton = ({title, onPress}) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
  return (
    <LinearGradient colors={['#a8e063', '#56ab2f']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>لاگ ان کریں</Text>
        <View style={styles.formContainer}>
          <Text style={styles.welcomeText}>خوش آمدید</Text>
          <StyledButton
            title="کسان کے طور پر لاگ ان کریں۔"
            onPress={() => navigation.navigate('LoFormer')}
          />
          <StyledButton
            title="مالک مشین کے طور پر لاگ ان کریں۔"
            onPress={() => navigation.navigate('LoRenter')}
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: width * 0.9, // Responsive width
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
    width: width * 0.8, // 80% of screen width
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
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

export default Login;
