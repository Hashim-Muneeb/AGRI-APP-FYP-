import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BankLoanInfo = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>قرض اور انشورنس</Text>
      </View>
      <View style={styles.overlay}>
        <Text style={styles.title}>خوش آمدید، کسان!</Text>
        <Text style={styles.subtitle}>
          ذیل میں اپنے مالی اختیارات کو دریافت کریں
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('LoansScreen')}>
          <Text style={styles.buttonText}>قرضوں کو دریافت کریں۔</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#042704'}]}
          onPress={() => navigation.navigate('InsuranceScreen')}>
          <Text style={styles.buttonText}>
            انشورنس کے اختیارات دریافت کریں۔
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align items at the top
    alignItems: 'center',
    backgroundColor: 'deepskyblue', // Set background color here
    padding: 20,
  },
  header: {
    backgroundColor: '#4CAF50', // Green header background color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'stretch', // Expand header across the screen width
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  overlay: {
    backgroundColor: 'white', // Dark semi-transparent overlay
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
    
  },
  subtitle: {
    fontSize: 18,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
    paddingTop: 40,
  },
  button: {
    backgroundColor: '#042704', // Green button color
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BankLoanInfo;
