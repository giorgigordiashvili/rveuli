import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import DashboardScreen from "../components/DashboardScreen";
import HelperScreen from "../components/HelperScreen";
import EditProfileScreen from "../components/HelperScreen";
import EditPasswordScreen from "../components/EditPasswordScreen";

const Stack = createStackNavigator();

export default function Authenticated() {
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Helper" component={HelperScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="EditPassword" component={EditPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
