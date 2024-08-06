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

const LoanDetails = ({ route }) => {
  const { loan } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>قرض کی تفصیلات</Text>
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image source={loan.loanImage} style={styles.image} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.loanName}>{loan.loanName}</Text>
          <Text style={styles.details}>{loan.loanDetails}</Text>
          <Button
          
            title="اورجانیے"
            onPress={() => Linking.openURL(loan.loanLink)}
            color="#042704"
            style={styles.btn}
          />
        </View>
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
  loanName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#3498db',

  },
  details: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#555',
  },
  btn : {

    fontsize: 24,

  },
});

export default LoanDetails;
