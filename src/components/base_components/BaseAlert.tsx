import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";

interface BaseAlertProps {
  message: string;
  type: "error" | "warning";
  visible: boolean;
  duration?: number;
  onHide?: () => void;
}

export default function BaseAlert({
  message,
  type,
  visible,
  duration = 3000,
  onHide,
}: BaseAlertProps) {
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 50, // slide down slightly from top
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }).start(() => onHide && onHide());
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const getBackgroundColor = () => {
    switch (type) {
      case "error":
        return Colors.error;
      case "warning":
        return Colors.warning;
      default:
        return Colors.grey;
    }
  };

  const getIcon = () => {
    switch (type) {
      case "error":
        return "close-circle";
      case "warning":
        return "warning";
      default:
        return "alert-circle";
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <Ionicons
        name={getIcon()}
        size={20}
        color="#fff"
        style={{ marginRight: 8 }}
      />
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
    width: "85%", // smaller box width
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    zIndex: 1000,
    elevation: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  text: {
    color: "#fff",
    fontSize: 15,
    flex: 1,
  },
});
