import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTheme } from "../navigations/ThemeProvider"; // Import theme management hook


const Create = ({ navigation }) => {
  const { isDarkMode } = useTheme(); // Use theme state to toggle dark mode

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#ffffff" },
      ]}
    >
      {/* Top Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: isDarkMode ? "#333333" : "#08026F" },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: isDarkMode ? "#D6A73C" : "#D6A73C" },
          ]}
        >
          Harmonisync
        </Text>
      </View>
      
      {/* Main Buttons */}
      <View style={styles.buttonsContainer}>
        <View
          style={[
            styles.button,
            { backgroundColor: isDarkMode ? "#444444" : "#D9D9D9" },
          ]}
        >
          <Image
            source={require("../assets/images/bulb.png")}
            style={styles.icon}
          />
          <Text
            style={[
              styles.generate,
              { color: isDarkMode ? "#D6A73C" : "#08026F" },
            ]}
          >
            Generate with AI
          </Text>
        </View>
        <View
          style={[
            styles.button,
            { backgroundColor: isDarkMode ? "#444444" : "#D9D9D9" },
          ]}
        >
          <Image
            source={require("../assets/images/addfile.png")}
            style={styles.icon}
          />
          <Text
            style={[
              styles.create,
              { color: isDarkMode ? "#D6A73C" : "#08026F" },
            ]}
          >
            Create New File
          </Text>
        </View>
        <View
          style={[
            styles.button,
            { backgroundColor: isDarkMode ? "#444444" : "#D9D9D9" },
          ]}
        >
          <Image
            source={require("../assets/images/wave.png")}
            style={styles.icon}
          />
          <Text
            style={[
              styles.compositions,
              { color: isDarkMode ? "#D6A73C" : "#08026F" },
            ]}
          >
            My Compositions
          </Text>
        </View>
        <View
          style={[
            styles.button,
            { backgroundColor: isDarkMode ? "#444444" : "#D9D9D9" },
          ]}
        >
          <Image
            source={require("../assets/images/upload.png")}
            style={styles.icon}
          />
          <Text
            style={[
              styles.upload,
              { color: isDarkMode ? "#D6A73C" : "#08026F" },
            ]}
          >
            Upload PDF
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "700",
    fontFamily: "Poppins",
    right: 55,
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginTop: 50,
  },
  button: {
    width: 160,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  generate: {
    fontSize: 15,
    fontFamily: "Poppins",
    fontWeight: "400",
    left: 15,
    top: -17,
  },
  create: {
    fontSize: 15,
    fontFamily: "Poppins",
    fontWeight: "400",
    left: 15,
    top: -17,
  },
  compositions: {
    fontSize: 15,
    fontFamily: "Poppins",
    fontWeight: "400",
    left: 15,
    top: -17,
  },
  upload: {
    fontSize: 15,
    fontFamily: "Poppins",
    fontWeight: "400",
    left: 15,
    top: -17,
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 5,
    right: 58,
    top: 10,
  },
});

export default Create;
