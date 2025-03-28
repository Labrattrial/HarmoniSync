import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useTheme } from '../navigations/ThemeProvider'; // Import the custom hook for theme management

const Login = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useTheme(); // Get dark mode state and toggle function

  return (
    <View style={[styles.backgroundImage, { backgroundColor: isDarkMode ? '#121212' : '#ffffff' }]}>
      {/* Background Image */}
      <Image
        source={require("../assets/images/logo.png")} // Use require() for local images
        style={{ width: 219, height: 250, position: "absolute", left: 83, top: 74 }}
      />

      {/* Blue Background */}
      <View style={[styles.background1, { backgroundColor: isDarkMode ? '#333' : '#08026F' }]} />

      {/* Texts */}
      <Text style={[styles.H1, { color: isDarkMode ? '#D6A73C' : '#D6A73C' }]}>Login</Text>
      <Text style={[styles.subH, { color: isDarkMode ? '#D6A73C' : '#D6A73C' }]}>Sign in to continue</Text>

      {/* Input Fields */}
      <TextInput placeholder="Student ID" style={[styles.textInput, { backgroundColor: isDarkMode ? '#444' : '#D6A73C', color: isDarkMode ? '#fff' : '#08026F' }]} />
      <TextInput placeholder="Password" secureTextEntry style={[styles.textInput1, { backgroundColor: isDarkMode ? '#444' : '#D6A73C', color: isDarkMode ? '#fff' : '#08026F' }]} />

      {/* Login Button */}
      <TouchableOpacity style={[styles.LoginButton, { backgroundColor: isDarkMode ? '#B27E08' : '#B27E08' }]} onPress={() => navigation.navigate('Main')}>
        <Text style={[styles.LoginText, { color: isDarkMode ? '#08026F' : '#08026F' }]}>Log In</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <Text style={[styles.frgtText, { color: isDarkMode ? '#D6A73C' : '#D6A73C' }]}>Forgot Password?</Text>

      {/* Sign Up */}
      <Text style={[styles.signupText, { color: isDarkMode ? '#D6A73C' : '#D6A73C' }]}>
        Don’t have an account?{" "}
        <Text
          style={[styles.signupLink, { color: isDarkMode ? '#D6A73C' : '#D6A73C' }]}
          onPress={() => navigation.navigate("Register")} >Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  backgroundImage: {
    width: 428, height: 926, position: "center", overflow: "hidden"
  },

  background1: {
    width: 380, height: 570, position: "absolute", left: 0, top: 300, borderTopRightRadius: 95
  },
  H1: {
    position: "absolute", left: 35, top: 330, width: 321, textAlign: "center", fontSize: 36, fontWeight: "700"
  },
  subH: {
    position: "absolute", left: 35, top: 380, width: 321, textAlign: "center", fontSize: 16, fontWeight: "700"
  },
  textInput: {
    position: "absolute", left: 17, top: 450, width: 346, height: 54, borderRadius: 31, textAlign: "center", fontSize: 16
  },
  textInput1: {
    position: "absolute", left: 17, top: 530, width: 346, height: 54, borderRadius: 31, textAlign: "center", fontSize: 16
  },
  LoginButton: {
    position: "absolute", left: 17, top: 610, width: 346, height: 54, borderRadius: 31, justifyContent: "center", alignItems: "center"
  },
  LoginText: {
    fontSize: 16, fontWeight: "700"
  },
  frgtText: {
    position: "absolute", left: 35, top: 690, width: 321, textAlign: "center", fontSize: 16, fontWeight: "700", textDecorationLine: "underline"
  },
  signupText: {
    position: "absolute", left: 35, top: 720, width: 321, textAlign: "center", fontSize: 16
  },
  signupLink: {
    fontWeight: "700",
    textDecorationLine: "underline"
  },
});
