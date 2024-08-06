import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const Terms = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>شرائط و ضوابط</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>
          Agri App میں خوش آمدید! یہ شرائط اور ضوابط ("شرائط") آپ کے Agri App تک رسائی اور استعمال کو قابو میں لانگے۔ Agri App تک رسائی حاصل کرنے یا استعمال کرنے سے پہلے، آپ ان شرائط سے متفق ہونے کے لیے موافقت کریں۔ اگر آپ کسی حصے سے متفق نہ ہوں تو آپ Agri App تک رسائی حاصل نہیں کر سکتے یا استعمال نہیں کر سکتے۔
        </Text>

        <Text style={styles.text}>
          شرائط قبول کرنا
          Agri App تک رسائی حاصل کرنے یا استعمال کرنے سے آپ ان شرائط کو ماننے کے لیے موافق ہوتے ہیں اور ان شرائط کی پابندیاں کو انجام دینے کے لیے۔
        </Text>

        <Text style={styles.text}>
          شرائط میں تبدیلی
          ہم اس حق رکھتے ہیں کہ Agri App کے لیے شرائط کو کسی بھی وقت بغیر پہلے اطلاع کے اپ ڈیٹ یا ترمیم کریں۔ تبدیلیاں Agri App پر پوسٹ کرنے کے فوراً بعد فوراً قابل اطلاق ہوں گی۔ آپ کے Agri App پر تبدیلیوں کی پوسٹ کے بعد، آپ کے استمراری استعمال سے واضح ہوتا ہے کہ آپ ان تبدیلیوں کو قبول کرتے ہیں۔
        </Text>

        <Text style={styles.text}>
          رازداری
          ہم آپ کی رازداری کی احترام کرتے ہیں۔ ہماری رازداری کی معاشرتی ماخذ ہمارے رازداری پالیسی میں وضاحت کی گئی ہے، جو ان شرائط کے حصول کے لیے شامل ہے۔ Agri App کا استعمال کرتے ہوئے، آپ ہمارے انفرادی، استعمال، اور معلومات کے جمع، استعمال، اور اشتراک کو مانتے ہیں۔
        </Text>

        <Text style={styles.text}>
          اکاؤنٹ کی معلومات
          آپ اپنے Agri App کے استعمال سے منسلک کسی بھی لاگ ان کی معاونت سرپرست ہیں۔ آپ مانتے ہیں کہ آپ کوئی بھی فعالیتیں اپنے اکاؤنٹ کا استعمال کرتے ہوئے اپنی ذمہ داری پر ہوں گے، چاہے وہ آپ کی اجازت ہو یا نہ ہو۔
        </Text>

        <Text style={styles.text}>
          Agri App کا استعمال
          Agri App اراکین کے متعلق معلوماتی مقاصد کے لیے فراہم کیا گیا ہے۔ آپ مانتے ہیں کہ آپ Agri App کو صرف قانونی مقاصد کے لیے اور تمام لاگو قوانین اور ضوابط کے مطابق استعمال کریں گے۔
        </Text>

        <Text style={styles.text}>
          فکری ملکیت
          Agri App پر دستیاب تمام مواد اور مصنوعات، جیسے متن، گرافکس، لوگو، تصاویر، اور سافٹ ویئر، Agri App یا اس کے لائسنسر کی ملکیت ہیں اور انہیں کاپی رائٹ، ٹریڈ مارک، اور دیگر فکری ملکیت قوانین سے حفاظت ملتی ہے۔ آپ بغیر Agri App کی پہلے موافقت کے کسی بھی مواد کا استعمال، نسخہ، ترمیم، یا تقسیم نہیں کر سکتے۔
        </Text>

        <Text style={styles.text}>
          تنبیہ
          Agri App "جیسے کہ ہے" اور "جیسا ہے" بنیاد پر فراہم کیا جاتا ہے، بغیر کسی قسم کے یا ضمنی یا ظاہری ضمنی، وارنٹیوں کے بغیر۔ ہم Agri App یا اس کے مواد کی درستگی، مکمل پن، مستقلیت، یا دستیابی کے بارے میں کوئی وارنٹیوں یا تائیدات نہیں دیتے۔
        </Text>

        <Text style={styles.text}>
          مسئلے کی حد
          قانون کی اپنی پوری طاقت کے مطابق، ہم آپ کو Agri App کے استعمال سے جڑی کسی بھی سیدھی، غیر مستقیم، اتفاقی، خصوصی، اور پینلٹی ہوسکی چیزوں کے لیے ذمہ دار نہیں ہوں گے۔
        </Text>

        <Text style={styles.text}>
          اطلاقی قانون
          Agri App کے استعمال اور شرائط پر عمومی قانون حاکم ہوں گے۔
        </Text>

        <Text style={styles.text}>
          انفعال
          Agri App یا اس کی شرائط کے استعمال کو قطع کرنے یا ترک کرنے کے لیے آپ کی صلاحیت ہے۔ ان شرائط کو مکمل طور پر منسوخ کرنے کے لیے، آپ کے Agri App تک رسائی حاصل کرنے اور استعمال کرنے کے آپ کے تمام حقوق اور اختیارات ختم ہو جائیں گے۔
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'deepskyblue',
  },
  header: {
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    marginBottom: 20,
    backgroundColor: 'green',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: "white",
  },
  content: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default Terms;