import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import ActionButton from "../components/ActionButton";
import Colors from "../constants/Colors";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[Colors.moderateBlue, Colors.pinkPurple]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>GR</Text>
            </View>

            <TouchableOpacity style={styles.askRytButton}>
              <Ionicons name="sparkles" size={16} color={Colors.white} />
              <Text style={styles.askRytText}>Ask Ryt AI</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Ionicons
                name="notifications-outline"
                size={24}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>

          {/* Balance Card */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Total balance</Text>
              <Ionicons name="chevron-down" size={16} color={Colors.darkGrey} />
            </View>

            <View style={styles.balanceAmount}>
              <Text style={styles.amount}>RM 10,345.93</Text>
              <Ionicons
                name="eye-outline"
                size={20}
                color="#666"
                style={styles.eyeIcon}
              />
            </View>

            <View style={styles.interestRow}>
              <Text style={styles.interestLabel}>Interest earned</Text>
              <Text style={styles.interestAmount}>+RM 12.58</Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <ActionButton
                icon="add"
                label="Add money"
                onPress={() => navigation.navigate("AddMoney")}
              />
              <ActionButton
                icon="arrow-forward"
                label="Transfer"
                onPress={() => navigation.navigate("Transfer")}
              />
            </View>
          </View>

          {/* Promotional Cards */}
          <View style={styles.promoContainer}>
            {/* PayLater Card */}
            <View style={[styles.promoCard, styles.promoCardLeft]}>
              <Text style={styles.promoTitle}>Ryt PayLater</Text>
              <Text style={styles.promoDescription}>
                Enjoy 1.2% cashback{"\n"}on QR payments
              </Text>
              <View style={styles.promoIcon}>
                <View style={styles.iconCard}>
                  <Text style={styles.iconText}>QR</Text>
                </View>
                <Text style={styles.rmText}>RM</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.promoLink}>Apply now &gt;</Text>
              </TouchableOpacity>
            </View>

            {/* Savings Card */}
            <View style={[styles.promoCard, styles.promoCardRight]}>
              <View style={styles.coinsIcon}>
                <Text style={styles.coinsEmoji}>💰</Text>
                <Text style={styles.rmBadge}>RM</Text>
              </View>
              <Text style={styles.promoDescription}>
                Earn up to 4% p.a.,{"\n"}paid every day
              </Text>
              <TouchableOpacity>
                <Text style={styles.promoLink}>Learn more &gt;</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Accounts Section */}
          <View style={styles.accountsSection}>
            <Text style={styles.accountsTitle}>Accounts</Text>

            <View style={styles.accountCard}>
              <View style={styles.accountLeft}>
                <View style={styles.rytLogo}>
                  <Text style={styles.rytLogoText}>Ryt</Text>
                </View>
                <Text style={styles.accountName}>Main Account</Text>
              </View>

              <View style={styles.accountRight}>
                <Text style={styles.accountBalance}>RM 5,000.00</Text>
                <View style={styles.interestBadge}>
                  <Text style={styles.interestBadgeText}>3.00% p.a.</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
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
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.darkGrey,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  askRytButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.darkGrey,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
    flex: 1,
    marginHorizontal: 15,
    justifyContent: "center",
  },
  askRytText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "500",
  },
  balanceCard: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 15,
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 25,
  },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  balanceLabel: {
    fontSize: 14,
    color: Colors.grey,
    marginRight: 5,
  },
  balanceAmount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  amount: {
    fontSize: 36,
    fontWeight: "700",
    color: Colors.black,
    marginRight: 10,
  },
  eyeIcon: {
    marginLeft: 5,
  },
  interestRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  interestLabel: {
    fontSize: 13,
    color: "#666",
    marginRight: 5,
  },
  interestAmount: {
    fontSize: 13,
    color: Colors.leafGreen,
    fontWeight: "600",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  promoContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 15,
    marginTop: 20,
  },
  promoCard: {
    flex: 1,
    borderRadius: 15,
    padding: 18,
    minHeight: 200,
    justifyContent: "space-between",
  },
  promoCardLeft: {
    backgroundColor: "#D4F4F4",
  },
  promoCardRight: {
    backgroundColor: "#E8F5E8",
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.black,
    marginBottom: 8,
  },
  promoDescription: {
    fontSize: 14,
    color: Colors.darkCharcoal,
    lineHeight: 20,
    marginBottom: 10,
  },
  promoIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  iconCard: {
    width: 50,
    height: 35,
    backgroundColor: Colors.white,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.deepModerateBlue,
  },
  iconText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.deepModerateBlue,
  },
  rmText: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.deepModerateBlue,
  },
  coinsIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 15,
  },
  coinsEmoji: {
    fontSize: 32,
  },
  rmBadge: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.deepModerateBlue,
    backgroundColor: Colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  promoLink: {
    fontSize: 14,
    color: "#0000FF",
    fontWeight: "600",
  },
  accountsSection: {
    paddingHorizontal: 20,
    marginTop: 30,
    paddingBottom: 30,
  },
  accountsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 15,
  },
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
  },
  accountLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rytLogo: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: Colors.deepModerateBlue,
    alignItems: "center",
    justifyContent: "center",
  },
  rytLogoText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
  accountName: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.black,
  },
  accountRight: {
    alignItems: "flex-end",
  },
  accountBalance: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.black,
    marginBottom: 5,
  },
  interestBadge: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  interestBadgeText: {
    fontSize: 11,
    color: Colors.deepModerateBlue,
    fontWeight: "600",
  },
});
