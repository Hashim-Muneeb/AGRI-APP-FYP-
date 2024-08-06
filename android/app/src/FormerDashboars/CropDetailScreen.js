import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

// Get the full width of the device
const {width} = Dimensions.get('window');

const CropDetailScreen = ({route}) => {
  const {crop} = route.params;
  return (
    <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>"{crop.name} کی معلومات"</Text>
        </View>
      <Image source={crop.image} style={styles.image} resizeMode="cover" />
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{crop.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'deepskyblue',
  },
  image: {
    width: width,
    height: width * 0.75,
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
  descriptionContainer: {
    backgroundColor: '#baf57a',
    padding: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  description: {
    fontSize: 18,
    color: '#333',
    lineHeight: 24,
    fontFamily: 'Avenir',
    textAlign: 'justify',
  },
});

export default CropDetailScreen;