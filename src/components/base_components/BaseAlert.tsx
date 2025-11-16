import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import Colors from "../../constants/Colors";
import BaseIcon from "./BaseIcon";

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
      <BaseIcon
        type="Ionicons"
        name={getIcon()}
        size={20}
        color={Colors.white}
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
    width: "85%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    zIndex: 1000,
    elevation: 1000,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  text: {
    color: Colors.white,
    fontSize: 15,
    flex: 1,
  },
});
