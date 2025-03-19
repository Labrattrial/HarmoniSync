import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useTheme } from "../navigations/ThemeProvider"; // Import the custom hook for theme management

const Register = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode } = useTheme(); // Get dark mode state and toggle function
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility
  const [isAgreed, setIsAgreed] = useState(false);

  const openTermsModal = () => setIsModalVisible(true);
  const closeTermsModal = () => {
    if (isAgreed) {
      setIsModalVisible(false);
    }
  };

  const handleSignUp = () => {
    if (isAgreed) {
      console.log("Navigating to Homescreen...");
      navigation.navigate("Main");
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "black" : "#ffffff" },
      ]}
    >
      {/* Background Image */}
      <Image
        source={
          isDarkMode
            ? require("../assets/images/darkmodelogo.png") // Image for dark mode
            : require("../assets/images/logo2.png") // Image for light mode
        }
        style={styles.image}
      />


      {/* Blue Background */}
      <View
        style={[
          styles.blueBackground,
          { backgroundColor: isDarkMode ? "#333" : "#08026F" },
        ]}
      />

      {/* Register Text */}
      <Text style={[styles.title, { color: isDarkMode ? "#D6A73C" : "#D6A73C" }]}>
        Register
      </Text>

      {/* Already Registered? Log In */}
      <Text style={styles.subtitle}>
        <Text style={styles.textBold}>Already Registered? </Text>
        <Text
          style={[
            styles.link,
            { color: isDarkMode ? "#D6A73C" : "#D6A73C" },
          ]}
          onPress={() => navigation.navigate("Login")}
        >
          Log in here.
        </Text>
      </Text>

      {/* Input Fields */}
      <TextInput
        placeholder="Last Name"
        placeholderTextColor={isDarkMode ? "#888" : "#666"}
        style={[
          styles.last_name,
          { backgroundColor: isDarkMode ? "#444" : "#D6A73C", color: isDarkMode ? "#fff" : "#08026F" },
        ]}
      />
      <TextInput
        placeholder="First Name"
        placeholderTextColor={isDarkMode ? "#888" : "#666"}
        style={[
          styles.first_name,
          { backgroundColor: isDarkMode ? "#444" : "#D6A73C", color: isDarkMode ? "#fff" : "#08026F" },
        ]}
      />
      <TextInput
        placeholder="Middle Initial"
        placeholderTextColor={isDarkMode ? "#888" : "#666"}
        style={[
          styles.middle_initial,
          { backgroundColor: isDarkMode ? "#444" : "#D6A73C", color: isDarkMode ? "#fff" : "#08026F" },
        ]}
      />
      <TextInput
        placeholder="Student ID"
        placeholderTextColor={isDarkMode ? "#888" : "#666"}
        style={[
          styles.student_id,
          { backgroundColor: isDarkMode ? "#444" : "#D6A73C", color: isDarkMode ? "#fff" : "#08026F" },
        ]}
      />
      <TextInput
        placeholder="Age"
        placeholderTextColor={isDarkMode ? "#888" : "#666"}
        style={[
          styles.age,
          { backgroundColor: isDarkMode ? "#444" : "#D6A73C", color: isDarkMode ? "#fff" : "#08026F" },
        ]}
      />
      <TextInput
        placeholder="Birthdate"
        placeholderTextColor={isDarkMode ? "#888" : "#666"}
        style={[
          styles.birthdate,
          { backgroundColor: isDarkMode ? "#444" : "#D6A73C", color: isDarkMode ? "#fff" : "#08026F" },
        ]}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor={isDarkMode ? "#888" : "#666"}
        secureTextEntry
        style={[
          styles.password,
          { backgroundColor: isDarkMode ? "#444" : "#D6A73C", color: isDarkMode ? "#fff" : "#08026F" },
        ]}
      />

      {/* Terms and Conditions Text */}
      <Text
        style={[
          styles.termsText,
          { color: isDarkMode ? "#D6A73C" : "#D6A73C" },
        ]}
        onPress={openTermsModal}
      >
        View Terms & Conditions
      </Text>

      {/* Sign Up Button */}
      <TouchableOpacity
        onPress={handleSignUp}
        style={[
          styles.signupButton,
          { backgroundColor: isAgreed ? "#B27E08" : "#ccc" },
        ]}
        disabled={!isAgreed}
      >
        <Text
          style={[
            styles.signupButtonText,
            { color: isAgreed ? "#08026F" : "#666" },
          ]}
        >
          Sign Up
        </Text>
      </TouchableOpacity>

      {/* Modal for Terms and Conditions */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeTermsModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView style={styles.termsContent}>
              <Text style={styles.termsTitle}>Terms & Conditions</Text>
              <Text style={styles.termsContent}>
                Terms and Conditions for HarmoniSync: AI Music Composition Assistant{"\n"}
                {"\n"}<Text style={{ fontWeight: "bold" }}>1. Introduction</Text>{"\n"}
                By participating in the research and using the services related to HarmoniSync: AI Music Composition Assistant, you agree to comply with the terms outlined in this document. This application is being developed as part of a capstone project by students from the Bachelor of Science in Information Technology (BSIT) program at Leyte Normal University (LNU).{"\n"}
                {"\n"}<Text style={{ fontWeight: "bold" }}>2. Data Collection</Text>{"\n"}
                As part of our research process, we will be collecting personal data such as your name, student ID number, age, and birthdate. The information collected will only be used for the purpose of our research and the development of the HarmoniSync application. Participation is voluntary, and you have the right to decline participation at any time without penalty.{"\n"}
                {"\n"}<Text style={{ fontWeight: "bold" }}>3. Use of Personal Information</Text>{"\n"}
                The personal data we collect will be used exclusively for the purposes of the research project, including data analysis, surveys, and interviews related to the development of the HarmoniSync application. We will not use your information for any other purposes without your explicit consent.{"\n"}
                {"\n"}<Text style={{ fontWeight: "bold" }}>4. Data Confidentiality</Text>{"\n"}
                We are committed to protecting your privacy. All data collected will be treated with strict confidentiality and stored securely. Your personal information will not be shared with any third parties, except where required by law or with your explicit consent. We will not sell, trade, or lease your personal data to any other parties.{"\n"}
                {"\n"}<Text style={{ fontWeight: "bold" }}>5. Data Retention</Text>{"\n"}
                Your personal information will only be retained for the duration of the research project. Once the project is completed, all collected data will be securely destroyed, in accordance with the Data Privacy Act of 2012 and its implementing rules.{"\n"}
                {"\n"}<Text style={{ fontWeight: "bold" }}>6. Data Subject Rights</Text>{"\n"}
                As a data subject, you have the following rights:{"\n"}
                - Right to Access: You may request to access the personal data we hold about you.{"\n"}
                - Right to Rectification: You may request corrections to any inaccurate or incomplete data we hold about you.{"\n"}
                - Right to Erasure: You may request the deletion or erasure of your personal data, subject to applicable laws.{"\n"}
                - Right to Withdraw Consent: You may withdraw your consent for data processing at any time, although this may affect your ability to participate in the project.{"\n"}
                {"\n"}<Text style={{ fontWeight: "bold" }}>7. Security Measures</Text>{"\n"}
                We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, disclosure, alteration, or destruction. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.{"\n"}
                {"\n"}<Text style={{ fontWeight: "bold" }}>8. Consent to Participate</Text>{"\n"}
                By agreeing to participate in the research, you provide consent for us to collect and use your personal information for the purposes outlined above. You may withdraw your consent at any time by contacting us, and this will not affect any data already collected up to that point.{"\n"}
                {"\n"}<Text style={{ fontWeight: "bold" }}>9. Changes to the Terms and Conditions</Text>{"\n"}
                We reserve the right to update or modify these terms and conditions at any time. Any changes will be communicated through the application or research materials, and the updated version will take effect immediately upon posting.{"\n"}
                {"\n"}<Text style={{ fontWeight: "bold" }}>10. Contact Information</Text>{"\n"}
                If you have any questions, concerns, or requests regarding the terms and conditions or the use of your personal data, please contact our group leader, Rushena Jane Cabudsan, at 0916-281-1017 or via email at ynnacabudsan@gmail.com.{"\n"}
                {"\n"}<Text style={{ fontWeight: "bold" }}>Acknowledgment of Terms and Consent</Text>{"\n"}
                By participating in this project, you acknowledge that you have read, understood, and agree to the terms and conditions outlined above, including the use of your personal data in accordance with the Data Privacy Act of 2012.{"\n"}
              </Text>
            </ScrollView>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity onPress={() => setIsAgreed(!isAgreed)} style={styles.checkbox}>
                {isAgreed && <Text style={styles.checkmark}>✔</Text>}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>I agree to the Terms and Conditions</Text>
            </View>
            <TouchableOpacity style={[styles.closeButton, isAgreed ? styles.lightButton : styles.darkButton]} onPress={closeTermsModal} disabled={!isAgreed}>
              <Text style={[styles.closeButtonText, !isAgreed && styles.disabledText]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 428,
    height: 926,
    backgroundColor: "white",
    position: "relative",
    overflow: "hidden",
    alignItems: "center",
  },
  image: {
    width: 219,
    height: 250,
    position: "absolute",
    left: 83,
    top: 74,
  },
  blueBackground: {
    width: 420,
    height: 570,
    position: "absolute",
    left: 0,
    top: 300,
    backgroundColor: "#08026F",
    borderTopLeftRadius: 95,
  },
  title: {
    position: "absolute",
    top: 310,
    left: 129,
    fontSize: 36,
    fontWeight: "700",
    color: "#D6A73C",
    textAlign: "center",
  },
  subtitle: {
    position: "absolute",
    left: 35,
    top: 360,
    width: 321,
    textAlign: "center",
    color: "#D6A73C",
    fontSize: 16,
    fontWeight: "700",
  },
  textBold: {
    fontWeight: "600",
  },
  link: {
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  last_name: {
    position: "absolute",
    left: 17,
    top: 400,
    width: 168,
    height: 54,
    backgroundColor: "#D6A73C",
    borderRadius: 31,
    textAlign: "center",
    fontSize: 16,
    color: "#08026F",
  },
  first_name: {
    position: "absolute",
    right: 68,
    top: 400,
    width: 168,
    height: 54,
    backgroundColor: "#D6A73C",
    borderRadius: 31,
    textAlign: "center",
    fontSize: 16,
    color: "#08026F",
  },
  middle_initial: {
    position: "absolute",
    left: 17,
    top: 460,
    width: 168,
    height: 54,
    backgroundColor: "#D6A73C",
    borderRadius: 31,
    textAlign: "center",
    fontSize: 16,
    color: "#08026F",
  },
  student_id: {
    position: "absolute",
    right: 68,
    top: 460,
    width: 168,
    height: 54,
    backgroundColor: "#D6A73C",
    borderRadius: 31,
    textAlign: "center",
    fontSize: 16,
    color: "#08026F",
  },
  age: {
    position: "absolute",
    left: 17,
    top: 520,
    width: 346,
    height: 54,
    backgroundColor: "#D6A73C",
    borderRadius: 31,
    textAlign: "center",
    fontSize: 16,
    color: "#08026F",
  },
  birthdate: {
    position: "absolute",
    left: 17,
    top: 580,
    width: 346,
    height: 54,
    backgroundColor: "#D6A73C",
    borderRadius: 31,
    textAlign: "center",
    fontSize: 16,
    color: "#08026F",
  },
  password: {
    position: "absolute",
    left: 17,
    top: 640,
    width: 346,
    height: 54,
    backgroundColor: "#D6A73C",
    borderRadius: 31,
    textAlign: "center",
    fontSize: 16,
    color: "#08026F",
  },
  signupButton: {
    position: "absolute",
    width: 346,
    height: 54,
    backgroundColor: "#B27E08",
    borderRadius: 31,
    justifyContent: "center",
    alignItems: "center",
    top: 750, // Adjusted position
    left: 17,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#white",
  },
  termsText: {
    position: "absolute",
    top: 710, // Adjusted position to place it before the signup button
    left: 17,
    fontSize: 16,
    fontWeight: "700",
    color: "white",
    textDecorationLine: "underline",  // Adds the underline effect to make it look like a link
    textAlign: "center", // Centers the text horizontally
    width: 346,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 360,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    maxHeight: "80%",
  },
  termsTitle: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  termsContent: {
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkbox: {
    width: 15,
    height: 15,
    marginTop: -5,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkmark: {
    fontSize: 10,
  },
  checkboxLabel: {
    fontSize: 15,
    height: 25,
  },
  lightButton: {
     backgroundColor: "#FFD700",
  },
  darkButton: {
    backgroundColor: "#444",
  },
  closeButton: {
    backgroundColor: "#B27E08",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "black",
    fontWeight: "700",
  },
 
});

export default Register;
