import React from "react";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

// Only import the most commonly used icon libraries
const iconMap = {
  Ionicons,
  Feather
};

const AppIcon = ({ type = "Feather", name, size = 24, color = "#000", style }) => {
  const IconComponent = iconMap[type] || Feather;
  return <IconComponent name={name} size={size} color={color} style={style} />;
};

export default AppIcon;