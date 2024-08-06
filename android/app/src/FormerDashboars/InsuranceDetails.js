import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Linking,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const InsuranceDetails = ({ route }) => {
  const { policy } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>انشورنس کی تفصیلات</Text>
      </View>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image source={policy.policyImage} style={styles.image} />
        </View>
        <Text style={styles.policyName}>{policy.policyName}</Text>
        <Text style={styles.policyDetails}>{policy.policyDetails}</Text>
        <Button
          title="اورجانیے"
          onPress={() => Linking.openURL(policy.policyLink)}
          color="#042704"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'deepskyblue',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: 'deepskyblue',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 16,
    backgroundColor: 'deepskyblue',
  },
  image: {
    width: width * 0.9,
    height: width * 0.6,
    borderRadius: 10,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'lightgreen',
  },
  policyName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#3498db',
  },
  policyDetails: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
});

export default InsuranceDetails;
