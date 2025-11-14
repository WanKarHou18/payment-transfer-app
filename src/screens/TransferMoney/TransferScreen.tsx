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

// this project
import { RootStackParamList } from "../../navigation/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";

type TransferScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Transfer"
>;

interface Props {
  navigation: TransferScreenNavigationProp;
}

export default function TransferScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={["#4158D0", "#C850C0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Transfer Money</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Recipient</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number or account"
              placeholderTextColor="#999"
            />

            {/* <Text style={styles.sectionTitle}>Amount</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currency}>RM</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                keyboardType="decimal-pad"
                placeholderTextColor="#999"
              />
            </View> */}

            <Text style={styles.sectionTitle}>Note (Optional)</Text>
            <TextInput
              style={[styles.input, styles.noteInput]}
              placeholder="Add a note"
              placeholderTextColor="#999"
              multiline
            />

            <TouchableOpacity
              style={styles.transferButton}
              onPress={() => {
                navigation.navigate("TransferMoney");
              }}
            >
              <Text style={styles.transferButtonText}>Proceed</Text>
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
    backgroundColor: "#4158D0",
  },

  gradient: {
    flex: 1,
    paddingTop: 10,
  },

  /* ===== HEADER ===== */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  backButton: {
    padding: 6,
  },

  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },

  placeholder: {
    width: 24, // balances arrow icon
  },

  /* ===== CONTENT ===== */
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
    marginTop: 10,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
  },

  /* ===== INPUTS ===== */
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#333",
    backgroundColor: "#fafafa",
  },

  noteInput: {
    height: 80,
    textAlignVertical: "top",
    paddingTop: 12,
  },

  /* ===== AMOUNT ===== */
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fafafa",
    borderRadius: 10,
    height: 48,
    marginTop: 10,
    paddingHorizontal: 12,
  },

  currency: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
    color: "#444",
  },

  amountInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
  },

  /* ===== BUTTON ===== */
  transferButton: {
    backgroundColor: "#4158D0",
    paddingVertical: 14,
    marginTop: 30,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#4158D0",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },

  transferButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
