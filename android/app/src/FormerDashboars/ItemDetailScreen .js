import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import LinearGradient from 'react-native-linear-gradient';

const starFilledImage = require('../Images/star_filled.png');
const starCornerImage = require('../Images/star_corner.png');

const { width, height } = Dimensions.get('window');

const ItemDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { phoneNumber } = route.params;

  const [reviews, setReviews] = useState([]);
  const [totalRating, setTotalRating] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewSnapshot = await firestore()
          .collection('Reviews')
          .where('name', '==', item.name)
          .get();

        const fetchedReviews = reviewSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReviews(fetchedReviews);

        const totalStars = fetchedReviews.reduce((sum, review) => sum + review.stars, 0);
        const averageRating = fetchedReviews.length ? totalStars / fetchedReviews.length : 0;
        setTotalRating(averageRating);

      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [item.id]);

  const handlePurchase = () => {
    navigation.navigate('PurchaseScreen', { item: item, phoneNumber });
  };

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

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewStars}>
        <StarRating count={item.stars} />
      </View>
      <Text style={styles.reviewComments}>تبصرے: {item.comments}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>کاشتکاری کے اوزار</Text>
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <View style={styles.detailSection}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.owner}>{item.ownerName}</Text>
        <Text style={styles.price}>{item.price}/- فی گھنٹہ</Text>
        <Text style={styles.quantity}>مقدار: {item.quantity}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.contact}>{item.contactNumber}</Text>
        <View style={styles.totalRatingContainer}>
          <StarRating count={Math.round(totalRating)} />
          <Text style={styles.totalRatingNumber}>({totalRating.toFixed(1)})</Text>
        </View>
        <TouchableOpacity
          style={styles.purchaseButton}
          onPress={handlePurchase}
          activeOpacity={0.7}>
          <LinearGradient
            colors={['#4b830d', '#9ccc65']}
            style={styles.gradient}>
            <Text style={styles.purchaseButtonText}>مشین کو کرائے پر لیں۔</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <Text style={styles.reviewHeader}>جائزے</Text>
      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={renderReviewItem}
        contentContainerStyle={styles.reviewList}
        scrollEnabled={false}
      />
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
    color: '#4b830d',
    textAlign: 'center',
    paddingVertical: 16,
    backgroundColor: '#adff2f',
  },
  image: {
    width: '100%',
    height: height * 0.3,
    borderRadius: 10,
    marginBottom: 10,
  },
  detailSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  owner: {
    fontSize: 18,
    color: '#333',
  },
  price: {
    fontSize: 20,
    color: '#4b830d',
    marginVertical: 5,
  },
  quantity: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  contact: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  totalRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  totalRatingNumber: {
    fontSize: 20,
    color: '#4b830d',
    marginLeft: 10,
  },
  purchaseButton: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
  },
  gradient: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  reviewHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4b830d',
    textAlign: 'center',
    marginVertical: 20,
  },
  reviewList: {
    paddingHorizontal: 20,
  },
  reviewItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  reviewStars: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 2, // Adjust spacing between stars if needed
  },
  reviewComments: {
    fontSize: 16,
    color: '#333',
  },
});

export default ItemDetailScreen;
