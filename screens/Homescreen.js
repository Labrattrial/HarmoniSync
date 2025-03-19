import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useTheme } from '../navigations/ThemeProvider';

const HomeScreen = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const [sheets, setSheets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSheets, setFilteredSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  const fetchSheets = async () => {
    setLoading(true);
    try {
      if (!isConnected) {
        const cachedSheets = await AsyncStorage.getItem('musicWorks');
        if (cachedSheets) {
          setSheets(JSON.parse(cachedSheets));
          setFilteredSheets(JSON.parse(cachedSheets));
          setLoading(false);
          return;
        } else {
          Alert.alert("No Internet", "You're offline and no cached data is available.");
          setLoading(false);
          return;
        }
      }

      // Fetch data from OpenOpus API
      const response = await fetch(`https://api.openopus.org/work/list/composer/1/genre/orchestral.json`);
      const data = await response.json();

      if (data && data.status && data.status.success && Array.isArray(data.works)) {
        const newSheets = data.works.map((work) => ({
          title: work.title || "Unknown Title",
          subtitle: work.subtitle || "No Subtitle Available",
          genre: "Orchestral",
          composer: work.composer?.name || "Unknown Composer",
          sheetUrl: `https://musescore.com/sheetmusic?q=${encodeURIComponent(work.title)}`, // Example MuseScore link
        }));

        setSheets(newSheets);
        setFilteredSheets(newSheets);
        await AsyncStorage.setItem('musicWorks', JSON.stringify(newSheets));
      } else {
        Alert.alert("No Data", "No music works found.");
      }
    } catch (error) {
      console.error("Error fetching music works:", error);
      Alert.alert("Error", "Failed to fetch music works.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSheets();
  }, [isConnected]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredSheets(sheets);
    } else {
      const filtered = sheets.filter(
        (sheet) =>
          sheet.title.toLowerCase().includes(query.toLowerCase()) ||
          sheet.composer.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSheets(filtered);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "#ffffff" }]}> 
      <View style={[styles.header, { backgroundColor: isDarkMode ? "#333333" : "#08026F" }]}> 
        <Image source={require('../assets/images/logo2.png')} style={styles.profileImage} /> 
        <View style={styles.headerTextContainer}> 
          <Text style={[styles.welcomeText, { color: isDarkMode ? "#D6A73C" : "#ffffff" }]}>Welcome, Music Enthusiast</Text>
          <Text style={[styles.studentIdText, { color: isDarkMode ? "#D6A73C" : "#ffffff" }]}>Explore Classical Works</Text>
        </View>
      </View>

      <View style={styles.searchContainer}> 
        <View style={[styles.searchInputContainer, { backgroundColor: isDarkMode ? "#444444" : "#f0f0f0" }]}> 
          <Icon name="search" size={24} color={isDarkMode ? "#D6A73C" : "#08026F"} style={styles.searchIcon} /> 
          <TextInput
            style={[styles.searchInput, { color: isDarkMode ? "#ffffff" : "#333333" }]}
            placeholder="Search by Title or Composer"
            placeholderTextColor={isDarkMode ? "#999999" : "#666666"}
            value={searchQuery}
            onChangeText={handleSearch}
          /> 
        </View>
      </View>

      <ScrollView>
        {loading ? (
          <ActivityIndicator size="large" color={isDarkMode ? "#D6A73C" : "#08026F"} />
        ) : filteredSheets.length > 0 ? (
          filteredSheets.map((sheet, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.sheetContainer, { backgroundColor: isDarkMode ? "#222222" : "#ffffff" }]}
              onPress={() => navigation.navigate('MusicSheet', { url: sheet.sheetUrl })}
            > 
              <Text style={[styles.sheetTitle, { color: isDarkMode ? "#D6A73C" : "#000000" }]}>{sheet.title}</Text>
              <Text style={[styles.sheetComposer, { color: isDarkMode ? "#bbbbbb" : "#555555" }]}>Composer: {sheet.composer}</Text>
              <Icon name="music-note" size={24} color={isDarkMode ? "#D6A73C" : "#08026F"} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={[styles.noResults, { color: isDarkMode ? "#ffffff" : "#333333" }]}>No Music Works Found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 30, flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginRight: 15 },
  headerTextContainer: { flex: 1, justifyContent: 'center' },
  searchContainer: { marginTop: 10, paddingHorizontal: 10 },
  searchInputContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, paddingHorizontal: 10 },
  searchInput: { flex: 1, fontSize: 16, paddingHorizontal: 10 },
  sheetContainer: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  noResults: { textAlign: 'center', marginTop: 20, fontSize: 16 },
});

export default HomeScreen;
