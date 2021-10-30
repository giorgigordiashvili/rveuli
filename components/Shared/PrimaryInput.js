import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function PrimaryInput({
  formik,
  label,
  id,
  secureTextEntry = false,
  keyboardType = "default",
}) {
  return (
    <View style={{ width: "100%" }}>
      {formik.errors[id] && formik.touched[id] && (
        <Text style={styles.errorText}>{formik.errors[id]}</Text>
      )}
      <TextInput
        id={id}
        name={id}
        autoCapitalize="none"
        style={styles.input}
        placeholder={label}
        onChangeText={formik.handleChange(id)}
        onBlur={formik.handleBlur(id)}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        value={formik.values[id]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    fontSize: 10,
    color: "red",
  },

  input: {
    width: "100%",
    height: 50,
    alignSelf: "center",
    borderRadius: 13,
    color: "#215273",
    margin: 5,
    padding: 15,
    shadowColor: "#329D9C",
    borderRadius: 13,
    marginVertical: 10,
    shadowOffset: {
      width: 15,
      height: 15,
    },
    shadowOpacity: 0.13,
    shadowRadius: 14,
    elevation: 5,
    backgroundColor: "#FFF",
  },
});
