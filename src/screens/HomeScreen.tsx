// third party
import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";

// this project
import ActionButton from "../components/ActionButton";
import Colors from "../constants/Colors";
import BaseView from "../components/base_components/BaseView";
import BaseIcon from "../components/base_components/BaseIcon";
import { useTransfer } from "../hooks/useTransfer";
import { formatCurrency } from "../helpers/DataHelper";
import BaseLoader from "../components/base_components/BaseLoader";
import { TextFontSize } from "../constants/TextFontSize";
import { Link } from "../constants/Link";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  const {
    accountInformation,
    fetchAccountInformationData,
    transfer,
    updateTransferDetailData,
    loading,
  } = useTransfer();
  console.log("HS transfer", transfer);

  useEffect(() => {
    fetchAccountInformationData();
  }, []);

  useEffect(() => {
    console.log("accountInformation", accountInformation);
  }, [accountInformation]);

  const renderTransactionItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        updateTransferDetailData(item);
        navigation.navigate("Transfer");
      }}
    >
      <BaseView style={styles.accountCard}>
        {/* LEFT SIDE */}
        <BaseView style={styles.accountLeft}>
          <BaseView style={styles.rytLogo}>
            <Text style={styles.rytLogoText}>Ryt</Text>
          </BaseView>

          <BaseView>
            <Text style={styles.accountName}>{item.recipientName}</Text>
            {item.note ? <Text>{item.note}</Text> : null}
          </BaseView>
        </BaseView>

        {/* RIGHT SIDE */}
        <BaseView style={styles.accountRight}>
          <Text style={styles.accountBalance}>
            RM {item?.amount ? item?.amount : 0}
          </Text>
        </BaseView>
      </BaseView>
    </TouchableOpacity>
  );

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
          {loading && <BaseLoader />}
          {/* Header */}
          <BaseView style={styles.header}>
            <BaseView style={styles.avatar}>
              <Text style={styles.avatarText}>GR</Text>
            </BaseView>

            <TouchableOpacity style={styles.askRytButton}>
              <BaseIcon
                type="Ionicons"
                name="sparkles"
                size={16}
                color={Colors.white}
              />
              <Text style={styles.askRytText}>Ask Ryt AI</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <BaseIcon
                type="Ionicons"
                name="notifications-outline"
                color={Colors.white}
              />
            </TouchableOpacity>
          </BaseView>

          {/* Balance Card */}
          <BaseView style={styles.balanceCard}>
            <BaseView style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Total balance</Text>
              <BaseIcon
                type="Ionicons"
                name="chevron-down"
                size={16}
                color={Colors.darkGrey}
              />
            </BaseView>

            <BaseView style={styles.balanceAmount}>
              <Text style={styles.amount}>
                RM{" "}
                {accountInformation?.balance
                  ? formatCurrency(accountInformation?.balance)
                  : 0.0}
              </Text>
              <BaseIcon
                type="Ionicons"
                name="eye-outline"
                size={20}
                color={Colors.black}
                style={styles.eyeIcon}
              />
            </BaseView>

            <BaseView style={styles.interestRow}>
              <Text style={styles.interestLabel}>Interest earned</Text>
              <Text style={styles.interestAmount}>+RM 12.58</Text>
            </BaseView>

            {/* Action Buttons */}
            <BaseView style={styles.actionButtons}>
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
            </BaseView>
          </BaseView>

          {/* Promotional Cards */}
          <BaseView style={styles.promoContainer}>
            {/* PayLater Card */}
            <BaseView style={[styles.promoCard, styles.promoCardLeft]}>
              <Text style={styles.promoTitle}>Ryt PayLater</Text>
              <Text style={styles.promoDescription}>
                Enjoy 1.2% cashback{"\n"}on QR payments
              </Text>
              <BaseView style={styles.promoIcon}>
                <BaseView style={styles.iconCard}>
                  <Text style={styles.iconText}>QR</Text>
                </BaseView>
                <Text style={styles.rmText}>RM 12</Text>
              </BaseView>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("WebView", {
                    title: "Pay Later",
                    url: Link.rytPayLater,
                  });
                }}
              >
                <Text style={styles.promoLink}>Apply now &gt;</Text>
              </TouchableOpacity>
            </BaseView>

            {/* Savings Card */}
            <BaseView style={[styles.promoCard, styles.promoCardRight]}>
              <BaseView style={styles.coinsIcon}>
                <Text style={styles.coinsEmoji}>💰</Text>
                <Text style={styles.rmBadge}>RM 50</Text>
              </BaseView>
              <Text style={styles.promoDescription}>
                Earn up to 4% p.a.,{"\n"}paid every day
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("WebView", {
                    title: "Savings",
                    url: Link.rytSavings,
                  });
                }}
              >
                <Text style={styles.promoLink}>Learn more &gt;</Text>
              </TouchableOpacity>
            </BaseView>
          </BaseView>

          {/* Transactions Section */}
          <BaseView style={styles.accountsSection}>
            <Text style={styles.accountsTitle}>Transfer Transactions</Text>
            <FlatList
              data={accountInformation?.transactions || []}
              renderItem={renderTransactionItem}
              keyExtractor={(_: any, index: number) => index.toString()}
              contentContainerStyle={{ paddingVertical: 10 }}
            />
          </BaseView>
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
    color: Colors.grey,
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
    backgroundColor: Colors.mintMist,
  },
  promoCardRight: {
    backgroundColor: Colors.lightMintGreen,
  },
  promoTitle: {
    fontSize: TextFontSize.lg,
    fontWeight: "700",
    color: Colors.black,
    marginBottom: 8,
  },
  promoDescription: {
    fontSize: TextFontSize.md,
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
    color: Colors.deepModerateBlue,
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
    color: Colors.black,
    marginBottom: 15,
  },
  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
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
