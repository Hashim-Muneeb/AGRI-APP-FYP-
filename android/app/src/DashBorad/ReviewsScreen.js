import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const { width, height } = Dimensions.get('window');

const starFilledImage = require('../Images/star_filled.png');
const starCornerImage = require('../Images/star_corner.png');

const ReviewsScreen = ({ route }) => {
  const { machineName } = route.params;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewSnapshot = await firestore()
          .collection('Reviews')
          .where('name', '==', machineName)
          .get();

        const fetchedReviews = reviewSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [machineName]);

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
      <StarRating count={item.stars} />
      <Text style={styles.reviewComments}>{item.comments}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}> {machineName} کے لیے جائزے </Text>

      <FlatList
        data={reviews}
        keyExtractor={item => item.id}
        renderItem={renderReviewItem}
        contentContainerStyle={styles.reviewList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'deepskyblue',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.02,
  },
  header: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    paddingVertical: height * 0.02,
    backgroundColor: '#4b830d',
  },
  reviewItem: {
    backgroundColor: '#fff',
    padding: width * 0.04,
    marginVertical: height * 0.02,
    borderRadius: width * 0.03,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: height * 0.01,
  },
  starIcon: {
    width: width * 0.05,
    height: width * 0.05,
    marginHorizontal: width * 0.01,
  },
  reviewComments: {
    fontSize: width * 0.04,
    color: '#333',
  },
  reviewList: {
    paddingBottom: height * 0.02,
  },
});

export default ReviewsScreen;
