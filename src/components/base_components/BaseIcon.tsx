import React from "react";
import { ViewStyle, StyleProp } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Colors = {
  darkGrey: "#333",
  primary: "#4158D0",
};

type IconType = "Ionicons" | "MaterialIcons" | "FontAwesome" | "Entypo";

interface BaseIconProps {
  /** Which icon library to use */
  type: IconType;

  /** Name of the icon */
  name: string;

  /** Size of the icon */
  size?: number;

  /** Color of the icon */
  color?: string;

  /** Optional style */
  style?: StyleProp<ViewStyle>;
}

const BaseIcon: React.FC<BaseIconProps> = ({
  type = "Ionicons",
  name,
  size = 24,
  color = Colors.darkGrey,
  style,
}) => {
  switch (type) {
    case "Ionicons":
      return (
        <Ionicons name={name as any} size={size} color={color} style={style} />
      );
    case "MaterialIcons":
      return (
        <MaterialIcons
          name={name as any}
          size={size}
          color={color}
          style={style}
        />
      );
    case "FontAwesome":
      return (
        <FontAwesome
          name={name as any}
          size={size}
          color={color}
          style={style}
        />
      );
    case "Entypo":
      return (
        <Entypo name={name as any} size={size} color={color} style={style} />
      );
    default:
      return null;
  }
};

export default BaseIcon;
export { Colors };
