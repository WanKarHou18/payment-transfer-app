// third party
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";

// this project
import { RootStackParamList } from "../../navigation/AppNavigator";
import { sanitizeCashInput } from "../../helpers/DataHelper";

type TransferMoneyScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TransferMoney"
>;

interface Props {
  navigation: TransferMoneyScreenNavigationProp;
}

export default function TransferMoneyScreen({ navigation }: Props) {
  const quickAmounts = [50, 100, 500];

  const [selectedAmount, setSelectedAmount] = useState(0.0);

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
            <Text style={styles.label}>Enter Amount</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.currency}>RM</Text>
              <TextInput
                style={styles.input}
                value={selectedAmount.toString()}
                onChangeText={(text) => {
                  const finalNumber = sanitizeCashInput(text);
                  // @ts-ignore
                  setSelectedAmount(finalNumber);
                }}
                placeholder="0.00"
                keyboardType="decimal-pad"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.quickAmounts}>
              {quickAmounts?.map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={styles.quickButton}
                  onPress={() => {
                    setSelectedAmount(amount);
                  }}
                >
                  <Text style={styles.quickText}>RM {amount}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Transfer</Text>
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
    paddingTop: 20,
    backgroundColor: "#4158D0",
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
    color: "#fff",
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
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
  },
  label: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#0000FF",
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
    color: "#000",
  },
  quickAmounts: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 30,
  },
  quickButton: {
    flex: 1,
    backgroundColor: "#F5F5F7",
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
    backgroundColor: "#0000FF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
