import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Modal, FlatList, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../navigations/ThemeProvider';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
];

// Translation Object
const translations = {
  en: { profile: 'Profile', account: 'Account', generalSettings: 'General Settings', darkMode: 'Dark Mode', language: 'Language', about: 'About', terms: 'Terms and Conditions', privacy: 'Privacy Policies', rateApp: 'Rate this App', shareApp: 'Share this App' },
  es: { profile: 'Perfil', account: 'Cuenta', generalSettings: 'Configuración general', darkMode: 'Modo oscuro', language: 'Idioma', about: 'Acerca de', terms: 'Términos y condiciones', privacy: 'Políticas de privacidad', rateApp: 'Calificar esta aplicación', shareApp: 'Compartir esta aplicación' },
  fr: { profile: 'Profil', account: 'Compte', generalSettings: 'Paramètres généraux', darkMode: 'Mode sombre', language: 'Langue', about: 'À propos', terms: 'Conditions générales', privacy: 'Politiques de confidentialité', rateApp: 'Évaluer cette application', shareApp: 'Partager cette application' },
  de: { profile: 'Profil', account: 'Konto', generalSettings: 'Allgemeine Einstellungen', darkMode: 'Dunkler Modus', language: 'Sprache', about: 'Über', terms: 'Geschäftsbedingungen', privacy: 'Datenschutzrichtlinien', rateApp: 'Bewerte diese App', shareApp: 'Teile diese App' },
  zh: { profile: '个人资料', account: '账户', generalSettings: '通用设置', darkMode: '暗模式', language: '语言', about: '关于', terms: '条款和条件', privacy: '隐私政策', rateApp: '评价此应用', shareApp: '分享此应用' },
  ja: { profile: 'プロフィール', account: 'アカウント', generalSettings: '一般設定', darkMode: 'ダークモード', language: '言語', about: '約', terms: '利用規約', privacy: 'プライバシーポリシー', rateApp: 'このアプリを評価する', shareApp: 'このアプリを共有する' },
};

const Profile = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [aboutModalVisible, setAboutModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [rateModalVisible, setRateModalVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, []);

  useEffect(() => {
    if (rateModalVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [rateModalVisible]);

  const selectLanguage = async (langCode) => {
    setSelectedLanguage(langCode);
    await AsyncStorage.setItem('language', langCode);
    setModalVisible(false);
  };

  const submitRating = () => {
    setRateModalVisible(false);
    alert('Thank you for your feedback!');
  };


  const t = translations[selectedLanguage];

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#ffffff' }]}>
      {/* Header Section */}
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#333' : '#08026F' }]}>
        <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#D6A73C' }]}>
          {t.profile}
        </Text>
      </View>
      

      {/* Menu List */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={[styles.menuText, { color: isDarkMode ? '#ddd' : '#333' }]}>
            {t.account}
          </Text>
          <Icon name="chevron-right" size={22} color={isDarkMode ? '#aaa' : '#333'} />
        </TouchableOpacity>

        {/*GENERAL SETTINGS*/}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.iconRow}>
            <Icon name="settings" size={22} color={isDarkMode ? '#ddd' : '#08026F'} style={styles.icon} />
            <Text style={[styles.menuText, { color: isDarkMode ? '#ddd' : '#333' }]}>{t.generalSettings}</Text>
          </View>
          <Icon name="chevron-right" size={22} color={isDarkMode ? '#aaa' : '#333'} />
        </TouchableOpacity>

        <View style={styles.menuItem}>
          <View style={styles.iconRow}>
            <Icon name={isDarkMode ? 'moon' : 'sun'} size={22} color={isDarkMode ? '#ddd' : '#FFA500'} style={styles.icon} />
            <Text style={[styles.menuText, { color: isDarkMode ? '#ddd' : '#333' }]}>{t.darkMode}</Text>
          </View>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>

      {/*LANGUAGE SETTINGS*/}
        <TouchableOpacity style={styles.menuItem} onPress={() => setModalVisible(true)}>
          <View style={styles.iconRow}>
            <FontAwesome name="language" size={22} color={isDarkMode ? '#ddd' : '#08026F'} style={styles.icon} />
            <Text style={[styles.menuText, { color: isDarkMode ? '#ddd' : '#333' }]}>{t.language}</Text>
          </View>
          <Icon name="chevron-right" size={22} color={isDarkMode ? '#aaa' : '#333'} />
        </TouchableOpacity>

        {/* Modal for Language Selection */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{t.language}</Text>
              <FlatList
                data={languages}
                keyExtractor={(item) => item.code}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.languageOption} onPress={() => selectLanguage(item.code)}>
                    <Text style={styles.languageText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
        {/*ABOUT SETTINGS*/}
        <TouchableOpacity style={styles.menuItem} onPress={() => setAboutModalVisible(true)}>
        <View style={styles.iconRow}>
          <FontAwesome name="info-circle" size={22} color={isDarkMode ? '#ddd' : '#08026F'} style={styles.icon} />
          <Text style={[styles.menuText, { color: isDarkMode ? '#ddd' : '#333' }]}>{t.about}</Text>
        </View>
        <Icon name="chevron-right" size={22} color={isDarkMode ? '#aaa' : '#333'} />
      </TouchableOpacity>

      {/* About Modal */}
      <Modal visible={aboutModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>About HarmoniSync</Text>
            <Text style={styles.modalDescription}>
              HarmoniSync is an AI-powered mobile application designed to assist Bachelor of Music in Music Education (BMME) students in composing and practicing music. 
              It integrates AI-driven music composition, real-time performance feedback, and interactive learning tools to enhance the music education experience.
            </Text>
            <Text style={styles.modalTitle}>About the Developers</Text>
            <Text style={styles.modalDescription}>
              The developers behind HarmoniSync are a team of passionate musicians and software engineers dedicated to bridging the gap between technology and music education. 
              Their goal is to provide an intuitive and powerful tool that supports creativity and learning in the field of music.
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setAboutModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

          {/* Terms and Conditions Section */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.iconRow}>
              <Icon name="file-text" size={22} color={isDarkMode ? '#ddd' : '#08026F'} style={styles.icon} />
              <Text style={[styles.menuText, { color: isDarkMode ? '#ddd' : '#333' }]}>{t.terms}</Text>
            </View>
            <Icon name="chevron-right" size={22} color={isDarkMode ? '#aaa' : '#333'} />
          </TouchableOpacity>

          {/* Privacy Policies Section */}
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.iconRow}>
              <Icon name="shield" size={22} color={isDarkMode ? '#ddd' : '#08026F'} style={styles.icon} />
              <Text style={[styles.menuText, { color: isDarkMode ? '#ddd' : '#333' }]}>{t.privacy}</Text>
            </View>
            <Icon name="chevron-right" size={22} color={isDarkMode ? '#aaa' : '#333'} />
          </TouchableOpacity>

          {/* Rate this App Section */}
          
          <TouchableOpacity style={styles.menuItem} onPress={() => setRateModalVisible(true)}>
          <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#ffffff' }]}> 
        <View style={styles.iconRow}>
          <FontAwesome name="star" size={22} color={isDarkMode ? '#ddd' : '#08026F'} style={styles.icon} />
          <Text style={[styles.menuText, { color: isDarkMode ? '#ddd' : '#333' }]}>{t.rateApp}</Text>
        </View>
        </View>
        <Icon name="chevron-right" size={22} color={isDarkMode ? '#aaa' : '#333'} />
      </TouchableOpacity>

      <Modal visible={rateModalVisible} transparent animationType="none">
        <Animated.View style={[rates.modalContainer, { opacity: fadeAnim }]}> 
        <View style={rates.modalBox}>
          <Text style={rates.modalTitle}>Enjoying HarmoniSync?</Text>
          <Text style={rates.modalSubtitle}>Tap a star to rate it on the App Store.</Text>
          <View style={rates.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)} style={{ marginHorizontal: 5 }}>
                <FontAwesome name="star" size={30} color={rating >= star ? '#FFD700' : '#ccc'} />
              </TouchableOpacity>
            ))}
          </View>
          </View>
          <View style={rates.buttonRow}>
            <TouchableOpacity onPress={() => setRateModalVisible(false)}style={rates.cancelButton}><Text style={rates.buttonText}>Cancel</Text></TouchableOpacity>
            <TouchableOpacity onPress={submitRating}style={rates.submitButton}><Text style={rates.buttonText}>Submit</Text></TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    </View>
    </View>
     
    );
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      marginTop: 30,
      paddingVertical: 20,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    headerText: {
      fontSize: 22,
      fontWeight: '700',
    },
    menuContainer: {
      paddingHorizontal: 20,
      marginTop: 20,
    },
    menuItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 18,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    iconRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuText: {
      fontSize: 18,
      fontWeight: '500',
      marginLeft: 10,
    },
    icon: {
      marginRight: 5,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    languageOption: {
      paddingVertical: 10,
      width: '100%',
      alignItems: 'center',
    },
    languageText: {
      fontSize: 18,
      color: '#333',
    },
    closeButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#d32f2f',
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
    },
    closeButtonText: {
      color: '#fff',
      fontSize: 16,
    },
   
  });

  const rates = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 },
  iconRow: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 10 },
  menuText: { fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalBox: { backgroundColor: '#fff', padding: 20, borderRadius: 20, alignItems: 'center', width: 300 },
  messageBox: { backgroundColor: '#f8f8f8', padding: 10, borderRadius: 5, marginBottom: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalSubtitle: { fontSize: 16, marginBottom: 30 },
  starContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 10 },
  cancelButton: { backgroundColor: '#d9534f', padding: 10, borderRadius: 5 },
  submitButton: { backgroundColor: '#5cb85c', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

  export default Profile;
