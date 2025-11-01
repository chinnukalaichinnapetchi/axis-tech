import React, { useState } from "react";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Dashboard from "../../Dashboard";

const Drawer = createDrawerNavigator();
const { width, height } = Dimensions.get("window");

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
  const [timesheetOpen, settimesheetOpen] = useState(false);
  const [PayrollOpen, setpayrollOpen] = useState(false);


  return (
    <DrawerContentScrollView>
      {/* <Text style={styles.header}>JK CAR CARE</Text> */}
      <Image
        source={require("../../../assets/axis_logo.png")} // <-- your logo here
        style={styles.logo}
        resizeMode="contain"
      />

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

      <TouchableOpacity
        style={styles.menuItemstyle}
        onPress={() => setpayrollOpen(!PayrollOpen)}
      >
        <View style={{ flexDirection: 'row' }}>
          <Ionicons name="document-text-outline" size={20} color={PayrollOpen ? "#594da1" : "#414141"}
          />
          <Text style={[styles.menuText, { color: PayrollOpen ? "#594da1" : "#414141" }]}
          >Payroll</Text>
        </View>
        <Ionicons
          name={PayrollOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={22}
          color={PayrollOpen ? "#594da1" : "#414141"}
        />
      </TouchableOpacity>
      {PayrollOpen && (
        <View style={styles.subMenu}>
          <SubMenuItem
            label="Payslip"
            onPress={() => navigation.navigate("Payroll")}
          />
        </View>
      )}
      {/* Timesheet */}
      <TouchableOpacity
        style={styles.menuItemstyle}
        onPress={() => settimesheetOpen(!timesheetOpen)}
      >
        <View style={{ flexDirection: 'row' }}>
          <Ionicons name="time-outline" size={20} color={timesheetOpen ? "#594da1" : "#414141"}
          />
          <Text style={[styles.menuText, { color: timesheetOpen ? "#594da1" : "#414141" }]}
          >Timesheet</Text>
        </View>
        <Ionicons
          name={timesheetOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={22}
          color={timesheetOpen ? "#594da1" : "#414141"}
        />
      </TouchableOpacity>
      {timesheetOpen && (
        <View style={styles.subMenu}>
          <SubMenuItem
            label="Timesheet"
            onPress={() => navigation.navigate("Timesheet")}
          />
          <SubMenuItem
            label="Manage leave"
            onPress={() => navigation.navigate("Timesheet")}
          />
          <SubMenuItem
            label="Attendance"
            onPress={() => navigation.navigate("Timesheet")}
          />
        </View>
      )}
      {/* Performance expandable */}
      <TouchableOpacity
        style={styles.menuItemstyle}
        onPress={() => setPerformanceOpen(!performanceOpen)}
      >
        <View style={{ flexDirection: 'row' }}>
          <Ionicons name="bar-chart-outline" size={20} color={performanceOpen ? "#594da1" : "#414141"}
          />
          <Text style={[styles.menuText, { color: performanceOpen ? "#594da1" : "#414141" }]}
          >Performance</Text>
        </View>
        <Ionicons
          name={performanceOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={22}
          color={performanceOpen ? "#594da1" : "#414141"}
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
      <Ionicons name={icon} size={20} color={active ? "#fff" : "#414141"} />
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
export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
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
const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 16,
    color: "#000000"
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  menuItemstyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    padding: 12,
  },
  activeMenu: {
    backgroundColor: "#6fd943",
    borderRadius: 8,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '500',
    color: "#414141"
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
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: "#6fd943",
    marginRight: 8,
  },
  subMenuText: {
    fontSize: 16,
    fontWeight: '400',
    color: "#414141"
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
  logo: {
    width: width * 0.8,
    height: height * 0.11,
    //alignSelf: "center",
    marginVertical: 15,
  },
});