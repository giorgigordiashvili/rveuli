import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "react-query";
import { changePassword } from "../services/profileService";

export default function EditProfileScreen({ navigation, user }) {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePasswordMutation = useMutation(changePassword, {
    onMutate: (data) => {
      // A mutation is about to happen!
      console.log(data);
      // Optionally return a context containing data to use when for example rolling back
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      Alert.alert(
        "შეტყობინება",
        "პაროლი არასწორია",
        [
          {
            text: "ოკ",
          },
        ],
        { cancelable: false }
      );
    },
    onSuccess: (data, variables, context) => {
      Alert.alert(
        "შეტყობინება",
        "პაროლი შეიცვალა",
        [
          {
            text: "უკან დაბრუნება",
            onPress: () => navigation.goBack(),
          },
        ],
        { cancelable: false }
      );
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>პაროლის შეცვლა</Text>
      </View>

      <View style={styles.plusShadow}>
        <TextInput
          secureTextEntry={true}
          onChangeText={setOldPassword}
          value={oldPassword}
          placeholder="ძველი პაროლი"
          style={styles.buttonContainer}
        />
      </View>
      <View style={styles.plusShadow}>
        <TextInput
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
          placeholder="ახალი პაროლი"
          style={styles.buttonContainer}
        />
      </View>
      <View style={styles.plusShadow}>
        <TextInput
          secureTextEntry={true}
          onChangeText={setNewPassword}
          value={newPassword}
          placeholder="გაიმეორეთ პაროლი"
          style={styles.buttonContainer}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          if (password == newPassword && password !== "") {
            changePasswordMutation.mutate({
              user_id: user[0].id,
              new_password: password,
              old_password: oldPassword,
            });
          } else {
            Alert.alert(
              "შეცდომა",
              "პაროლები ერთმანეთს არ ემთხევა",
              [
                {
                  text: "ოკ",
                },
              ],
              { cancelable: false }
            );
          }
        }}
      >
        <LinearGradient style={styles.button} colors={["#7BE495", "#329D9C"]}>
          <Text style={styles.buttonText}>დამახსოვრება</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#FFF",
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
  labelContainer: {
    flexDirection: "row",
    fontFamily: "Nino",
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 13,
    alignItems: "center",
    width: "82%",
    marginTop: 10,
    fontSize: 14,
    color: "#29304D",

    alignSelf: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 13,
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-between",
  },
  button: {
    width: "90%",
    alignSelf: "center",
    padding: 15,
    borderRadius: 15,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 17,
    fontFamily: "NinoBold",
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
  plusShadow: {
    shadowColor: "#329D9C",
    borderRadius: 14,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowOffset: {
      width: 34,
      height: 34,
    },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 5,
    backgroundColor: "#FFF",
  },
});
