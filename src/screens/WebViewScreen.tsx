// third party
import React from "react";
import { StyleSheet, StatusBar, Text, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

// this project
import { RootStackParamList } from "../navigation/AppNavigator";
import Colors from "../constants/Colors";
import BaseView from "../components/base_components/BaseView";
import BaseIcon from "../components/base_components/BaseIcon";

type WebViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "WebView"
>;
type WebViewScreenRouteProp = RouteProp<RootStackParamList, "WebView">;

interface Props {
  navigation: WebViewScreenNavigationProp;
  route: WebViewScreenRouteProp;
}

export default function WebViewScreen({ navigation, route }: Props) {
  // @ts-ignore
  const { url, title } = route.params;

  return (
    <BaseView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <BaseView style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <BaseIcon type="Ionicons" name="arrow-back" color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
      </BaseView>
      <WebView
        source={{ uri: url }}
        startInLoadingState
        style={styles.webview}
      />
    </BaseView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.darkGrey,
    backgroundColor: Colors.white,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  webview: {
    flex: 1,
  },
});
