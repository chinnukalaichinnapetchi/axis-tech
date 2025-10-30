import Geolocation from "react-native-geolocation-service";
import Geocoder from "react-native-geocoding";
import { PermissionsAndroid, Platform } from "react-native";

// Ask for location permission (Android only)
export async function requestLocationPermission() {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true; // iOS permissions handled automatically
}

// Get current location + address
export async function getCurrentLocationWithAddress() {
  // ✅ Initialize Geocoder with your API key AIzaSyAr9OUFvBumclPhr9_4ftUpRYtcfTRvfUI
  // Geocoder.init("AIzaSyAnEBo1d_9eSFaZbsXSn9S0S0ZRDM_9Sd8", { language: "en" });
   Geocoder.init("AIzaSyAr9OUFvBumclPhr9_4ftUpRYtcfTRvfUI", { language: "en" });


  const hasPermission = await requestLocationPermission();
  if (!hasPermission) return null;

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // ✅ Use lat/lng instead of hardcoded "Eiffel Tower"
          const geoResponse = await Geocoder.from(latitude, longitude);

          const address = geoResponse.results[0].formatted_address;

          resolve({ latitude, longitude, address });
        } catch (err) {
          reject(err);
        }
      },
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
}
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { getCurrentLocationWithAddress } from "./LocationService";

export default function App() {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  const handleCheckIn = async () => {
    try {
      const location = await getCurrentLocationWithAddress();
      if (location) setCheckIn(location);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckOut = async () => {
    try {
      const location = await getCurrentLocationWithAddress();
      if (location) setCheckOut(location);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Check-In" onPress={handleCheckIn} />
      {checkIn && (
        <Text style={styles.text}>
          ✅ Checked In:{"\n"}
          Lat: {checkIn.latitude}, Lon: {checkIn.longitude}{"\n"}
          📍 {checkIn.address}
        </Text>
      )}

      <Button title="Check-Out" onPress={handleCheckOut} />
      {checkOut && (
        <Text style={styles.text}>
          ✅ Checked Out:{"\n"}
          Lat: {checkOut.latitude}, Lon: {checkOut.longitude}{"\n"}
          📍 {checkOut.address}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { marginTop: 10, fontSize: 16, textAlign: "center" },
});


//AIzaSyBqru7_H3BnbeURWSUclC24MSzk8zwhIeY