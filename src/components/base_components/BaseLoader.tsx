import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import Colors from "../../constants/Colors";

interface BaseLoaderProps {
  text?: string;
}

const BaseLoader: React.FC<BaseLoaderProps> = ({ text }) => {
  return (
    <View style={styles.overlay}>
      <BlurView intensity={50} style={styles.blur}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={80} color={Colors.deepModerateBlue} />
          {text && <Text style={styles.text}>{text}</Text>}
        </View>
      </BlurView>
    </View>
  );
};

export default BaseLoader;

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  blur: {
    position: "absolute",
    top: 0,
    left: 0,
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "600",
    color: Colors.white,
  },
});
