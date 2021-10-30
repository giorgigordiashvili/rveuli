import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PrimaryButton from "../Shared/PrimaryButton";

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient colors={["#7BE495", "#329D9C"]} style={styles.container}>
      <View style={styles.logoes}>
        <Image
          style={styles.logo}
          source={require("../../assets/logoText.png")}
        ></Image>
        <Text style={styles.logoText}>თავად მართე საკუთარი ფინანსები</Text>
      </View>

      <View style={styles.buttons}>
        <PrimaryButton
          colorScheme="light"
          onPress={() => navigation.navigate("Login")}
          label="შესვლა"
        />
        <PrimaryButton
          colorScheme="light"
          onPress={() => navigation.navigate("Register")}
          label="რეგისტრაცია"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "30%",
    resizeMode: "contain",
    margin: 16,
  },

  logoes: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flex: 0.5,
    width: "72%",
    justifyContent: "center",
  },
  logoText: {
    textAlign: "center",
    fontSize: 14,

    color: "#FFFFFF",
    width: "75%",
  },
});
