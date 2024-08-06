import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const LoansScreen = ({navigation}) => {
  const banks = [
    {
      bankName: 'زرعی ترقیاتی بینک لمیٹڈ (ZTBL)',
      loans: [
        {
          loanId: 'banka1',
          loanName: 'پھلوں اور سبزیوں کی بچت کے لیے قرض کی مالی امداد',
          loanDetails:
            'عملیاتی اختیارات\n\nیہ صرف سیلاب متاثرہ علاقوں میں قابل اطلاق ہوں گے۔\n\nاہلیت کے معیارات:\nسیلاب متاثرہ علاقوں میں چھوٹے اور محروم زمیندار/کرایہ دار جو (الف) آبپاش زمین پر 5 ایکڑ یا (ب) برساتی زمین پر 10 ایکڑ کا کاشت کر رہے ہیں۔\nایس بی پی سے واضح e-CIB رپورٹ۔\nذمہ دار کا خطرہ ریٹنگ (ORR) 4 تک۔\nZTBL یا کسی دیگر مالی ادارے کا باغاوت نہ ہونا۔\n\nدرکار دستاویزات:\nقرض کی درخواست۔\nمعتبر سی این آئی سی (CNIC)۔\nحالیہ تصاویر (2)۔\nکسرہ گردوارہ/فیلڈ بک (آخری کاشت کا نمونہ) جیسے کاشت کار کے ثبوت کے طور پر۔\nضمانتی بانڈ۔\nضمانت دینے والوں/ضمانت داروں کی پیش کردہ زمین کی فرد جمعیہ۔\n\nقرض کی وصولی:\nمختصر مدت کے انتاجی/ورکنگ کیپیٹل قروض پہلی تقسیم کے بعد 18 مہینوں کے اندر وصول ہوں گے۔',
          loanLink:
            'https://ztbl.com.pk/agri-loan/financing-product-for-fruits-vegetable-saver/',
            loanImage: require('../Images/veg.jpg'),
        },
        {
          loanId: 'banka2',
          loanName: 'کسان خوشحال قرض',
          loanDetails:
            'اہلیت کے معیارات\nاس منصوبے کا بنیادی طور پر ملک بھر میں تمام اہل زرعی کاروں کے تحت کام کے سرمایہ کاری اور داخلات کی ضروریات کے تمام فنڈنگ کی ضرورت کے لئے ہوگا۔\n\nدرکار دستاویزات:\nسی این آئی سی (CNIC) کا کاپی، قرض کی درخواست، زرعی پاس بک/فرد جمعبندی، 2 حالیہ تصاویر۔',
          loanLink: 'https://ztbl.com.pk/agri-loan/kissan-khushhal-scheme-kks/',
          loanImage: require('../Images/sch2.webp'),
        },
        {
          loanId: 'banka3',
          loanName: 'بلا سود قرضے',
          loanDetails:
            'اہلیت کے معیارات\nسیلاب متاثرہ علاقوں میں چھوٹے اور محروم زمیندار/کرایہ دار جو (الف) آبپاش زمین پر 5 ایکڑ یا (ب) برساتی زمین پر 10 ایکڑ کا کاشت کر رہے ہیں۔\nای سی بی پی سے واضح رپورٹ۔\nذمہ دار کا خطرہ ریٹنگ (ORR) 4 تک۔\nZTBL یا کسی دیگر مالی ادارے کا باغاوت نہ ہونا۔\n\nدرکار دستاویزات:\nقرض کی درخواست۔\nمعتبر سی این آئی سی (CNIC)۔\nحالیہ تصاویر (2)۔\nکسرہ گردوارہ/فیلڈ بک (آخری کاشت کا نمونہ) جیسے کاشت کار کے ثبوت کے طور پر۔\nضمانتی بانڈ۔\nضمانت دینے والوں/ضمانت داروں کی پیش کردہ زمین کی فرد جمعیہ۔\n\nقرض کی وصولی:\nمختصر مدت کے انتاجی/ورکنگ کیپیٹل قروض پہلی تقسیم کے بعد 18 مہینوں کے اندر وصول ہوں گے۔',
          loanLink:
            'https://ztbl.com.pk/agri-loan/interest-free-loans-and-risk-sharing-scheme-for-landless-farmers-if-rslf-in-flood-affected-areas/',
            loanImage: require('../Images/sch3.jpg'),
        },
      ],
    },

    {
      bankName: 'الائیڈ بینک',
      loans: [
        {
          loanId: 'bankb1',
          loanName: 'ہری بھری ایگری ریوالونگ کریڈٹ',
          loanDetails:
            'یہ مالی امدادی سہولت زرعی کسانوں کو زرعی پیداوار قروض حاصل کرنے میں مدد فراہم کرنے کے لیے تیار کی گئی ہے تاکہ زرعتی فارمنگ کی ضروریات کے سرمایہ کاری کو پورا کیا جا سکے۔\n\nشرائط اور ضوابط:\nامیدوار کی عمر 18 سے 65 سال ہونی چاہئے۔\nقرض کی درخواست کے خلاف ایک یا زیادہ ضمانتوں کے خلاف قروض دیے جا سکتے ہیں، تفصیلات درج ذیل ہیں:\nزرعی زمین\nشہری جائیداد\nنقدی سکیورٹیز\n',
          loanLink:
            'https://www.abl.com/business-banking/agriculture-financing/agriculture-financing-products/haribhari-agri-revolving-credit/',
          loanImage: require('../Images/Maize.jpg'),
        },
        {
          loanId: 'bankb2',
          loanName: 'ایگریکلچر فنانس پولٹری فارمنگ',
          loanDetails:
            'مرغی پالنے کی زرعی مالیت کے لیے تیار شدہ سہولت کے ذریعے ان ماحولیاتی ضروریات کا پورا کیا جائے گا جو ہیچری اور/یا مرغوں کی فارمنگ سے وابستہ کسانوں کی مالی ضروریات کو مدد فراہم کرنے کے لیے تیار کی گئی ہے۔\n\nبینک موجودہ فارمنگ کے لیے دو قسم کی مالی امدادی سہولتیں فراہم کرے گا جو ہر سیگمنٹ کے تحت مقصد پر مبنی ہوں گی۔\n\nورکنگ کیپیٹل فنانس – مرغی پالنے کی زرعت\nڈویلپمنٹ فنانس – مرغی پالنے کی زرعت\n\nمقصد\nفارم اور ہیچری کے لیے مشینری/آلات کی خریداری\nبروئلر، لیئر، ہیچری تعمیرات اور سائلوز (کنکریٹ اور اسٹیل)\nشیڈز/سیمی-کنٹرول شیڈز/کنٹرول شیڈز، خود کار ڈرنکر/ٹیوب فیڈر، جنریٹرز، وینٹلیٹرز، میزیں انڈے کے ذخیرہ کاری پلانٹس\nسستے قیمت کے استحکامات جیسے پانی/چارہ کے برتن، چک گارڈ، سپرے پمپس، فیومیگنٹس، وزن پیمائی کے آلات، ٹب، پانی کے نپلز، لے نیٹس، PVC پائپز اور کریٹس وغیرہ۔\nمرغی صنعت کے قیام کے لیے کسی بھی دیگر آئٹم\n\nنمایاں خصوصیات/شرائط و ضوابط\nامیدوار کی عمر 18 سے 64 سال ہونی چاہئے\n1 سے 5 سال تک کریڈٹ دستیابی*\nیہ مالی سہولت مرغی کے کاروبار سے وابستہ خواتین کے لیے بھی دستیاب ہے\n',
          loanLink:
            'https://www.abl.com/business-banking/agriculture-financing/agriculture-financing-products/agriculture-finance-poultry-farming/',
          loanImage: require('../Images/chicken.jpeg'),
        },
        {
          loanId: 'bankb3',
          loanName: 'اتحادی آبیاری',
          loanDetails:
            'یہ مالیتی سہولت زرعی کسانوں کو زرعی ترقیاتی قروض (ٹرم فنانس) حاصل کرنے میں مدد فراہم کرنے کے لیے تیار کی گئی ہے۔ اس کے ذریعے برانڈ نیواکٹرک/سولر ٹیوب ویل، لفٹ پمپ اور ہائی ایفیشنسی آبپاشی سسٹمز اور آبپاشی سسٹم کے سولرائزیشن کے خریداری اور انسٹالیشن کے لیے مالی امداد فراہم کی جاتی ہے۔\n\nشرائط و ضوابط:\nعمر کی حد 18 سے 62 سال\nقرض کی مدت: 3 سے 5 سال (سولر سسٹم کے بغیر آبپاشی سسٹم کے خریداری اور انسٹالیشن کے لیے)\nقرض کی مدت: زیادہ سے زیادہ 10 سال (آبپاشی سسٹم کے سولرائزیشن کے ساتھ، جس میں ایک سال کی آرام دہ مدت شامل ہے)\nقرض کے ایک ورکینگ اسٹوک میں (70:30)\nکم سے کم ملکیت اور کاشت کی ضرورت:\nسولر ٹیوب ویل/پمپ کے لیے 12.5 ایکڑ\nروایتی ٹیوب ویل/پمپ کے لیے 7 ایکڑ\nہائی ایفیشنسی آبپاشی سسٹمز کے لیے 3 ایکڑ\nنصف سالانہ قسطوں میں وصولی ہوگی۔\nیہ مالی سہولت زرعی کسان خواتین کے لیے بھی دستیاب ہے۔\nقروض کی تفصیلات ایک یا ایک سے زیادہ ضمانتی اختیارات کے ذریعے وسعت دی جا سکتی ہیں۔\n',
          loanLink:
            'https://www.abl.com/business-banking/agriculture-financing/agriculture-financing-products/allied-aabayari/',
          loanImage: require('../Images/hhhh.jpg'),
        },
        {
          loanId: 'bankb4',
          loanName: 'ٹریکٹر فنانسنگ',
          loanDetails:
            'یہ مالی سہولت زرعی کسانوں کو زرعی ترقیاتی قروض (ٹرم فنانس) حاصل کرنے میں مدد فراہم کرنے کے لیے تیار کی گئی ہے، تاکہ وہ نئے ٹریکٹر کی خریداری کرسکیں جو مسابقتی مارک اپ نرخوں پر دستیاب ہو۔\n\nشرائط و ضوابط:\nدرخواست دہندہ کی عمر 18 سے 62 سال کے درمیان ہونی چاہیے\nقرض کی مدت: 3 سے 5 سال\nزیر کاشت زمین کی کم از کم مقدار 12.5 ایکڑ ہونی چاہیے\nکم از کم زمین کی ملکیت 5 ایکڑ ہونی چاہیے\nہر کسان کے لیے زیادہ سے زیادہ ایک ٹریکٹر کی مالی امداد فراہم کی جا سکتی ہے\nیہ مالی سہولت خواتین کسانوں کے لیے بھی دستیاب ہے\nقرض کی واپسی نصف سالانہ قسطوں میں ہوگی (اصل رقم کے ساتھ مارک اپ)\nٹریکٹر کی انشورنس\nقرض کی تفصیلات ایک یا ایک سے زیادہ ضمانتی اختیارات کے ذریعے وسعت دی جا سکتی ہیں، جیسے:\nزرعی زمین\nشہری جائیداد\nلیکویڈ سیکیورٹیز\nہائپوتھیکیشن\n',
          loanLink:
            'https://www.abl.com/business-banking/agriculture-financing/agriculture-financing-products/tractor-financing/',
          loanImage: require('../Images/sch5.webp'),
        },
        {
          loanId: 'bankb5',
          loanName: 'الائیڈ فارم میکانائزیشن',
          loanDetails:
            'یہ مالی سہولت زرعی کسانوں کو زرعی ترقیاتی قروض (ٹرم فنانس) حاصل کرنے میں مدد فراہم کرنے کے لیے تیار کی گئی ہے تاکہ وہ زرعی آلات خرید سکیں جو فارم کی مشینی کو بہتر بنانے کے لیے استعمال ہوں گے۔\n\nشرائط و ضوابط:\nعمر کی حد: 18 سے 62 سال\nقرض کی مدت: 3 سے 5 سال\nقرض اور ایکوئٹی کا تناسب (70:30)\nملکیت اور کاشت کی کم از کم ضرورت:\nپنجاب، سندھ اور بلوچستان کے لیے 5 ایکڑ\nکے پی کے، آزاد کشمیر اور گلگت بلتستان کے لیے 2 ایکڑ\nقرض کی واپسی نصف سالانہ قسطوں میں ہوگی\nیہ مالی سہولت خواتین کسانوں کے لیے بھی دستیاب ہے\nقرض کی تفصیلات ایک یا ایک سے زیادہ ضمانتی اختیارات کے ذریعے وسعت دی جا سکتی ہیں، جیسے:\nزرعی زمین\nشہری جائیداد\nلیکویڈ سیکیورٹیز\nہائپوتھیکیشن\n',
          loanLink:
            'https://www.abl.com/business-banking/agriculture-financing/agriculture-financing-products/allied-farm-mechanization/',
          loanImage: require('../Images/bb.jpg'),
        },
      ],
    },
    {
      bankName: 'نیشنل رورل سپورٹ پروگرام(NRSP)',
      loans: [
        {
          loanId: 'bankb1',
          loanName: 'زرعی قرضہ',
          loanDetails:
            'زرعی قرضہ لینے کا مقصد زرعی قرضہ درج ذیل مقاصد کے لیے لیا جا سکتا ہے لیکن ان تک محدود نہیں:\n\nزمین کے لیز کی ادائیگی\nزمین کی ہمواری\nکاشتکاری کے لیے زمین کی تیاری\nبیج، کھاد، کیڑے مار ادویات یا ٹیوب ویل کے پانی کی خریداری\nزرعی پیداوار سے متعلق کوئی اور سرگرمی\n\nقرض کے لیے اہلیت\n\nزیادہ سے زیادہ عمر 63 سال (قرض کی بکنگ کے وقت)\nکلائنٹ کے پاس درست شناختی کارڈ (CNIC) ہونا چاہئے\nاسی ضلع کا رہائشی ہو',
          loanLink: 'https://www.nrspbank.com/products/agricultural-loan',
          loanImage: require('../Images/sch6.jpg'),
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionHeader}>دستیاب قرضے۔</Text>
      {banks.map((bank, index) => (
        <View key={index} style={styles.bankContainer}>
          <Text style={styles.bankName}>{bank.bankName}</Text>
          {bank.loans.map((loan) => (
            <TouchableOpacity
              key={loan.loanId}
              style={styles.loanContainer}
              onPress={() => navigation.navigate('LoanDetails', { loan })}
            >
              <Image source={loan.loanImage} style={styles.loanImage} />
              <Text style={styles.loanName}>{loan.loanName}</Text>
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
    backgroundColor: 'green', 
    color: '#fff', 
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#4b830d',
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },
  bankContainer: {
    marginBottom: 24,
  },
  bankName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: 'black',
  },
  loanContainer: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  loanImage: {
    width: width - 64, // Adjusted width
    height: 180, // Adjusted height
    marginBottom: 8,
    borderRadius: 8,
  },
  loanName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
});

export default LoansScreen;