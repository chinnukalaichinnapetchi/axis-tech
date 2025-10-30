import React from "react";
import { View, Text, TouchableOpacity, Platform, StyleSheet } from "react-native";
import AppIcon from "../AppIcon";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === "android" ? 15 : 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000"
  }
});

const CustomHeader = ({ username, onMenuPress, onProfilePress }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onMenuPress}>
      <AppIcon type="Feather" name="menu" size={28} color="#000" />
    </TouchableOpacity>
    <Text style={styles.title}>{username}</Text>
    <TouchableOpacity onPress={onProfilePress}>
      <AppIcon type="Ionicons" name="person-circle" size={32} color="#54c747" />
    </TouchableOpacity>
  </View>
);

export default CustomHeader;
