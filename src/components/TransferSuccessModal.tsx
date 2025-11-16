import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { BlurView } from "expo-blur";
import Colors from "../constants/Colors";
import BaseIcon from "./base_components/BaseIcon";

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  message?: string;
}

export default function SuccessModal({
  visible,
  onClose,
  message = "Transfer completed successfully!",
}: SuccessModalProps) {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible]);

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Full-screen blur overlay */}
      <BlurView intensity={100} tint="dark" style={styles.fullscreenBlur}>
        <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
          <BaseIcon
            type="Ionicons"
            name="checkmark-circle"
            size={80}
            color={Colors.success}
          />
          <Text style={styles.title}>Success!</Text>
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </Animated.View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenBlur: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: Colors.offWhite,
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 15,
    color: Colors.darkCharcoal,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.grey,
    marginVertical: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: Colors.success,
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 25,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 16,
  },
});
