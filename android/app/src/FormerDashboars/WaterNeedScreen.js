import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore'; 

const WaterNeedScreen = () => {
  const [sensors, setSensors] = useState([
    {
      id: '1',
      name: 'مٹی کی نمی سینسر',
      value: 'Loading...',
      image: require('../Images/water.png'),
    },
  ]);

  const [crops, setCrops] = useState([
    { id: '1', name: 'لسن', dailyWaterNeed: '2.19-4.38', overallWaterNeed: '800-1600' },
    { id: '2', name: 'کیلا', dailyWaterNeed: '3.29-6.03', overallWaterNeed: '1200-2200' },
    { id: '3', name: 'جو', dailyWaterNeed: '3.33-4.81', overallWaterNeed: '450-650' },
    { id: '4', name: 'لوبیا', dailyWaterNeed: '3.53-5.88', overallWaterNeed: '300-500' },
    { id: '5', name: 'بند گوبھی', dailyWaterNeed: '2.69-3.85', overallWaterNeed: '350-500' },
    { id: '6', name: 'کینو', dailyWaterNeed: '2.98-3.97', overallWaterNeed: '900-1200' },
    { id: '7', name: 'کپاس', dailyWaterNeed: '3.72-6.91', overallWaterNeed: '700-1300' },
    { id: '8', name: 'مکئی', dailyWaterNeed: '3.27-5.23', overallWaterNeed: '500-800' },
    { id: '9', name: 'خربوزہ', dailyWaterNeed: '2.86-4.29', overallWaterNeed: '400-600' },
    { id: '10', name: 'پیاز', dailyWaterNeed: '4.22-6.63', overallWaterNeed: '350-550' },
    { id: '11', name: 'مونگ پھلی', dailyWaterNeed: '3.70-5.19', overallWaterNeed: '500-700' },
    { id: '12', name: 'مٹر', dailyWaterNeed: '3.68-5.26', overallWaterNeed: '350-500' },
    { id: '13', name: 'شملہ مرچ', dailyWaterNeed: '3.64-5.45', overallWaterNeed: '600-900' },
    { id: '14', name: 'آلو', dailyWaterNeed: '4-5.6', overallWaterNeed: '500-700' },
    { id: '15', name: 'چاول', dailyWaterNeed: '3.75-5.83', overallWaterNeed: '450-700' },
    { id: '16', name: 'جوار', dailyWaterNeed: '3.6-5.2', overallWaterNeed: '450-650' },
    { id: '17', name: 'سویا', dailyWaterNeed: '3.17-4.93', overallWaterNeed: '450-700' },
    { id: '18', name: 'چقندر', dailyWaterNeed: '2.82-3.85', overallWaterNeed: '550-750' },
    { id: '19', name: 'گنا', dailyWaterNeed: '4.73-7.89', overallWaterNeed: '1500-2500' },
    { id: '20', name: 'سورج مکھی', dailyWaterNeed: '4.72-7.87', overallWaterNeed: '600-1000' },
    { id: '21', name: 'ٹماٹر', dailyWaterNeed: '2.55-5.1', overallWaterNeed: '400-800' },
  ]);
  

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('EspData')
      .doc('DHT11') 
      .onSnapshot(doc => {
        try {
          const data = doc.data();
          if (data) {
            setSensors([
              {
                ...sensors[0],
                value: `${data.SoilMoisture ?? 'N/A'}`,
              },
            ]);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      });

    return () => unsubscribe();
  }, []);

  const renderSensorItem = ({item}) => (
    <View style={styles.sensorItem}>
      <Text style={styles.sensorName}>{item.name}</Text>
      <View style={styles.sensorValueContainer}>
        <Text style={styles.sensorValue}>{item.value}</Text>
        <Image source={item.image} style={styles.sensorImage} />
      </View>
    </View>
  );

  const renderCropItem = ({item}) => (
    <View style={styles.cropItem}>
      <Text style={styles.cropName}>{item.name}</Text>
      <Text style={styles.cropData}>{item.dailyWaterNeed}</Text>
      <Text style={styles.cropData}>{item.overallWaterNeed}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>نمی سینسر سے آنے والی اقدار</Text>
      </View>

      <FlatList
        data={sensors}
        keyExtractor={item => item.id}
        renderItem={renderSensorItem}
      />
      <Text style={styles.tableHeaderText2}>پانی کی ضرورت(mm)</Text>
      <Text style={styles.tableHeaderText}> " مجموعی "               " روزانہ"                  " فصل " </Text>

      <FlatList
        data={crops}
        keyExtractor={item => item.id}
        renderItem={renderCropItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'deepskyblue',
  },
  sensorItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    paddingBottom: 30,
   
  },
  cropItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 5,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    backgroundColor: '#4b830d',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
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
    paddingBottom: 20,
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
  cropName: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  cropData: {
    fontSize: 16,
    color: '#4b830d',
  },
  tableHeaderText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 5,
  },
  tableHeaderText2: {
    fontSize: 22,
    textAlign: 'center',
    padding: 20,
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 5,
  },
});

export default WaterNeedScreen;