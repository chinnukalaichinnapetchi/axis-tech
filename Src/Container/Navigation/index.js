import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import 'react-native-reanimated';
import DrawerNavigation from "./DrawerNavigation";
import Login from "../Login";
import Dashboard from "../Dashboard"
import Profile from "../Profile";
import PersonalInfo from "../Profile/Personalinfo";
import ChangePassword from "../Profile/Changepassword";
// Navigators
const Stack = createNativeStackNavigator();


export default function RouteNavigation() {
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <StatusBar
    //     barStyle="dark-content"
    //     backgroundColor="transparent"
    //     translucent={true}
    //   />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={DrawerNavigation}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ headerShown: false }}
          />
          
           <Stack.Screen
            name="PersonalInfo"
            component={PersonalInfo}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ headerShown: false }}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    // </SafeAreaView>
  );
}


