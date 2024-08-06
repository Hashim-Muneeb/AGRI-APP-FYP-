import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get('window');

const AddMachineScreen = ({ route }) => {
  const { userName, phoneNumber } = route.params;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState(phoneNumber); // Initialize with phoneNumber

  useEffect(() => {
    setContactNumber(phoneNumber); // Update contactNumber if phoneNumber changes
  }, [phoneNumber]);

  const handleChoosePhoto = () => {
    const options = {
      noData: true,
      mediaType: 'photo',
      selectionLimit: 1, // Only allow one image
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

  const handleAddMachine = async () => {
    try {
      // Validate required fields
      if (!name || !price || !quantity || !imageUri || !description || !contactNumber) {
        Alert.alert('خرابی', 'براہ کرم تمام فیلڈز کو پُر کریں۔');

        return;
      }

      await firestore().collection('Machine').add({
        name,
        price,
        quantity,
        imageUri,
        description,
        contactNumber,
        ownerName: userName,
      });

      Alert.alert('کامیابی', 'مشین کامیابی سے شامل ہوگئی۔');

      // Reset fields after adding machine
      setName('');
      setPrice('');
      setQuantity('');
      setImageUri(null);
      setDescription('');
      setContactNumber(phoneNumber); // Reset to initial phoneNumber
    } catch (error) {
      console.error('Error adding machine:', error);
      Alert.alert('خرابی', 'مشین شامل کرنے میں خرابی ہوئی۔ براہ کرم دوبارہ کوشش کریں۔');

    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>کاشکاری کے اوزار داخل کریں</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.contentBox}>
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          )}
          <TouchableOpacity style={styles.button} onPress={handleChoosePhoto}>
            <Text style={styles.buttonText}>تصاویر منتخب کریں</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholderTextColor="#8e8e8e"
            placeholder="مشین کا نام"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#8e8e8e"
            placeholder="فی گھنٹہ قیمت"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#8e8e8e"
            placeholder="مشین کی مقدار"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#8e8e8e"
            placeholder="مشین کی تفصیل"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#8e8e8e"
            placeholder="رابطہ نمبر"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="phone-pad"
          />
          <TouchableOpacity style={styles.button} onPress={handleAddMachine}>
            <Text style={styles.buttonText}>مشین شامل کریں</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bfff',
  },
  headerContainer: {
    backgroundColor: '#4b830d',
    paddingVertical: height * 0.02,
    alignItems: 'center',
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: width * 0.05,
  },
  contentBox: {
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
    marginBottom: height * 0.02,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  previewImage: {
    width: width * 0.4,
    height: height * 0.2,
    borderRadius: width * 0.02,
    margin: width * 0.02,
  },
});

export default AddMachineScreen;
