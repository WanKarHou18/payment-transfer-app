// third party
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

// this project
import { RootStackParamList } from "../navigation/AppNavigator";
import Colors from "../constants/Colors";

type AddMoneyScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddMoney"
>;

interface Props {
  navigation: AddMoneyScreenNavigationProp;
}

export default function AddMoneyScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[Colors.moderateBlue, Colors.pinkPurple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Add Money</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.label}>Enter Amount</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.currency}>RM</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="decimal-pad"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.quickAmounts}>
              <TouchableOpacity style={styles.quickButton}>
                <Text style={styles.quickText}>RM 50</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickButton}>
                <Text style={styles.quickText}>RM 100</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quickButton}>
                <Text style={styles.quickText}>RM 500</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Money</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.moderateBlue,
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "600",
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 25,
  },
  label: {
    fontSize: 16,
    color: Colors.darkGrey,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: Colors.moderateBlue,
    paddingBottom: 10,
    marginBottom: 30,
  },
  currency: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 32,
    fontWeight: "700",
    color: Colors.black,
  },
  quickAmounts: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 30,
  },
  quickButton: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  quickText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  addButton: {
    backgroundColor: Colors.moderateBlue,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
