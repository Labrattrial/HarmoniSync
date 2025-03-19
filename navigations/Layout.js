import React from 'react';
import { View, StyleSheet } from 'react-native';

const Layout = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {children}  {/* The content above the footer will be injected here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginBottom: 60, 
  },
});

export default Layout;
