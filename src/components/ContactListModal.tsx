import React from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import BaseIcon from "./base_components/BaseIcon";
import Colors from "../constants/Colors";

interface Contact {
  id: string;
  name: string;
}

interface ContactListModalProps {
  visible: boolean;
  contacts: Contact[];
  onSelect: (contact: Contact) => void;
  onClose: () => void;
}

export default function ContactListModal({
  visible,
  contacts,
  onSelect,
  onClose,
}: ContactListModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* Blur background */}
      <BlurView intensity={30} tint="dark" style={styles.modalBackdrop}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Recipient</Text>

          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            style={{ maxHeight: 350 }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.contactItem}
                onPress={() => onSelect(item)}
              >
                <BaseIcon
                  type="Ionicons"
                  name="person-circle"
                  color={Colors.grey}
                  size={26}
                />
                <Text style={styles.contactName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  //Modal Backdrop + Modal Container
  contactName: {
    marginLeft: 12,
    fontSize: 16,
    color: Colors.darkCharcoal,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    maxHeight: "70%",
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 15,

    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  //Modal Title
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 15,
    color: Colors.darkCharcoal,
  },
  //Contact List Item
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGey,
  },
  //Cancel Button
  closeBtn: {
    marginTop: 15,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    backgroundColor: "#ddd",
  },
  closeText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.grey,
  },
});
