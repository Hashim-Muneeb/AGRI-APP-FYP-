import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get('window');

const images = {
  rented: require('../Images/newtools.jpeg'),
  realtimeMonitoring: require('../Images/rent.jpeg'),
  WaterNeed: require('../Images/water.jpeg'),
  crops: require('../Images/cropss.jpg'),
  renter: require('../Images/renter.png'),
};

const weatherIcons = {
  cloudy: require('../Images/cloudy.png'),
  raining: require('../Images/raining.png'),
  snow: require('../Images/snow.png'),
  storm: require('../Images/storm.png'),
  sun: require('../Images/sun.png'),
};

const getWeatherIconKey = main => {
  switch (main.toLowerCase()) {
    case 'clouds':
      return 'cloudy';
    case 'rain':
      return 'raining';
    case 'snow':
      return 'snow';
    case 'thunderstorm':
      return 'storm';
    case 'clear':
    default:
      return 'sun';
  }
};

const translateToUrdu = description => {
  const translations = {
    'clear sky': 'صاف آسمان',
    'few clouds': 'چند بادل',
    'scattered clouds': 'بکھرے ہوئے بادل',
    'broken clouds': 'ٹوٹے ہوئے بادل',
    'shower rain': 'شاور بارش',
    rain: 'بارش',
    thunderstorm: 'آندھی',
    snow: 'برف',
    mist: 'دھند',
    'overcast clouds': 'ابر آلود بادل',
    // Add more translations as needed
  };
  return translations[description.toLowerCase()] || description;
};

const OwnerDashboard = ({ navigation, route }) => {
  const { userName } = route.params;
  const { phoneNumber } = route.params;

  const [weather, setWeather] = useState({
    date: '',
    temperature: '',
    description: '',
    icon: 'sun', // Default icon key
  });

  useEffect(() => {
    getFarmerName();
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getLocationAndWeather();
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This app needs to access your location for weather updates',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location Permission Granted');
        getLocationAndWeather();
      } else {
        console.log('Location Permission Denied');
        Alert.alert('Location Permission', 'Permission to access location was denied', [{ text: 'OK' }]);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getLocationAndWeather = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      error => {
        console.log(error.code, error.message);
        Alert.alert('Error', 'Unable to fetch location.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const fetchWeather = async (latitude, longitude) => {
    const apiKey = '15e6bd73ab07f8f363182ed7797059a6';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      const { data } = response;
      const newWeather = {
        date: new Date().toLocaleDateString('ur-PK'),
        temperature: `${Math.round(data.main.temp)}° C`,
        description: translateToUrdu(data.weather[0].description),
        icon: getWeatherIconKey(data.weather[0].main),
      };
      setWeather(newWeather);
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = () => {
    navigation.navigate('Login');
  };

  const getFarmerName = async () => {
    try {
      const snapshot = await database().ref('Renter').once('value');

      // Extracting name from snapshot
      const data = snapshot.val();
      const farmerName = data ? data.name : null;
      console.log('Farmer name:', farmerName);
    } catch (error) {
      console.error('Error fetching farmer name:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('RenterProfile', { phoneNumber, userName })}>
          <Image source={images.renter} style={styles.profileImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate('OrderScreen', { phoneNumber })}>
          <Text style={styles.notificationText}>آرڈرز</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          <Text style={styles.farmerName}>خوش آمدید, {userName}!</Text>
        </Text>
        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <Text style={styles.signOutText}>باہر جائیں</Text>
        </TouchableOpacity>
      </View>

      <LinearGradient colors={['#4b830d', '#96c93d']} style={styles.weatherContainer}>
        <Text style={styles.dateText}>{weather.date}</Text>
        <Text style={styles.temperatureText}>{weather.temperature}</Text>
        <Image source={weatherIcons[weather.icon]} style={styles.weatherIcon} />
        <Text style={styles.descriptionText}>{weather.description}</Text>
      </LinearGradient>

      <View style={styles.serviceGrid}>
        <View style={styles.gridRow}>
          <ServiceButton
            imageKey="realtimeMonitoring"
            title="کرائے کے اوزار"
            onPress={() => navigation.navigate('RentedItemsScreen', { userName })}
          />
          <ServiceButton
            imageKey="rented"
            title="نئی آلات داخل کریں۔"
            onPress={() => navigation.navigate('AddMachineScreen', { userName, phoneNumber })}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const ServiceButton = ({ imageKey, title, onPress }) => (
  <TouchableOpacity style={styles.serviceButton} onPress={onPress}>
    <Image source={images[imageKey]} style={styles.serviceImage} />
    <Text style={styles.serviceTitle}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'deepskyblue',
  },
  header: {
    backgroundColor: '#4b830d',
    paddingVertical: height * 0.02,
    alignItems: 'center',
    marginBottom: height * 0.01,
  },
  headerText: {
    fontSize: width * 0.05,
    color: '#fff',
    fontWeight: 'bold',
    right: width * 0.09,
  },
  farmerName: {
    fontSize: width * 0.05,
  },
  profileButton: {
    position: 'absolute',
    top: height * 0.01,
    left: width * 0.03,
    zIndex: 1,
  },
  profileImage: {
    width: width * 0.08,
    height: width * 0.08,
    borderRadius: width * 0.04,
  },
  signOutButton: {
    position: 'absolute',
    top: height * 0.01,
    right: width * 0.03,
    backgroundColor: '#FFD700',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderRadius: width * 0.03,
    zIndex: 1,
  },
  signOutText: {
    color: 'black',
    fontWeight: '900',
    fontSize: width * 0.04,
  },
  notificationText:{
    color: 'black',
    fontWeight: '900',
    fontSize: width * 0.04,
  },
  notificationButton: {
    position: 'absolute',
    top: height * 0.01,
    right: width * 0.25,
    backgroundColor: '#FFD700',
    paddingVertical: height * 0.01,
    paddingHorizontal: width * 0.03,
    borderRadius: width * 0.03,
    zIndex: 1,
  
  },
  weatherContainer: {
    padding: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.05,
    marginVertical: height * 0.01,
    elevation: 5,
    backgroundColor: '#4b830d',
    width: width * 0.9,
    alignSelf: 'center',
  },
  dateText: {
    fontSize: width * 0.04,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: height * 0.01,
  },
  temperatureText: {
    fontSize: width * 0.12,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: width * 0.02,
  },
  weatherIcon: {
    width: width * 0.1,
    height: width * 0.1,
    marginTop: height * 0.01,
  },
  descriptionText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: height * 0.005,
    padding: width * 0.02,
  },
  serviceGrid: {
    flex: 1,
    padding: width * 0.025,
    alignItems: 'center',
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  serviceButton: {
    backgroundColor: '#ffff',
    borderRadius: width * 0.025,
    padding: width * 0.025,
    alignItems: 'center',
    justifyContent: 'center',
    margin: width * 0.01,
    width: width * 0.4,
    minHeight: height * 0.15,
  },
  serviceImage: {
    width: width * 0.2,
    height: width * 0.2,
    marginBottom: width * 0.02,
    borderRadius: width * 0.025,
  },
  serviceTitle: {
    fontSize: width * 0.035,
    color: '#333',
    textAlign: 'center',
  },
});

export default OwnerDashboard;
