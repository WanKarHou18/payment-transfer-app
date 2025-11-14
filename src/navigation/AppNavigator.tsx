import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import AddMoneyScreen from "../screens/AddMoneyScreen";
import TransferScreen from "../screens/TransferMoney/TransferScreen";
import TransferMoneyScreen from "../screens/TransferMoney/TransferMoneyScreen";

export type RootStackParamList = {
  Home: undefined;
  AddMoney: undefined;
  Transfer: undefined;
  TransferMoney: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddMoney" component={AddMoneyScreen} />
      <Stack.Screen name="TransferMoney" component={TransferMoneyScreen} />
      <Stack.Screen name="Transfer" component={TransferScreen} />
    </Stack.Navigator>
  );
}
