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
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get('window');

const images = {
  rented: require('../Images/newtools.jpeg'),
  realtimeMonitoring: require('../Images/real.jpeg'),
  WaterNeed: require('../Images/water.jpeg'),
  crops: require('../Images/cropss.jpg'),
  fertilizer: require('../Images/ferti.jpg'),
  resources: require('../Images/loan.jpg'),
  farmer: require('../Images/pro.png'), 
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
  };
  return translations[description.toLowerCase()] || description;
};

const FormerDash = ({navigation, route}) => {
  const { userName, name, phoneNumber } = route.params;
  const [weather, setWeather] = useState({
    date: '',
    temperature: '',
    description: '',
    icon: 'sun',
  });

  const getLocationAndWeather = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      (error) => {
        console.log(error.code, error.message);
        Alert.alert("Error", "Unable to fetch location.");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  useEffect(() => {
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
          title: "Location Access Required",
          message: "This app needs to access your location for weather updates",
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location Permission Granted");
        getLocationAndWeather();
      } else {
        console.log("Location Permission Denied");
        Alert.alert(
          "Location Permission",
          "Permission to access location was denied",
          [{ text: "OK" }]
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const fetchWeather = async (latitude, longitude) => {
    const apiKey = '15e6bd73ab07f8f363182ed7797059a6';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      const {data} = response;
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('FarmerProfile', {phoneNumber, userName})}>
          <Image source={images.farmer} style={styles.profileImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationButton} onPress={() => navigation.navigate('BookingScreen', {phoneNumber})}>
          <Text style={styles.notificationText}>بکنگ</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>خوش آمدید, {userName} {name}!</Text>
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
            title="ریئل ٹائم مانیٹرنگ"
            onPress={() => navigation.navigate('RealTimeMonitoringScreen')}
          />
          <ServiceButton
            imageKey="WaterNeed"
            title="پانی کا نظام"
            onPress={() => navigation.navigate('WaterNeedScreen')}
          />
          <ServiceButton
            imageKey="rented"
            title="کرائے کے اوزار"
            onPress={() => navigation.navigate('RentedItemsScreens', {phoneNumber})}
          />
          <ServiceButton
            imageKey="crops"
            title="فصلوں کی معلومات"
            onPress={() => navigation.navigate('CropsInfoScreen')}
          />
          <ServiceButton
            imageKey="fertilizer"
            title="کھاد کی ضرورت"
            onPress={() => navigation.navigate('FertilizerScreen')}
          />
          <ServiceButton
            imageKey="resources"
            title="قرض اور انشورنس"
            onPress={() => navigation.navigate('BankLoanInfo')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const ServiceButton = ({imageKey, title, onPress}) => (
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
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    right: 30,
  },
  profileButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 1,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  signOutButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  signOutText: {
    color: 'black',
    fontWeight: '900',
  },
  notificationButton: {
    position: 'absolute',
    top: 12,
    right: 90,
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 20,
    zIndex: 1,
  },
  notificationText: {
    color: 'black',
    fontWeight: '900',
  },
  weatherContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
    elevation: 5,
    backgroundColor: '#4b830d',
    width: width * 0.9,
    alignSelf: 'center',
  },
  dateText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  temperatureText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
    padding: 5,
  },
  serviceGrid: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  serviceButton: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    width: width * 0.4,
    minHeight: 120,
  },
  serviceImage: {
    width: 80,
    height: 80,
    marginBottom: 8,
    borderRadius: 10,
  },
  serviceTitle: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default FormerDash;
