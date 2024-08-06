import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const OldSensorValuesScreen = () => {
  const [oldValues, setOldValues] = useState([]);

  useEffect(() => {
    // Fetch old sensor values from Firestore
    const unsubscribe = firestore()
      .collection('NPKoldvalues')
      .orderBy('timestamp', 'desc') // Order by timestamp
      .onSnapshot((querySnapshot) => {
        const values = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOldValues(values);
      });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> سینسر کی قدیم اقدار</Text>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.tableHeaderText]}>تاریخ</Text>
          <Text style={[styles.headerText, styles.tableHeaderText]}>نائٹروجن</Text>
          <Text style={[styles.headerText, styles.tableHeaderText]}>فاسفورس</Text>
          <Text style={[styles.headerText, styles.tableHeaderText]}>پوٹاشیم</Text>
        </View>
        {oldValues.map((value) => (
          <View key={value.id} style={styles.row}>
            <Text style={styles.cell}>{new Date(value.timestamp.toDate()).toLocaleDateString()}</Text>
            <Text style={styles.cell}>{value.Nitrogen}</Text>
            <Text style={styles.cell}>{value.Phosphorus}</Text>
            <Text style={styles.cell}>{value.Potassium}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'deepskyblue',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#4b830d', // Green background for header
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: width < 400 ? 20 : 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff', // White color for header text
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 10,
  },
  tableHeaderText: {
    fontSize: width < 400 ? 16 : 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333', // Dark color for table headers
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    marginBottom: 10,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: width < 400 ? 14 : 16,
    color: '#333', // Dark color for table cell text
  },
});

export default OldSensorValuesScreen;

