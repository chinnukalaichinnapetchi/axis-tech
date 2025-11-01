import React, { useState,useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
  ScrollView,
  
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { postData } from "../../Api/apiService";
import Loader from "../../Components/Loader";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import AnimatedLoader from "../../Components/Loader";
const { width, height } = Dimensions.get("window");

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
 useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData) {
          navigation.replace("Main"); // replace so user can’t go back to login
        }
      } catch (error) {
        console.log("Error checking login status:", error);
      }
    };

    checkLoginStatus();
  }, [navigation]);

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email / User ID is required";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async() => {
   // navigation.navigate('Main')
    if (validate()) {
      setLoading(true)
     try {
      const res = await postData("/login_api?",{ email: email, password:password}); 
      console.log(res,'resresresresres');
      if(res.status===200){
        await AsyncStorage.setItem("token", res.accessToken);

        await AsyncStorage.setItem(
      'userData',
      JSON.stringify(res.userData),
    );
navigation.navigate('Main')
      }else{
        setLoading(false)
        Alert.alert("Error", "Invalid login, please try again");

      }
    } catch (err) {
      setLoading(false)
      console.error("Error fetching employees:", err.message);
    } finally {
      setLoading(false);
    }
  }
   
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* Header Text */}
        {/* <Text style={styles.header}>Login</Text> */}

        {/* Logo */}
        <ScrollView
      contentContainerStyle={{ flex: 1, justifyContent: "center" }}
     // keyboardShouldPersistTaps="handled"
    >

        <View  style={{flex:1,justifyContent:'center'}}>
        <Image
          source={require("../../assets/axis_logo.png")} // <-- your logo here
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.header}>Login</Text>
        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email / User ID</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Enter Email or User ID"
            placeholderTextColor="#888"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setErrors({ ...errors, email: null });
            }}
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          <Text style={styles.label}>Password</Text>
          {/* <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Enter Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrors({ ...errors, password: null });
            }}
            secureTextEntry
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )} */}
          <View style={styles.passinputContainer}>
      <TextInput
        style={[styles.passinput, errors.password && styles.passinputError]}
        placeholder="Enter Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrors({ ...errors, password: null });
        }}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
        style={styles.icon}
        onPress={() => setShowPassword(!showPassword)}
      >
        <Ionicons
          name={showPassword ? "eye-off" : "eye"}
          size={22}
          color="#666"
        />
      </TouchableOpacity>
      {errors.password && <Text style={styles.passerror}>{errors.password}</Text>}
    </View>
        </View>

        {/* Bottom Button */}
       
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
       <Loader visible={loading} message="Please wait..." />
       <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
}
export default Login;
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 0,
    color: "#000",
  },
  logo: {
    width: width * 0.9,
    height: height * 0.18,
    alignSelf: "center",
    marginVertical: 60,
  },
  inputContainer: {
    flex: 1,
    //height: 50,
    marginHorizontal:10,
     marginTop: 30,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#333",
  },
  input: {
    //backgroundColor: "#eaf0fb",
    borderRadius: 8,
    borderWidth:1,
    borderColor: "#ccc",
    padding: 14,
    fontSize: 16,
    marginBottom: 8,
  },
  inputError: {
    borderWidth: 1,
    borderColor: "red",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
  footer: {
    paddingBottom: 30,
    marginHorizontal:25,
  },
  button: {
    backgroundColor: "#0b0430",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  passinputContainer: {
    position: "relative",
    width: "100%",
    marginTop:10,
  
  },
  passinput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingRight: 40, // space for the eye icon
    fontSize: 16,
    color:'#000000'
  },
  passinputError: {
    borderColor: "red",
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 14,
  },
  passerror: {
    color: "red",
    marginTop: 5,
    fontSize: 13,
  },
});
