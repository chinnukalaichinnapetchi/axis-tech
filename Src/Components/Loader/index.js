
import React from "react";
import { View, ActivityIndicator, StyleSheet, Modal, Text } from "react-native";

const Loader = ({ visible, message = "Loading..." }) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FF6B00" />
        <Text style={styles.text}>{message}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 15,
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
});

export default Loader;

// AnimatedLoader.js
// import React, { useRef, useEffect } from "react";
// import { View, Animated, StyleSheet, Modal, Text } from "react-native";

// const AnimatedLoader = ({ visible, message = "Loading..." }) => {
//   const dot1 = useRef(new Animated.Value(0)).current;
//   const dot2 = useRef(new Animated.Value(0)).current;
//   const dot3 = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     const animate = (dot, delay) => {
//       return Animated.loop(
//         Animated.sequence([
//           Animated.timing(dot, {
//             toValue: -10,
//             duration: 400,
//             delay,
//             useNativeDriver: true,
//           }),
//           Animated.timing(dot, {
//             toValue: 0,
//             duration: 400,
//             useNativeDriver: true,
//           }),
//         ])
//       );
//     };

//     animate(dot1, 0).start();
//     animate(dot2, 200).start();
//     animate(dot3, 400).start();
//   }, [dot1, dot2, dot3]);

//   return (
//     <Modal transparent animationType="fade" visible={visible}>
//       <View style={styles.container}>
//         <View style={styles.loaderRow}>
//           <Animated.View style={[styles.dot, { transform: [{ translateY: dot1 }] }]} />
//           <Animated.View style={[styles.dot, { transform: [{ translateY: dot2 }] }]} />
//           <Animated.View style={[styles.dot, { transform: [{ translateY: dot3 }] }]} />
//         </View>
//         <Text style={styles.text}>{message}</Text>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loaderRow: {
//     flexDirection: "row",
//     alignItems: "flex-end",
//   },
//   dot: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     backgroundColor: "#FF6B00",
//     marginHorizontal: 5,
//   },
//   text: {
//     marginTop: 20,
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "600",
//   },
// });

// export default AnimatedLoader;
