import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { TextInput } from "react-native-gesture-handler";
import { Checkbox } from "react-native-paper";
import axios from "axios";
import moment from "moment";

const categoryNames = {
  1: "დენი",
  2: "გაზი",
  3: "წყალი",
  4: "ინტერნეტი",
  5: "დასუფთავება",
  6: "სესხი",
  7: "სხვადასხვა",
  8: "ხელფასი",
  9: "ბონუსი",
  10: "ქირა",
  11: "ფასდაკლება",
  12: "ტანსაცმელი",
  13: "ინვესტიცია",
  14: "სხვადასხვა",
  15: "ვალი",
};
export default function CategoryModal({
  modalVisible,
  setModalVisible,
  selectedCategory,
  dabruneba,
  mobile,
  username,
  transactionName,
  transactionType,
  number,
  categoryId,
}) {
  const [shown, setShown] = useState(true);
  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);
  const _keyboardDidShow = () => {
    setShown(false);
  };
  const _keyboardDidHide = () => {
    setShown(true);
  };

  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <SafeAreaView style={styles.droidSafeArea}>
          {categoryId !== null && (
            <View style={(styles.inputContainer, { alignSelf: "center" })}>
              <Text style={(styles.input, { fontSize: 18 })}>
                {categoryNames[categoryId]}
              </Text>
            </View>
          )}

          {transactionName && (
            <View style={styles.inputContainer}>
              <Text style={styles.input}>დასახელება:</Text>
              <Text style={styles.inputValue}>{transactionName}</Text>
            </View>
          )}

          {dabruneba && (
            <View style={styles.inputContainer}>
              <Text style={styles.input}>დაბრუნების თარიღი:</Text>
              <Text style={styles.inputValue}>
                {moment(dabruneba).format("YYYY-MM-DD")}
              </Text>
            </View>
          )}

          {mobile && (
            <View style={styles.inputContainer}>
              <Text style={styles.input}>მობილურის ნომერი:</Text>
              <Text style={styles.inputValue}>{mobile}</Text>
            </View>
          )}

          {username && (
            <View style={styles.inputContainer}>
              <Text style={styles.input}>მომხმარებელი:</Text>
              <Text style={styles.inputValue}>{username}</Text>
            </View>
          )}

          {number && (
            <View style={styles.inputContainer}>
              <Text style={styles.input}>თანხა:</Text>
              <Text style={styles.inputValue}>{number}</Text>
            </View>
          )}

          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <LinearGradient
              style={styles.button}
              colors={["#7BE495", "#329D9C"]}
            >
              <Text style={styles.buttonText}>დახურვა</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{ flex: 1 }}></View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    padding: 10,
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
  },
  input: {
    color: "#215273",
    fontFamily: "FiragoBold",
    paddingVertical: 10,
  },
  inputValue: {
    color: "#215273",
    fontFamily: "FiragoRegular",
    paddingVertical: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,

    borderRadius: 14,
    marginVertical: 10,
  },
  button: {
    width: "90%",
    alignSelf: "center",
    padding: 15,
    borderRadius: 15,
    margin: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "NinoBold",
  },

  scene: {
    flex: 1,
  },
  tabBar: {
    paddingVertical: 10,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 30,
    backgroundColor: "#FFF",
  },
  icons: {
    flexDirection: "row",
  },
  headerText: {
    color: "#215273",
    fontSize: 16,
    fontFamily: "FiragoBold",
  },
});
