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
import * as Contacts from "expo-contacts";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// this project
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useTransfer } from "../../hooks/useTransfer";
import Colors from "../../constants/Colors";
import BaseAlert from "../../components/base_components/BaseAlert";
import BaseIcon from "../../components/base_components/BaseIcon";
import ContactListModal from "../../components/ContactListModal";
import BaseView from "../../components/base_components/BaseView";

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

  const [contactsList, setContactsList] = useState([]);
  const [showContactsModal, setShowContactsModal] = useState(false);

  const errorsChecking = () => {
    // empty recipient name
    if (!recipientName) {
      setAlertMessage("Recipient Name cannot be empty");
      return true;
    }

    return false;
  };

  const pickContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Cannot access contacts.");
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Name],
    });

    if (!data || data.length === 0) {
      Alert.alert("No Contacts", "Your contact list is empty.");
      return;
    }

    setContactsList(data);
    setShowContactsModal(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[Colors.deepModerateBlue, Colors.pinkPurple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <BaseView style={styles.header}>
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
            <BaseIcon type="Ionicons" name="arrow-back" color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Transfer Money</Text>
          <BaseView style={styles.placeholder} />
        </BaseView>

        <BaseView style={styles.content}>
          <BaseView style={styles.card}>
            <Text style={styles.sectionTitle}>
              Recipient
              <Text style={{ color: Colors.red }}> *</Text>
            </Text>

            <BaseView style={styles.contactRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                value={recipientName}
                onChangeText={setRecipientName}
                placeholder="Enter recipient name"
                placeholderTextColor={Colors.grey}
              />

              <TouchableOpacity
                style={styles.contactButton}
                onPress={pickContact}
              >
                <BaseIcon type="Ionicons" name="person" color={Colors.white} />
              </TouchableOpacity>
            </BaseView>

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
          </BaseView>
        </BaseView>
      </LinearGradient>
      <BaseAlert
        visible={showAlert}
        type="error"
        message={alertMessage}
        onHide={() => setShowAlert(false)}
      />
      <ContactListModal
        visible={showContactsModal}
        contacts={contactsList}
        onSelect={(contact) => {
          setRecipientName(contact.name);
          setShowContactsModal(false);
        }}
        onClose={() => setShowContactsModal(false)}
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
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.black,
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
    borderColor: Colors.lightGey,
    backgroundColor: Colors.offWhite,
    borderRadius: 10,
    height: 48,
    marginTop: 10,
    paddingHorizontal: 12,
  },

  currency: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
    color: Colors.darkCharcoal,
  },

  amountInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: Colors.darkCharcoal,
  },

  /* ===== BUTTON ===== */
  transferButton: {
    backgroundColor: Colors.moderateBlue,
    paddingVertical: 14,
    marginTop: 30,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: Colors.moderateBlue,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },

  transferButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  contactButton: {
    marginLeft: 10,
    backgroundColor: Colors.moderateBlue,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
});
