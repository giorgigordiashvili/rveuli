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
import { useMutation, useQueryClient } from "react-query";
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
};
export default function CategoryModal({
  modalVisible,
  setModalVisible,
  selectedCategory,
  user,
}) {
  const queryClient = useQueryClient();
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

  const [value, setValue] = useState("");
  const [selected, setSelected] = useState(0);
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState("1");

  const [isChecked, setIsChecked] = useState(false);
  let transaction_type = 1;
  if (selectedCategory > 7 && selectedCategory < 15) {
    transaction_type = 2;
  }

  const submitTransaction = async () => {
    const sendData = {
      transaction_name: title,
      raodenoba: quantity,
      number: value,
      category_id: selectedCategory,
      transaction_type: transaction_type,
      in_template: isChecked,
      gadaxda: selected ? 2 : 1,
    };
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    return axios.post(
      `https://rveuli.magsman.ge/api/insert-transaction`,
      sendData,
      headers
    );
  };
  const mutation = useMutation(submitTransaction, {
    onSuccess: async () => {
      Alert.alert(
        "შეტყობინება",
        "ტრანზაქცია წარმატებით დაემატა",
        [
          {
            text: "OK",
            onPress: () => {
              queryClient.refetchQueries("todos");
              queryClient.refetchQueries("balance");
              queryClient.refetchQueries("transactionss");
              setModalVisible(false);
              setTitle("");
              setQuantity("");
              setValue("");
              setIsChecked(false);
            },
          },
        ],
        { cancelable: false }
      );
    },
    onError: () => {
      // Works on both Android and iOS
      Alert.alert(
        "პაროლი არასწორია",
        "გთხოვთ შეიყვანოთ სწორი პაროლი",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    },
  });

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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", right: 30 }}
              onPress={() => setModalVisible(false)}
            >
              <FontAwesome name={"window-close"} size={38} color={"#215273"} />
            </TouchableOpacity>
            <Text style={styles.headerText}>შეიყვანეთ დეტალები</Text>
          </View>
          <View style={{ flexDirection: "row", paddingTop: 40 }}>
            <TouchableOpacity onPress={() => setSelected(0)}>
              <LinearGradient
                style={styles.buttonSelect}
                colors={selected ? ["#FFF", "#FFF"] : ["#7BE495", "#329D9C"]}
              >
                {shown ? (
                  <Image
                    style={styles.logo}
                    source={require("../../assets/bank.png")}
                  ></Image>
                ) : (
                  <View></View>
                )}

                <Text
                  style={[
                    styles.selectText,
                    { color: selected ? "#215273" : "#FFFFFF" },
                  ]}
                >
                  ბანკი
                </Text>
              </LinearGradient>
              <Image
                style={[
                  styles.selected,
                  { display: selected ? "none" : "flex" },
                ]}
                source={require("../../assets/selected.png")}
              ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelected(1)}>
              <LinearGradient
                style={styles.buttonSelect}
                colors={selected ? ["#7BE495", "#329D9C"] : ["#FFF", "#FFF"]}
              >
                {shown ? (
                  <Image
                    style={styles.logo}
                    source={require("../../assets/cash.png")}
                  ></Image>
                ) : (
                  <View></View>
                )}

                <Text
                  style={[
                    styles.selectText,
                    { color: selected ? "#FFFFFF" : "#215273" },
                  ]}
                >
                  ქეში
                </Text>
              </LinearGradient>
              <Image
                style={[
                  styles.selected,
                  { display: selected ? "flex" : "none" },
                ]}
                source={require("../../assets/selected.png")}
              ></Image>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                fontFamily: "FiragoBold",
                fontSize: 18,
                alignSelf: "center",
                paddingVertical: 5,
                color: "#215273",
              }}
            >
              {categoryNames[selectedCategory]}
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="დასახელება"
                placeholderTextColor="#c3c3c3"
                onChangeText={(text) => setTitle(text)}
                value={title.toString()}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                keyboardType="number-pad"
                placeholder="თანხა"
                placeholderTextColor="#c3c3c3"
                onChangeText={(text) => setValue(text)}
                value={value.toString()}
              />
            </View>

            <View style={styles.checkboxContainer}>
              <Checkbox
                color="#57C495"
                status={isChecked ? "checked" : "unchecked"}
                onPress={() => {
                  setIsChecked(!isChecked);
                }}
              ></Checkbox>
              <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                <Text>შაბლონებში დამატება</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={mutation.mutate}>
                <LinearGradient
                  style={styles.button}
                  colors={["#7BE495", "#329D9C"]}
                >
                  <Text style={styles.buttonText}>დამატება</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
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
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  buttons: {
    width: "92%",
    alignSelf: "center",
  },
  droidSafeArea: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  selectText: {
    paddingTop: 20,
    fontSize: 24,
    color: "#215273",
    fontFamily: "FiragoBold",
  },
  buttonSelect: {
    width: Dimensions.get("window").width / 2 - 20,

    padding: 20,
    borderRadius: 14,
    margin: 10,
  },
  inputContainer: {
    marginHorizontal: 20,
    padding: 20,
    shadowColor: "#329D9C",
    borderRadius: 14,
    marginVertical: 10,
    shadowOffset: {
      width: 34,
      height: 34,
    },
    shadowOpacity: 0.13,
    shadowRadius: 14,
    elevation: 5,
    backgroundColor: "#FFF",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,

    borderRadius: 14,
    marginVertical: 10,
  },
  button: {
    width: "100%",
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
