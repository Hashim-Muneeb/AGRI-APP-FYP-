import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const FertilizerScreen = () => {
  const [npkValues, setNpkValues] = useState({
    nitrogen: 'Loading...',
    phosphorus: 'Loading...',
    potassium: 'Loading...',
  });

  const navigation = useNavigation();

  const fertilizers = [
    { id: '1', name: 'نائٹروجن', valueRange: '0-20', fertilizer: 'امونیم نائٹریٹ', amountPerMeter: '1.2 کلو گرام' },
    { id: '2', name: 'نائٹروجن', valueRange: '21-40', fertilizer: 'یوریا', amountPerMeter: '1.4 کلو گرام' },
    { id: '3', name: 'نائٹروجن', valueRange: '41-60', fertilizer: 'کیلشیم نائٹریٹ', amountPerMeter: '1.8 کلو گرام' },
    { id: '4', name: 'فاسفورس', valueRange: '0-10', fertilizer: 'سنگل سپر فاسفیٹ', amountPerMeter: '0.8 کلو گرام' },
    { id: '5', name: 'فاسفورس', valueRange: '11-20', fertilizer: 'ٹریپل سپر فاسفیٹ', amountPerMeter: '1.2 کلو گرام' },
    { id: '6', name: 'فاسفورس', valueRange: '21-30', fertilizer: 'مونوامونیم فاسفیٹ', amountPerMeter: '1.9 کلو گرام' },
    { id: '7', name: 'پوٹاشیم', valueRange: '0-15', fertilizer: 'پوٹاشیم کلورائیڈ', amountPerMeter: '0.6 کلو گرام' },
    { id: '8', name: 'پوٹاشیم', valueRange: '16-30', fertilizer: 'پوٹاشیم سلفیٹ', amountPerMeter: '1 کلو گرام' },
    { id: '9', name: 'پوٹاشیم', valueRange: '31-45', fertilizer: 'پوٹاشیم نائٹریٹ', amountPerMeter: '1.4 کلو گرام' },
  ];

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('EspData')
      .doc('DHT11')
      .onSnapshot((doc) => {
        try {
          const data = doc.data();
          if (data) {
            setNpkValues({
              nitrogen: `${data.Nitrogen ?? 'Loading...'}`,
              phosphorus: `${data.Phosphorus ?? 'Loading...'}`,
              potassium: `${data.Potassium ?? 'Loading...'}`,
            });
          } else {
            console.log('Document not found.');
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      });

    return () => unsubscribe();
  }, []);

  const handleNitrogenPress = () => {
    navigation.navigate('OldSensorValuesScreen', { sensorType: 'Nitrogen' });
  };

  const handlePhosphorusPress = () => {
    navigation.navigate('OldSensorValuesScreen', { sensorType: 'Phosphorus' });
  };

  const handlePotassiumPress = () => {
    navigation.navigate('OldSensorValuesScreen', { sensorType: 'Potassium' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>  سینسر سے آنے والی اقدار </Text>
      </View>
      <View style={styles.sensorContainer}>
        <TouchableOpacity style={styles.sensorBox} onPress={handleNitrogenPress}>
          <Text style={styles.sensorLabel}>نائٹروجن</Text>
          <Text style={styles.sensorValue}>{npkValues.nitrogen}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sensorBox} onPress={handlePhosphorusPress}>
          <Text style={styles.sensorLabel}>فاسفورس</Text>
          <Text style={styles.sensorValue}>{npkValues.phosphorus}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sensorBox} onPress={handlePotassiumPress}>
          <Text style={styles.sensorLabel}>پوٹاشیم</Text>
          <Text style={styles.sensorValue}>{npkValues.potassium}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tableHeaderContainer}>
        <Text style={styles.tableHeaderText}>کھاد کی سفارشات</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>نام</Text>
          <Text style={styles.headerText}>مقدار کی حدود</Text>
          <Text style={styles.headerText}>کھاد</Text>
          <Text style={styles.headerText}> فی مرلہ</Text>
        </View>
      </View>

      <FlatList
        data={fertilizers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.fertilizerItem}>
            <Text style={styles.fertilizerText}>{item.name}</Text>
            <Text style={styles.fertilizerText}>{item.valueRange}</Text>
            <Text style={styles.fertilizerText}>{item.fertilizer}</Text>
            <Text style={styles.fertilizerText}>{item.amountPerMeter}</Text>
          </View>
        )}
        contentContainerStyle={styles.fertilizerList}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'deepskyblue',
    padding: 16,
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
  sensorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  sensorBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.25, // Adjusted to use percentage width
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sensorLabel: {
    fontSize: width < 400 ? 14 : 18, // Responsive font size
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sensorValue: {
    fontSize: width < 400 ? 20 : 24, // Responsive font size
    color: '#4b830d',
    fontWeight: 'bold',
  },
  tableHeaderContainer: {
    backgroundColor: '#4b830d',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  tableHeaderText: {
    fontSize: width < 400 ? 18 : 24, // Responsive font size
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingBottom: 10,
  },
  fertilizerList: {
    flexGrow: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  fertilizerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  fertilizerText: {
    fontSize: width < 400 ? 14 : 16, // Responsive font size
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
});

export default FertilizerScreen;
