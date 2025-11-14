import React from "react";
import { View, ViewProps, StyleProp, ViewStyle } from "react-native";

interface BaseViewProps extends ViewProps {
  /** Optional custom style */
  style?: StyleProp<ViewStyle>;
}

const BaseView: React.FC<BaseViewProps> = ({ children, style, ...rest }) => {
  return (
    <View style={style} {...rest}>
      {children}
    </View>
  );
};

export default BaseView;
