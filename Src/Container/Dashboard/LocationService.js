
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

Geocoder.init("AIzaSyBqru7_H3BnbeURWSUclC24MSzk8zwhIeY", { language: "en" });

export async function getCurrentLocationWithAddress() {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) return null;

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Reverse Geocode
          const geoResponse = await Geocoder.from(latitude, longitude);

          // Filter results (ignore plus_code)
          const addressResult = geoResponse.results.find(
            (r) => r.formatted_address && !r.formatted_address.includes("+")
          );

          const address =
            addressResult?.formatted_address ||
            geoResponse.results?.[0]?.formatted_address ||
            "Address not found";
            console.log('address',address);
            

          resolve({
            coords: { latitude, longitude },
            address,
          });
        } catch (err) {
          reject({ code: "GEOCODER_ERROR", message: err.message });
        }
      },
      (error) => {
        reject({
          code: error.code,
          message: error.message,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 30000, // ⬆ increased
        maximumAge: 5000,
      }
    );
  });
}

