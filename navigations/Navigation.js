import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the Icon component

import Getstartedscreen from '../screens/Getstartedscreen';
import Homescreen from '../screens/Homescreen';
import Loginscreen from '../screens/Loginscreen';
import Registrationscreen from '../screens/Registrationscreen';
import Profilescreen from '../screens/Profile';
import Create from '../screens/Create';
import MusicSheetViewer from "../screens/MusicSheetViewer";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#08026F', // Footer background color
        },
        tabBarActiveTintColor: '#D6A73C', // Color for the selected tab
        tabBarInactiveTintColor: 'white', // Color for the unselected tabs (optional)
      }}
    >
      <Tab.Screen
        name="Home"
        component={Homescreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={Create}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({ color, size }) => (
            <Icon name="create" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profilescreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted">
        <Stack.Screen
          name="GetStarted"
          component={Getstartedscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Loginscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Registrationscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Create"
          component={Create}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={HomeTabs} // Now we're using the BottomTabNavigator
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MusicSheet"
          component={MusicSheetViewer} // Now we're using the BottomTabNavigator
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
