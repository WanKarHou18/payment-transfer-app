import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ActionButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
}

const ActionButton = ({ icon, label, onPress }: ActionButtonProps) => {
  const getIconName = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      scan: "scan-outline",
      add: "add",
      "arrow-down": "arrow-down",
      "arrow-forward": "arrow-forward",
    };
    return iconMap[iconName] || "help-outline";
  };

  return (
    <View style={styles.actionButton}>
      <TouchableOpacity style={styles.actionButtonCircle} onPress={onPress}>
        <Ionicons name={getIconName(icon)} size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.actionButtonLabel}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    alignItems: "center",
    gap: 8,
  },
  actionButtonCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0000FF",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonLabel: {
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
  },
});

export default ActionButton;
