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
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import Dashboard from "./Dashboard";
import Login from "./Login";
import Employee from "./Employee";
import Payroll from "./Payroll";
import Timesheet from "./Timesheet";
import Ticket from "./Ticket";
import Event from "./Event";

// Navigators
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Screen({ route }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.screenText}>{route.name} Screen</Text>
    </View>
  );
}

// Custom Drawer Content
function CustomDrawerContent({ navigation }) {
  const [performanceOpen, setPerformanceOpen] = useState(false);

  return (
    <DrawerContentScrollView>
      <Text style={styles.header}>JK CAR CARE</Text>

      {/* Dashboard */}
      <MenuItem
        label="Dashboard"
        icon="home-outline"
        onPress={() => navigation.navigate("Dashboard")}
      />

      {/* Employee */}
      <MenuItem
        label="Employee"
        icon="person-outline"
        onPress={() => navigation.navigate("Employee")}
      />

      {/* Payroll */}
      <MenuItem
        label="Payroll"
        icon="document-text-outline"
        active
        onPress={() => navigation.navigate("Payroll")}
      />

      {/* Timesheet */}
      <MenuItem
        label="Timesheet"
        icon="time-outline"
        onPress={() => navigation.navigate("Timesheet")}
      />

      {/* Performance expandable */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => setPerformanceOpen(!performanceOpen)}
      >
        <Ionicons name="bar-chart-outline" size={20} color="#5B21B6" />
        <Text style={[styles.menuText, { color: "#5B21B6" }]}>Performance</Text>
        <Ionicons
          name={performanceOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={18}
          color="#5B21B6"
        />
      </TouchableOpacity>

      {performanceOpen && (
        <View style={styles.subMenu}>
          <SubMenuItem
            label="Credit Letter"
            onPress={() => navigation.navigate("Credit Letter")}
          />
          <SubMenuItem
            label="Warning Letter"
            onPress={() => navigation.navigate("Warning Letter")}
          />
        </View>
      )}

      {/* Ticket */}
      <MenuItem
        label="Ticket"
        icon="ticket-outline"
        onPress={() => navigation.navigate("Ticket")}
      />

      {/* Event */}
      <MenuItem
        label="Event"
        icon="calendar-outline"
        onPress={() => navigation.navigate("Event")}
      />
    </DrawerContentScrollView>
  );
}

// Menu Item Component
function MenuItem({ label, icon, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.menuItem, active && styles.activeMenu]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={20} color={active ? "#fff" : "#374151"} />
      <Text style={[styles.menuText, active && { color: "#fff" }]}>{label}</Text>
    </TouchableOpacity>
  );
}

// SubMenu Item
function SubMenuItem({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.subMenuItem} onPress={onPress}>
      <View style={styles.dot} />
      <Text style={styles.subMenuText}>{label}</Text>
    </TouchableOpacity>
  );
}

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: true }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={Screen} />
      <Drawer.Screen name="Employee" component={Screen} />
      <Drawer.Screen name="Payroll" component={Screen} />
      <Drawer.Screen name="Timesheet" component={Screen} />
      <Drawer.Screen name="Credit Letter" component={Screen} />
      <Drawer.Screen name="Warning Letter" component={Screen} />
      <Drawer.Screen name="Ticket" component={Screen} />
      <Drawer.Screen name="Event" component={Screen} />
    </Drawer.Navigator>
  );
}

export default function RouteNavigation() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 16,
    color: "#111827",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  activeMenu: {
    backgroundColor: "#5B21B6",
    borderRadius: 8,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#374151",
  },
  subMenu: {
    paddingLeft: 30,
  },
  subMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#5B21B6",
    marginRight: 8,
  },
  subMenuText: {
    fontSize: 14,
    color: "#374151",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screenText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
