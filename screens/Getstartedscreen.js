import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';

// Get screen width and height
const { width } = Dimensions.get('window');

const App = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo2.png")} // Fixed logo import
          style={styles.logo}
        />
      </View>

      {/* Absolute positioned button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Light background color
    position: 'relative', // Needed for absolute positioning of the button
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50, // Controls space between logo and button
  },
  logo: {
    width: 500, // Scaled to 60% of screen width
    height: 500, // Scaled to maintain aspect ratio
    resizeMode: 'contain', // Ensures the logo retains its aspect ratio
  },
  button: {
    position: 'absolute', // Position button in front of the image
    bottom: 200, // Distance from the bottom (adjust as needed)
    backgroundColor: '#00008B',
    paddingVertical: 15,
    paddingHorizontal: 90,
    borderRadius: 40, // Properly rounded corners
  },
  buttonText: {
    color: '#FFA500', // Bright orange text
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
