import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore'; 

const { width } = Dimensions.get('window');

const RealTimeMonitoringScreen = () => {
  const [sensors, setSensors] = useState([
    {
      id: '1',
      name: "درجہ حرارت سینسر",
      value: 'Loading...', 
      image: require('../Images/temp.jpg'),
    },
    {
      id: '2',
      name:  "نمی سینسر",
      value: 'Loading...', 
      image: require('../Images/humid.png'),
    },
  ]);

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Function to fetch initial data from SensorTable collection
    const fetchInitialData = async () => {
      try {
        const snapshot = await firestore()
          .collection('SensorTable')
          .orderBy('timestamp', 'desc')
          .limit(30)
          .get();
        
        const newData = [];
        snapshot.docs.forEach(doc => {
          const dataObj = doc.data();
          if (dataObj.timestamp) {
            const dateTime = new Date(dataObj.timestamp.toDate()).toLocaleString();
            newData.push({ ...dataObj, day: dateTime });
          }
        });
        setTableData(newData);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();

    const unsubscribeSensor = firestore()
      .collection('EspData')
      .doc('DHT11') 
      .onSnapshot(doc => {
        try {
          const data = doc.data();
          if (data) {
            setSensors(prevSensors => [
              {
                ...prevSensors[0],
                value: `${data.Temperature ?? 'N/A'}°C`,
              },
              {
                ...prevSensors[1],
                value: `${data.Humidity ?? 'N/A'}%`,
              },
            ]);

            // Update SensorTable collection when temperature or humidity changes
            firestore().collection('SensorTable').add({
              timestamp: firestore.FieldValue.serverTimestamp(),
              temperature: data.Temperature,
              humidity: data.Humidity,
            });
          }
        } catch (error) {
          console.error('Error fetching sensor data:', error);
        }
      });

    // Listener for real-time updates to SensorTable collection
    const unsubscribeTable = firestore()
      .collection('SensorTable')
      .orderBy('timestamp', 'desc')
      .limit(3000)
      .onSnapshot(snapshot => {
        const changes = snapshot.docChanges();
        changes.forEach(change => {
          if (change.type === 'added') {
            const newData = [...tableData];
            const dataObj = change.doc.data();
            if (dataObj.timestamp) {
              const dateTime = new Date(dataObj.timestamp.toDate()).toLocaleString();
              newData.unshift({ ...dataObj, day: dateTime });
              setTableData(newData.slice(0, 30));
            }
          }
        });
      });

    return () => {
      unsubscribeSensor();
      unsubscribeTable();
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>سینسر سے آنے والی اقدار</Text>
        </View>
        {sensors.map((item) => (
          <View key={item.id} style={styles.sensorItem}>
            <Text style={styles.sensorName}>{item.name}</Text>
            <View style={styles.sensorValueContainer}>
              <Text style={styles.sensorValue}>{item.value}</Text>
              <Image source={item.image} style={styles.sensorImage} resizeMode="contain" />
            </View>
          </View>
        ))}
        <View style={styles.tableContainer}>
          <Text style={styles.tableHeaderText2}>پچھلے 30 دنوں کی اقدار</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>دن</Text>
              <Text style={styles.tableHeaderCell}>درجہ حرارت (°C)</Text>
              <Text style={styles.tableHeaderCell}>نمی (%)</Text>
            </View>
            {tableData.map((rowData, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{rowData.day}</Text>
                <Text style={styles.tableCell}>{rowData.temperature}</Text>
                <Text style={styles.tableCell}>{rowData.humidity}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'deepskyblue',
    alignItems: 'center',
    paddingVertical: 20,
  },
  sensorItem: {
    backgroundColor: '#fff',
    width: width - 32,
    padding: 20,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    backgroundColor: '#4b830d',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
    width: width - 32,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  sensorName: {
    fontSize: 18,
    color: '#333',
  },
  sensorValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sensorValue: {
    fontSize: 18,
    color: '#4b830d',
    marginRight: 10,
  },
  sensorImage: {
    width: 80,
    height: 80,
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: width - 32,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  tableHeaderText2: {
    fontSize: 22,
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  table: {
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  tableCell: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RealTimeMonitoringScreen;
