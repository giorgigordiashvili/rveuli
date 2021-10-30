import React, { useState } from "react";
import { Image } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "./Tabs/HomeTab";
import CalendarTab from "./Tabs/CalendarTab";
import CategoryTab from "./Tabs/CategoryTab";
import TransactionsTab from "./Tabs/TransactionsTab";
import ProfileTab from "./Tabs/ProfileTab";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

  switch (routeName) {
    case "HomeTab":
      return "დეშბორდი";
    case "CalendarTab":
      return "კალენდარი";
    case "CategoryTab":
      return "კატეგორიის დამატება";
    case "TransactionsTab":
      return "ტრანზაქციები";
    case "ProfileTab":
      return "ანგარიში";
  }
}

const Tab = createBottomTabNavigator();

export default function DashboardScreen({
  navigation,
  route,
  user,
  setIsLoggedIn,
}) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);
  const [index, setIndex] = useState(1);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name == "CategoryTab") {
            return (
              <Image
                source={
                  focused
                    ? require("../assets/plus.png")
                    : require("../assets/plus-gray.png")
                }
                size={38}
              />
            );
          }

          if (route.name == "TransactionsTab") {
            return (
              <Image
                source={
                  focused
                    ? require("../assets/transactions.png")
                    : require("../assets/transactions-gray.png")
                }
                size={size}
              />
            );
          }

          if (route.name === "HomeTab") {
            return (
              <Image
                source={
                  focused
                    ? require("../assets/home.png")
                    : require("../assets/home-gray.png")
                }
                size={size}
              />
            );
          } else if (route.name === "CalendarTab") {
            return (
              <Image
                source={
                  focused
                    ? require("../assets/calendar.png")
                    : require("../assets/calendar-gray.png")
                }
                size={size}
              />
            );
          } else if (route.name === "ProfileTab") {
            return (
              <Image
                source={
                  focused
                    ? require("../assets/profile.png")
                    : require("../assets/profile-gray.png")
                }
                size={size}
              />
            );
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#42AD9A",
        inactiveTintColor: "#CAD7E5",
        showLabel: true,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        options={{ title: "მთავარი" }}
        children={(props) => (
          <HomeTab setIndex={setIndex} {...props} user={user} />
        )}
      />
      <Tab.Screen
        options={{ title: "გუნდი" }}
        name="CalendarTab"
        children={(props) => (
          <CalendarTab {...props} setIsLoggedIn={setIsLoggedIn} user={user} />
        )}
      />
      <Tab.Screen
        name="CategoryTab"
        options={{ title: "კატეგორიები" }}
        children={(props) => (
          <CategoryTab
            {...props}
            index={index}
            setIndex={setIndex}
            setIsLoggedIn={setIsLoggedIn}
            user={user}
          />
        )}
      />
      <Tab.Screen
        name="TransactionsTab"
        options={{ title: "ტრანზაქციები" }}
        component={TransactionsTab}
      />
      <Tab.Screen
        name="ProfileTab"
        options={{ title: "ანგარიში" }}
        children={(props) => (
          <ProfileTab {...props} setIsLoggedIn={setIsLoggedIn} user={user} />
        )}
      />
    </Tab.Navigator>
  );
}
