import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const InsuranceScreen = ({ navigation }) => {
  const insurances = [
    {
      insuranceProvider: 'زرعی ترقیاتی بینک لمیٹڈ (ZTBL)',
      policies: [
        {
          policyId: 'insa1',
          policyName: 'فصل بیمہ اسکیم',
          policyDetails:
            'ZTBL نے حکومت/اسٹیٹ بینک آف پاکستان کی ہدایات کے مطابق فصل قرضہ انشورنس سکیم (CLIS) کا آغاز کیا ہے۔ اس سکیم کی بنیادی خصوصیات درج ذیل ہیں:\n\nشرائط و ضوابط:\n\nپریمیم: ربیع اور خریف فصلوں کے لیے علیحدہ علیحدہ قرضوں کے لیے پریمیم 1.3% (تمام ٹیکسوں اور لیویوں سمیت) وصول کیا جائے گا۔ بینک چھوٹے کسانوں کے لیے پریمیم ادا کرے گا اور نصف سالانہ بنیاد پر حکومت سے ری ایمبرسمنٹ حاصل کرے گا۔\nزیادہ سے زیادہ قرض کی حد: انفرادی کیس میں 500,000 روپے۔\nمجموعی بیمہ: ہر سیزن کی منظور شدہ فصلوں (ربیع اور خریف) کے پیداواری قرض کے لیے جس کے لیے پریمیم ادا کیا گیا ہو۔\nشامل فصلیں: گندم، کپاس، گنا، چاول اور مکئی۔\nشامل خطرات: زیادہ بارش، سیلاب، خشک سالی، اولوں کا طوفان، کہر، ٹڈی دل کا حملہ، اور کیڑوں کا حملہ۔\nانشورنس کی مدت: بوائی/پودا لگانے کی تاریخ سے لے کر بیمہ شدہ فصل کی کٹائی مکمل ہونے تک۔\nمعاوضہ: حکومت کی جانب سے آفت زدہ علاقوں میں شامل بیمہ شدہ کھڑی فصل کے نقصان کی صورت میں مکمل معاوضہ ادا کیا جائے گا۔',
          policyLink:
            'https://ztbl.com.pk/agri-loan/crop-insurance-scheme/#:~:text=ZTBL%20has%20launched%20the%20Crop,this%20scheme%20are%20listed%20hereunder.&text=Premium%20will%20be%20charged%20%40%201.3,Rabi%20and%20Kharif%20crops%20separately.',
          policyImage: require('../Images/zz.jpg'),
        },
      ],
    },
    {
      insuranceProvider: 'اور دیگر شعبوں کے لیے سکیمیں SMEs ',
      policies: [
        {
          policyId: 'insb1',
          policyName: 'فصل قرضہ انشورنس اسکیم',
          policyDetails:
            'یہ اسکیم زراعتی برادری کو قدرتی آفات کے باعث ہونے والے نقصانات سے بچانے کے لیے بنائی گئی ہے۔\n\nیہ پانچ بڑی فصلوں یعنی گندم، کپاس، چاول، گنا اور مکئی کے تمام زرعی پیداوار کے قرضوں کے لیے قابل اطلاق اور لازمی ہے۔\n\nوفاقی حکومت مستحق قرض دہندگان کے لیے فی فصل فی موسم کے پریمیم کی قیمت برداشت کرتی ہے۔\n\nوہ قرض دہندگان جن کی زمین کی ملکیت 25 ایکڑ تک (بلوچستان کی صورت میں 32 ایکڑ تک) ہو، اس اسکیم کے تحت مستحق ہیں۔\n\nانشورنس قدرتی آفات جیسے زیادہ بارش، اولوں کا طوفان، کہر، سمندری طوفان، سیلاب، خشک سالی، اور فصل کی بیماریاں، کیڑوں کا حملہ وغیرہ کو شامل کرتی ہے۔',
          policyLink: 'https://www.sbp.org.pk/Incen-others/Agri-1.asp',
          policyImage: require('../Images/zzz.jpg'),
        },
      ],
    },
    {
      insuranceProvider: 'انڈیکس انشورنس فورم',
      policies: [
        {
          policyId: 'insc1',
          policyName: 'زرعی انشورنس پروگرام - اسمارٹ پنجاب پاکستان',
          policyDetails:
            'جی آئی آئی ایف پاکستان میں عالمی بینک گروپ کے سمارٹ پنجاب (زرعی اور دیہی تبدیلی کے لیے مارکیٹس کو مضبوط بنانے کے لیے) پروگرام کا حصہ ہے، جو پنجاب صوبے میں فصل اور مویشیوں کے کسانوں کی پیداواریت بڑھانے، ان کی موسمی حالات کی مزاحمت میں بہتری لانے اور زرعی کاروبار کی ترقی کو فروغ دینے کے لیے بنایا گیا ہے۔\n\nسمارٹ پنجاب، جو کہ آئی بی آر ڈی کے پانچ سالہ (2018-2023) کے US$ 300 ملین قرض سے معاون ہے، تین اہم ستونوں پر مبنی ہے: 1) فصل اور مویشیوں کے چھوٹے کسانوں کی پیداواریت اور آمدنی بڑھانا بشمول خواتین کسان، 2) زرعی پیداوار میں اضافی قیمت بڑھانا، اور 3) موسمی تبدیلی اور قدرتی آفات کے خلاف کسانوں کی مزاحمت کو بہتر بنانا۔',
          policyLink:
            'https://www.indexinsuranceforum.org/agriculture-insurance-program-smart-punjab-pakistan',
          policyImage: require('../Images/zzzz.png'),
        },
        {
          policyId: 'insd1',
          policyName: 'میزان بینک ٹریکٹر آسان فنانس',
          policyDetails:
            'میزان بینک مشینی زراعت کے لیے ٹریکٹرز حاصل کرنے کے لیے شریعت کے مطابق پروڈکٹ فراہم کرتا ہے۔\n\nمیزان ٹریکٹر آسان فنانس دستیاب ہے:\n\nانفرادی کسانوں (فارم اور غیر فارم)\nکارپوریٹ فارمنگ کے لیے ٹریکٹرز کی ضرورت\nفنانسنگ کی مدت 3 سے 5 سال ہے۔\n\nادائیگی کی فریکوئنسی ماہانہ، سہ ماہی یا نصف سالانہ ہو سکتی ہے۔',
          policyLink: 'https://www.meezanbank.com/agricultural-finance',
          policyImage: require('../Images/zzzzz.jpg'),
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>دستیاب انشورنس</Text>
      {insurances.map((insurance, index) => (
        <View key={index} style={styles.insuranceContainer}>
          <Text style={styles.insuranceProvider}>
            {insurance.insuranceProvider}
          </Text>
          {insurance.policies.map((policy, policyIndex) => (
            <TouchableOpacity
              key={policy.policyId}
              style={styles.policyContainer}
              onPress={() => navigation.navigate('InsuranceDetails', { policy })}>
              <View style={styles.imageContainer}>
                <Image source={policy.policyImage} style={styles.image} />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.policyName}>{policy.policyName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'deepskyblue',
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    backgroundColor: '#4b830d',
    color: '#fff',
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  insuranceContainer: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  insuranceProvider: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: 'black',
  },
  policyContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
  },

  image: {
    width: '100%',
    height: width * 0.6, // Maintain aspect ratio
    marginBottom: 8,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  policyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  policyDetails: {
    fontSize: 14,
    color: '#555',
  },
});

export default InsuranceScreen;
