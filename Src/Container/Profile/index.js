import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
  const [activeItem, setActiveItem] = useState(null);

  const handlePress = async item => {
    setActiveItem(item);
    if (item === 'Logout') {
      await AsyncStorage.setItem('userData', '');
        await AsyncStorage.setItem("token", '');

      navigation.navigate('Login');
    }else{
    navigation.navigate(item);

    }
  };

  const handleLogout = () => {
    console.log('Logged Out');
    // Add your logout logic here, e.g., clear AsyncStorage and navigate to login screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 22 }} /> 
        {/* spacer for alignment */}
      </View>

      {/* Main content */}
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        {/* Card with shadow */}
        <View style={styles.card}>
          {/* Personal Info */}
          <TouchableOpacity
            style={[
              styles.item,
              activeItem === 'PersonalInfo' && styles.activeItem,
            ]}
            onPress={() => handlePress('PersonalInfo')}
          >
            <View style={styles.itemLeft}>
              <Ionicons
                name="person-circle-outline"
                size={22}
                color={activeItem === 'PersonalInfo' ? '#fff' : '#555'}
                style={styles.leftIcon}
              />
              <Text
                style={[
                  styles.itemText,
                  activeItem === 'PersonalInfo' && styles.activeText,
                ]}
              >
                Personal Info
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={activeItem === 'PersonalInfo' ? '#fff' : '#999'}
            />
          </TouchableOpacity>

          {/* Separator */}
          <View style={styles.separator} />

          {/* Change Password */}
          <TouchableOpacity
            style={[
              styles.item,
              activeItem === 'ChangePassword' && styles.activeItem,
            ]}
            onPress={() => handlePress('ChangePassword')}
          >
            <View style={styles.itemLeft}>
              <Ionicons
                name="lock-closed-outline"
                size={22}
                color={activeItem === 'ChangePassword' ? '#fff' : '#555'}
                style={styles.leftIcon}
              />
              <Text
                style={[
                  styles.itemText,
                  activeItem === 'ChangePassword' && styles.activeText,
                ]}
              >
                Change Password
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={activeItem === 'ChangePassword' ? '#fff' : '#999'}
            />
          </TouchableOpacity>
          <View style={styles.separator} />

          <TouchableOpacity
            style={[
              styles.item,
              { backgroundColor: activeItem === 'Logout' ? 'red' : '#fff' }
            ]}
            onPress={() => handlePress('Logout')}
          >
            <View style={styles.itemLeft}>
              <Ionicons
                name="log-out-outline"
                size={22}
                color={activeItem === 'Logout' ? '#fff' : '#555'}
                style={styles.leftIcon}
              />
              <Text
                style={[
                  styles.itemText,
                  activeItem === 'Logout' && styles.activeText,
                ]}
              >
                Log Out
              </Text>
            </View>
            {/* <Ionicons
              name="chevron-forward"
              size={20}
              color={activeItem === "ChangePassword" ? "#fff" : "#999"}
            /> */}
          </TouchableOpacity>
        </View>

        {/* Log Out Button
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <View style={styles.logoutContent}>
            <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 10 }} />
            <Text style={styles.logoutText}>Log Out</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'android' ? 15 : 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backBtn: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  card: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 15,
  },
  activeItem: {
    backgroundColor: '#6CD34C',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  activeText: {
    color: '#fff',
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginLeft: 50,
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
