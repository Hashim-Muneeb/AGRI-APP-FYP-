import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const { width, height } = Dimensions.get('window');
const starFilledImage = require('../Images/star_filled.png');
const starCornerImage = require('../Images/star_corner.png');

const RentedItemsScreens = ({ route, navigation }) => {
  const { userName } = route.params;
  const [rentedItems, setRentedItems] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Machine')
      .where('ownerName', '==', userName)
      .onSnapshot(async querySnapshot => {
        const items = [];
        for (const documentSnapshot of querySnapshot.docs) {
          const data = documentSnapshot.data();
          const reviewSnapshot = await firestore()
            .collection('Reviews')
            .where('name', '==', data.name)
            .get();
          const reviews = reviewSnapshot.docs.map(doc => doc.data());
          const totalStars = reviews.reduce((sum, review) => sum + review.stars, 0);
          const averageRating = reviews.length ? totalStars / reviews.length : 0;

          items.push({
            id: documentSnapshot.id,
            ...data,
            averageRating,
          });
        }
        setRentedItems(items);
      });

    return () => unsubscribe();
  }, [userName]);

  const StarRating = ({ count }) => {
    const renderStars = () => {
      const stars = [];
      for (let i = 0; i < 5; i++) {
        stars.push(
          <Image
            key={i}
            source={i < count ? starFilledImage : starCornerImage}
            style={styles.starIcon}
          />
        );
      }
      return stars;
    };

    return <View style={styles.starsContainer}>{renderStars()}</View>;
  };

  const deleteMachine = async (itemId) => {
    try {
      await firestore().collection('Machine').doc(itemId).delete();
      // Optional: You may want to update the state or show a success message
    } catch (error) {
      console.error('Error deleting machine:', error);
      // Handle error here
    }
  };

  const handleDelete = (itemId, itemName) => {
    Alert.alert(
      'تصدیق',
      `کیا آپ واقعی '${itemName}' کو حذف کرنا چاہتے ہیں؟`,
      [
        {
          text: 'نہیں',
          style: 'cancel',
        },
        {
          text: 'ہاں',
          onPress: () => deleteMachine(itemId),
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  const navigateToUpdateScreen = (item) => {
    navigation.navigate('UpdateMachineScreen', { machineId: item.id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item}>
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <View style={styles.textContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.ownerName}>{item.ownerName}</Text>
        <Text style={styles.price}>{item.price}/- فی گھنٹہ</Text>
        <Text style={styles.quantity}>مقدار: {item.quantity}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.contact}>{item.contactNumber}</Text>
        <View style={styles.ratingContainer}>
          <StarRating count={Math.round(item.averageRating)} />
          <Text style={styles.ratingText}>({item.averageRating.toFixed(1)})</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ReviewsScreen', { machineName: item.name })}
        >
          <Text style={styles.buttonText}>جائزہ پڑھیں</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#cf0000' }]}
          onPress={() => handleDelete(item.id, item.name)}
        >
          <Text style={styles.buttonText}>مشین حذف کریں</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ff9800' }]}
          onPress={() => navigateToUpdateScreen(item)}
        >
          <Text style={styles.buttonText}>مشین اپ ڈیٹ کریں</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>کاشتکاری کے اوزار</Text>
      <FlatList
        data={rentedItems}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContent}
      />
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
  item: {
    backgroundColor: 'white',
    padding: width * 0.04,
    flexDirection: 'row',
    borderRadius: width * 0.05,
    marginBottom: height * 0.02,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  image: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.05,
  },
  textContent: {
    flex: 1,
    marginLeft: width * 0.04,
  },
  name: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: height * 0.01,
  },
  ownerName: {
    fontSize: width * 0.04,
    color: '#555',
    marginBottom: height * 0.01,
  },
  price: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#4b830d',
    marginBottom: height * 0.01,
  },
  quantity: {
    fontSize: width * 0.035,
    color: '#555',
    marginBottom: height * 0.01,
  },
  description: {
    fontSize: width * 0.035,
    color: '#555',
    marginBottom: height * 0.01,
    fontStyle: 'italic',
  },
  contact: {
    fontSize: width * 0.035,
    color: '#555',
    marginBottom: height * 0.01,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  ratingText: {
    fontSize: width * 0.035,
    color: '#333',
    marginLeft: width * 0.02,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    width: width * 0.04,
    height: width * 0.04,
    marginHorizontal: width * 0.01,
  },
  flatListContent: {
    paddingBottom: height * 0.05,
  },
  button: {
    backgroundColor: '#042704',
    padding: width * 0.04,
    borderRadius: width * 0.05,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});

export default RentedItemsScreens;
