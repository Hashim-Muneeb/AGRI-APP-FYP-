import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import firestore from '@react-native-firebase/firestore'; 

const PurchaseScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const {phoneNumber} = route.params;

  const [buyerName, setBuyerName] = useState('');
  const [address, setAddress] = useState('');
  const [hours, setHours] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const totalPrice = hours * parseFloat(item.price);

  const handlePaymentMethodSelection = method => {
    setSelectedPaymentMethod(method);
  };

  const handlePurchase = () => {
    if (!buyerName || !address || !hours) {
      
Alert.alert(
  'تفصیلات ناقص ہیں',
  'براہ کرم تمام تفصیلات بھریں۔'
  );
    } else if (selectedPaymentMethod === 'PayNow') {
      setIsPaymentModalVisible(true);
    } else {
      savePurchaseToFirestore();
    }
  };

  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);

  const handlePayNow = () => {
    setIsPaymentModalVisible(true);
  };

  const handleConfirmPayment = () => {
    setIsPaymentModalVisible(false);
    savePurchaseToFirestore();
  };

  const handleCancelPayment = () => {
    setIsPaymentModalVisible(false);
  };

  const savePurchaseToFirestore = async () => {
    try {
      // Update the quantity in Firestore
      const machineRef = firestore().collection('Machine').doc(item.id); // Assuming 'Machines' is your collection name
      await firestore().runTransaction(async (transaction) => {
        const machineDoc = await transaction.get(machineRef);
        if (!machineDoc.exists) {
          throw new Error('ڈیٹا بیس میں مشین موجود نہیں ہے۔');
        }
  
        const currentQuantity = machineDoc.data().quantity;
        if (currentQuantity < 1) {
          throw new Error('مشین ختم ہو چکی ہے۔');
        }
  
        transaction.update(machineRef, {
          quantity: currentQuantity - 1,
        });
  
        // Save purchase details in 'Booked' collection
        await firestore().collection('Booked').add({
          buyerName,
          address,
          hours,
          totalPrice,
          createdAt: firestore.Timestamp.now(),
          name: item.name,
          ownername: item.ownerName,
          contactNumber: item.contactNumber,
          FarmerNumber: phoneNumber,
        });
  
        Alert.alert(
          'بکنگ کامیاب',
          'آپ کی بکنگ کی تفصیلات محفوظ کر لی گئی ہیں۔',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('RentedItemsScreens', { phoneNumber }),
            },
          ]
        );
      });
    } catch (error) {
      console.error('Error saving purchase:', error);
      Alert.alert("'بکنگ ناکام ہو گئی، 'بکنگ کی تفصیلات محفوظ کرنے میں ناکام۔'");
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>کاشتکاری کے اوزار</Text>
      <View style={styles.formSection}>
        <Text style={styles.label}>نام:</Text>
        <TextInput
          style={styles.input}
          value={buyerName}
          onChangeText={setBuyerName}
          placeholder="اپنا نام درج کریں"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>ترسیل کا پتہ:</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="اپنا پتہ درج کریں"
          multiline
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>گھنٹوں کی تعداد :</Text>
        <TextInput
          style={styles.input}
          value={hours}
          onChangeText={setHours}
          placeholder="گھنٹوں کی تعداد درج کریں"
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <Text style={styles.totalPrice}>
          کل قیمت: {isNaN(totalPrice) ? '0' : totalPrice.toFixed(2)}
        </Text>

        <TouchableOpacity
          style={styles.purchaseButton}
          onPress={handlePurchase}>
          <Text style={styles.buttonText}>بکنگ کی تصدیق کریں</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isPaymentModalVisible}
          onRequestClose={handleCancelPayment}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>اپنی ادائیگی کی تصدیق کریں۔</Text>
            <Text style={styles.priceText}>Total: {totalPrice.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleConfirmPayment}>
              <Text style={styles.buttonText}>بکنگ کی تصدیق کریں</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={handleCancelPayment}>
              <Text style={styles.buttonText}>منسوخ کریں۔</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00bfff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 16,
    backgroundColor: '#4b830d',
  },
  formSection: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  totalPrice: {
    fontSize: 18,
    color: '#4b830d',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#4b830d',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
 
  },
  paymentMethodSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  paymentMethodButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e9f5db',
  },
  selectedPaymentMethod: {
    backgroundColor: '#4b830d',
  },
  paymentMethodText: {
    color: '#333',
  },
  purchaseButton: {
    backgroundColor: '#4b830d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceText: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4b830d',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },

  paymentMethodSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  paymentMethodButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e9f5db',
    width: '45%', 
  },
  selectedPaymentMethod: {
    backgroundColor: '#4b830d',
    borderWidth: 2,
    borderColor: '#fff', 
  },
  paymentMethodText: {
    color: '#333',
    textAlign: 'center', 
    fontWeight: 'bold',
  },
  purchaseButton: {
    backgroundColor: '#4b830d',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default PurchaseScreen;