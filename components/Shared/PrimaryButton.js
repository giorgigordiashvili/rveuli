import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function PrimaryButton({
  label,
  onPress,
  colorScheme = "dark",
}) {
  return colorScheme === "light" ? (
    <TouchableOpacity onPress={onPress} style={styles.buttonLight}>
      <Text style={styles.buttonTextLight}>{label}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient style={styles.button} colors={["#7BE495", "#329D9C"]}>
        <Text style={styles.buttonText}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    alignSelf: "center",
    padding: 15,
    borderRadius: 15,
    margin: 10,
  },
  buttonLight: {
    width: "100%",
    alignSelf: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    margin: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "NinoBold",
  },
  buttonTextLight: {
    textAlign: "center",
    color: "#55C595",
    fontSize: 17,
    fontFamily: "NinoBold",
  },
});
