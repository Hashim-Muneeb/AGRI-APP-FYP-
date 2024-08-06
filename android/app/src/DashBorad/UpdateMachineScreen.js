import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get('window');
const starFilledImage = require('../Images/star_filled.png');
const starCornerImage = require('../Images/star_corner.png');

const UpdateMachineScreen = ({ route, navigation }) => {
  const { machineId } = route.params;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  useEffect(() => {
    const fetchMachineDetails = async () => {
      try {
        const machineRef = firestore().collection('Machine').doc(machineId);
        const machineDoc = await machineRef.get();

        if (!machineDoc.exists) {
            Alert.alert('خطا', 'مشین نہیں ملی۔');

          navigation.goBack();
          return;
        }

        const machineData = machineDoc.data();
        setName(machineData.name);
        setPrice(String(machineData.price)); // Ensure to convert number to string
        setQuantity(String(machineData.quantity)); // Ensure to convert number to string
        setImageUri(machineData.imageUri);
        setDescription(machineData.description);
        setContactNumber(machineData.contactNumber);
      } catch (error) {
        console.error('Error fetching machine details:', error);
        Alert.alert('خطا', 'مشین کی تفصیلات حاصل کرنے میں ناکام رہے۔');

      }
    };

    fetchMachineDetails();
  }, [machineId]);

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
      mediaType: 'photo',
      selectionLimit: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleUpdateMachine = async () => {
    try {
      // Validate required fields
      if (!name || !price || !quantity || !description || !contactNumber) {
        Alert.alert('خطا', 'براہ کرم تمام خانے بھریں۔');

        return;
      }

      await firestore().collection('Machine').doc(machineId).update({
        name,
        price: Number(price), // Ensure to convert string to number if necessary
        quantity: Number(quantity), // Ensure to convert string to number if necessary
        imageUri,
        description,
        contactNumber,
      });

      Alert.alert('کامیابی', 'مشین کامیابی سے اپ ڈیٹ ہوگئی۔');

      navigation.goBack(); // Navigate back to the previous screen after update
    } catch (error) {
      console.error('Error updating machine:', error);
      Alert.alert('خطا', 'مشین کو اپ ڈیٹ کرتے وقت خرابی آئی۔ برائے مہربانی دوبارہ کوشش کریں۔');

    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>مشین اپ ڈیٹ کریں</Text>
      <View style={styles.content}>
        <TouchableOpacity style={styles.imageContainer} onPress={handleChoosePhoto}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <Text style={styles.selectImageText}>تصویر منتخب کریں</Text>
          )}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="مشین کا نام"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="فی گھنٹہ قیمت"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="مشین کی مقدار"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="مشین کی تفصیل"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="رابطہ نمبر"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.button} onPress={handleUpdateMachine}>
          <Text style={styles.buttonText}>مشین اپ ڈیٹ کریں</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bfff',
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.02,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: height * 0.02,
    backgroundColor: '#4b830d',
    paddingVertical: height * 0.02,
    borderRadius: width * 0.05,
  },
  content: {
    backgroundColor: 'white',
    padding: width * 0.05,
    borderRadius: width * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    alignItems: 'center',
  },
  imageContainer: {
    width: width * 0.4,
    height: height * 0.2,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.05,
    marginBottom: height * 0.02,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.05,
  },
  selectImageText: {
    fontSize: width * 0.04,
    color: '#333',
  },
  input: {
    height: height * 0.07,
    borderColor: '#4b830d',
    borderWidth: 1,
    marginBottom: height * 0.02,
    paddingHorizontal: width * 0.05,
    borderRadius: width * 0.05,
    fontSize: width * 0.045,
    backgroundColor: '#fafafa',
    width: '100%',
  },
  button: {
    backgroundColor: '#33691e',
    padding: height * 0.02,
    borderRadius: width * 0.05,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
});

export default UpdateMachineScreen;
