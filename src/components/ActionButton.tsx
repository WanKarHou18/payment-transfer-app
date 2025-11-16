// third party
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

//this project
import Colors from "../constants/Colors";
import BaseIcon from "./base_components/BaseIcon";
import BaseView from "./base_components/BaseView";

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
    <BaseView style={styles.actionButton}>
      <TouchableOpacity style={styles.actionButtonCircle} onPress={onPress}>
        <BaseIcon
          type="Ionicons"
          name={getIconName(icon)}
          size={24}
          color={Colors.white}
        />
      </TouchableOpacity>
      <Text style={styles.actionButtonLabel}>{label}</Text>
    </BaseView>
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
    backgroundColor: Colors.deepModerateBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonLabel: {
    fontSize: 12,
    color: Colors.darkCharcoal,
    fontWeight: "500",
  },
});

export default ActionButton;
