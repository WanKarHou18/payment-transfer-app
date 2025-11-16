// third party
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { StackNavigationProp } from "@react-navigation/stack";

// this project
import { RootStackParamList } from "../navigation/AppNavigator";
import { sanitizeCashInput } from "../helpers/DataHelper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransfer } from "../hooks/useTransfer";
import Colors from "../constants/Colors";
import SuccessModal from "../components/TransferSuccessModal";
import BaseAlert from "../components/base_components/BaseAlert";
import {
  authenticateFingerprint,
  isFingerprintAvailable,
} from "../helpers/FingerPrint";
import BaseLoader from "../components/base_components/BaseLoader";
import BaseIcon from "../components/base_components/BaseIcon";
import BaseView from "../components/base_components/BaseView";

type TransferMoneyScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TransferMoney"
>;

interface Props {
  navigation: TransferMoneyScreenNavigationProp;
}

export default function TransferMoneyScreen({ navigation }: Props) {
  const { topUpBalanceData, loading } = useTransfer();

  const quickAmounts = [50, 100, 500];
  const [selectedAmount, setSelectedAmount] = useState(0.0);
  const [modalVisible, setModalVisible] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const errorsChecking = () => {
    // If selected amount is 0 or null
    if (!selectedAmount || selectedAmount === 0 || selectedAmount === "0") {
      setAlertMessage("Transfer Amount cannot be empty");
      return true;
    }

    return false;
  };

  const handleTransfer = async () => {
    const errorOccured = errorsChecking();
    if (errorOccured) {
      setShowAlert(errorOccured);
      return;
    }
    const fingerprintAvailable = await isFingerprintAvailable();
    if (!fingerprintAvailable) {
      setShowAlert(true);
      setAlertMessage(
        "'Your device does not support fingerprint authentication or no fingerprint is enrolled"
      );
      return;
    }
    const success = await authenticateFingerprint();
    if (!success) {
      setShowAlert(true);
      setAlertMessage("Authentication Failed, Unable to confirm the payment.");
      return;
    }

    topUpBalanceData({ amount: selectedAmount });

    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {loading && <BaseLoader />}
      <LinearGradient
        colors={[Colors.moderateBlue, Colors.pinkPurple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <BaseView style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.backButton}
          >
            <BaseIcon type="Ionicons" name="arrow-back" color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Add Money</Text>
          <BaseView style={styles.placeholder} />
        </BaseView>

        <BaseView style={styles.content}>
          <BaseView style={styles.card}>
            <Text style={styles.label}>Enter Amount</Text>
            <BaseView style={styles.inputContainer}>
              <Text style={styles.currency}>RM</Text>
              <TextInput
                style={styles.input}
                value={selectedAmount.toString()}
                onChangeText={(text) => {
                  const finalNumber = sanitizeCashInput(text);
                  // @ts-ignore
                  setSelectedAmount(Number(finalNumber));
                }}
                placeholder="0.00"
                keyboardType="decimal-pad"
                placeholderTextColor={Colors.mediumGrey}
              />
            </BaseView>

            <BaseView style={styles.quickAmounts}>
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
            </BaseView>

            <TouchableOpacity style={styles.addButton} onPress={handleTransfer}>
              <Text style={styles.addButtonText}>Add Money</Text>
            </TouchableOpacity>
          </BaseView>
        </BaseView>
      </LinearGradient>
      <SuccessModal
        visible={modalVisible}
        message={`Top up successfully`}
        onClose={() => {
          navigation.navigate("Home");
          setModalVisible(false);
        }}
      />
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
    paddingTop: 20,
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
    color: Colors.grey,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: Colors.deepModerateBlue,
    paddingBottom: 10,
    marginBottom: 30,
  },
  currency: {
    fontSize: 32,
    fontWeight: "700",
    color: Colors.black,
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
    backgroundColor: Colors.offWhite,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  quickText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.darkCharcoal,
  },
  addButton: {
    backgroundColor: Colors.deepModerateBlue,
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
