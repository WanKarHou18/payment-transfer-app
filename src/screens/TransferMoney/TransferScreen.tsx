import React, { useState } from "react";
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

import { RootStackParamList } from "../../navigation/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransfer } from "../../hooks/useTransfer";
import Colors from "../../constants/Colors";
import BaseAlert from "../../components/base_components/BaseAlert";

type TransferScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Transfer"
>;

interface Props {
  navigation: TransferScreenNavigationProp;
}

export default function TransferScreen({ navigation }: Props) {
  const { updateTransferDetailData, transfer } = useTransfer();

  console.log("T transfer", transfer);
  const [recipientName, setRecipientName] = useState(transfer?.recipientName);
  const [note, setNote] = useState(transfer?.note);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const errorsChecking = () => {
    // empty recipient name
    if (!recipientName) {
      setAlertMessage("Recipient Name cannot be empty");
      return true;
    }

    return false;
  };

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
            onPress={() => {
              setRecipientName("");
              setNote("");
              updateTransferDetailData({
                amount: 0,
                recipientName: "",
                note: "",
              });
              navigation.goBack();
            }}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Transfer Money</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              Recipient
              <Text style={{ color: "red" }}> *</Text>
            </Text>
            <TextInput
              style={styles.input}
              value={recipientName}
              onChangeText={setRecipientName} // simpler
              placeholder="Enter recipient name"
              placeholderTextColor={Colors.grey}
            />

            <Text style={styles.sectionTitle}>Note (Optional)</Text>
            <TextInput
              style={[styles.input, styles.noteInput]}
              value={note}
              onChangeText={setNote} // simpler
              placeholder="Add a note"
              placeholderTextColor={Colors.grey}
              multiline
            />

            <TouchableOpacity
              style={styles.transferButton}
              onPress={() => {
                const errorOccured = errorsChecking();
                if (errorOccured) {
                  setShowAlert(errorOccured);
                  return;
                }
                updateTransferDetailData({
                  ...transfer,
                  recipientName,
                  note,
                });
                navigation.navigate("TransferMoney");
              }}
            >
              <Text style={styles.transferButtonText}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <BaseAlert
        visible={showAlert}
        type="error"
        message={alertMessage}
        onHide={() => setShowAlert(false)}
      />
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
    color: Colors.white,
  },

  placeholder: {
    width: 24,
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
