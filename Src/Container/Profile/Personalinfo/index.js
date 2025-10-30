import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Platform,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import ImagePicker from "react-native-image-crop-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
const PersonalInfo = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [editable, setEditable] = useState(false);
  const [originalData, setOriginalData] = useState({});

const  [userdata,setUserdata]=useState({})

     useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        const userData = userDataString ? JSON.parse(userDataString) : null;
        console.log('userData', userData);
              setOriginalData(userData); // Save original copy

        setUserdata(userData || {});
         setName(userData?.fullName || "");
      setEmail(userData?.employee_code || "");
      } catch (error) {
        console.log('Error reading userData from AsyncStorage', error);
      }
    };

    fetchUserData();
  }, [])
  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.7,
    })
      .then((image) => {
        setProfileImage(image.path);
      })
      .catch((error) => {
        console.log("Image pick cancelled", error);
      });
  };

  const handleSave = () => {
    console.log("Save Changes", { name, email, profileImage });
    setEditable(false); // disable editing after save
  };
const handleEditToggle = () => {
  if (editable) {
    // User clicked Close → revert to original data
    setName(originalData?.fullName || "");
    setEmail(originalData?.employee_code || "");
    setProfileImage(originalData?.profileImage || null); // if you save profileImage
  }
  setEditable(!editable);
};

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
       <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Information</Text>
        <TouchableOpacity onPress={() =>handleEditToggle()} style={styles.editBtn}>
          <Ionicons name={editable ? "close-outline" : "create-outline"} size={22} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Profile Image */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.profileImageWrapper}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Ionicons name="camera-outline" size={40} color="#888" />
          )}
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
                    editable={editable}

        />

        <Text style={styles.inputLabel}>Email / Employee Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email or employee code"
          value={email}
          onChangeText={setEmail}
                    editable={editable}

        />
      </View>

      {/* Save Button */}
            {editable && (

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
            )}
    </SafeAreaView>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === "android" ? 15 : 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backBtn: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  profileImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  inputContainer: {
    marginHorizontal: 20,
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
    marginTop: 15,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  saveButton: {
    backgroundColor: "#6CD34C",
    margin: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
