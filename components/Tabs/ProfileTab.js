import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, Image, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient, useQuery } from "react-query";
import axios from "axios";
import { userProvider } from "../../store/user/auth";
import { setData } from "../../handlers/localStorage";

export default function ProfileTab({ navigation, user, setIsLoggedIn }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const { currentUser, setCurrentUser, logOut } = userProvider();

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {}
  };

  const { isLoading, isError, data, error } = useQuery("balance", async () => {
    const { data } = await axios.get(
      `https://rveuli.magsman.ge/api/getSummary`
    );
    console.log(data);
    return data;
  });

  const deleteAccount = async () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    return axios.post("https://rveuli.magsman.ge/api/delete-user", {}, headers);
  };
  const createTwoButtonAlert = () =>
    Alert.alert(
      "შეტყობინება",
      "ნამდვილად გსურთ ექაუნთის წაშლა?",
      [
        {
          text: "არა",
          onPress: () => console.log("NO PRESSED"),
          style: "cancel",
        },
        { text: "დიახ", onPress: () => deleteAccountM.mutate() },
      ],
      { cancelable: false }
    );

  const deleteAccountM = useMutation(deleteAccount, {
    onSuccess: async () => {
      Alert.alert(
        "შეტყობინება",
        "ექაუნთი წარმატებით წაიშალა",
        [
          {
            text: "OK",
            onPress: () => {
              storeData(null);
              setIsLoggedIn(false);
            },
          },
        ],
        { cancelable: false }
      );
    },
    onError: () => {
      // Works on both Android and iOS
      Alert.alert(
        "შეცდომა",
        "ექაუნთი ვერ წაიშალა",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    },
  });
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>პროფილი</Text>
      </View>
      <View style={styles.topBar}>
        <View style={styles.vertical}>
          <Text style={styles.name}>{}</Text>
          <Text style={styles.balance}>
            ბალანსი: {!isLoading && data.income - data.expense - data.debt} ლარი
          </Text>
        </View>
      </View>
      <View style={styles.plusShadow}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => setIsEnabled(!isEnabled)}
        >
          <View style={styles.insideCont}>
            <Image
              style={styles.logoLeft}
              source={require("../../assets/switch.png")}
            ></Image>
            <Text style={styles.text}>მივიღო შეტყობინებები</Text>
          </View>
          <Switch
            trackColor={{ false: "#8A959E", true: "#34C759" }}
            thumbColor={isEnabled ? "#FFFFFF" : "#FFFFFF"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={styles.switch}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.plusShadow}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <View style={styles.insideCont}>
            <Image
              style={styles.logoLeft}
              source={require("../../assets/settings.png")}
            ></Image>
            <Text style={styles.text}>ანგარიშის პარამეტრები</Text>
          </View>
          <Image
            style={styles.logoRight}
            source={require("../../assets/arrow-left.png")}
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.plusShadow}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("EditPassword")}
        >
          <View style={styles.insideCont}>
            <Image
              style={styles.logoLeft}
              source={require("../../assets/change.png")}
            ></Image>
            <Text style={styles.text}>პაროლის შეცვლა</Text>
          </View>
          <Image
            style={styles.logoRight}
            source={require("../../assets/arrow-left.png")}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.plusShadow}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Helper")}
          style={styles.buttonContainer}
        >
          <View style={styles.insideCont}>
            <Image
              style={styles.logoLeft}
              source={require("../../assets/helper.png")}
            ></Image>
            <Text style={styles.text}>თანამშრომლის დამატება</Text>
          </View>
          <Image
            style={styles.logoRight}
            source={require("../../assets/arrow-left.png")}
          ></Image>
        </TouchableOpacity>
      </View>

      <View style={styles.plusShadow}>
        <TouchableOpacity
          onPress={() => {
            logOut();
          }}
          style={styles.buttonContainer}
        >
          <View style={styles.insideCont}>
            <Image
              style={styles.logoLeft}
              source={require("../../assets/logout.png")}
            ></Image>
            <Text style={styles.text}>ანგარიშიდან გასვლა</Text>
          </View>
          <Image
            style={styles.logoRight}
            source={require("../../assets/arrow-left.png")}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  headerText: {
    color: "#215373",
    fontSize: 35,
    paddingTop: 50,
    paddingLeft: 33,
    fontFamily: "FiragoBold",
    paddingBottom: 50,
  },
  insideCont: {
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "row",

    paddingTop: 15,
    paddingBottom: 15,

    alignItems: "center",
    width: "100%",

    alignSelf: "center",
    justifyContent: "space-between",
  },
  plusShadow: {
    marginTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    shadowColor: "#329D9C",
    borderRadius: 13,
    marginHorizontal: 20,
    shadowOffset: {
      width: 34,
      height: 34,
    },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 5,
    backgroundColor: "#FFF",
  },
  topBar: {
    flexDirection: "row",
    width: "82%",
    alignSelf: "center",
  },
  logoLeft: {
    marginRight: 10,
    alignSelf: "center",
  },
  logoRight: {
    marginRight: 10,
  },
  text: {
    marginRight: 30,
    fontFamily: "FiragoRegular",
    alignSelf: "center",
  },
  vertical: {
    justifyContent: "space-around",
  },
  name: {
    fontSize: 26,
    fontFamily: "FiragoBold",
  },
  profile: {
    marginRight: 10,
    alignSelf: "center",
    borderWidth: 6,
    borderColor: "#000000",
    padding: 5,
    borderRadius: 100,
    borderColor: "#B2E8E7",
  },

  balance: {
    color: "#8A959E",
    fontFamily: "FiragoBold",
  },
});
