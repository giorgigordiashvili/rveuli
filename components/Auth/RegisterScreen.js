import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryInput from "../Shared/PrimaryInput";
import PrimaryButton from "../Shared/PrimaryButton";
import { userProvider } from "../../store/user/auth";
import { signUp } from "../../store/actions/user";

export default function RegisterScreen({ navigation, formik }) {
  const { setCurrentUser } = userProvider();

  return Platform.OS === "ios" ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.textOver}>
        <Text style={styles.bigText}>გამარჯობა!</Text>
        <Text style={styles.smallText}>
          რეგისტრაციისთვის გთხოვთ შეავსოთ მოცემული ველები
        </Text>
      </View>
      <View style={styles.inputs}>
        <PrimaryInput
          keyboardType="email-address"
          id="email"
          label="ელ.ფოსტა ან იუზერნეიმი"
          formik={formik}
        />
        <PrimaryInput
          secureTextEntry={true}
          id="password"
          label="პაროლი"
          formik={formik}
        />
        <PrimaryInput
          secureTextEntry={true}
          id="repeatPassword"
          label="გაიმეორეთ პაროლი"
          formik={formik}
        />
      </View>
      <View style={styles.buttons}>
        <PrimaryButton
          onPress={() => {
            formik.handleSubmit();
            if (Object.keys(formik.errors).length === 1)
              navigation.navigate("Question");
          }}
          label="გაგრძელება"
        />

        <View style={styles.underTextContainer}>
          <Text style={styles.underText}>გაქვს უკვე ანგარიში?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.underTextBold}> - შესვლა</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  ) : (
    <View style={styles.container}>
      <View style={styles.textOver}>
        <Text style={styles.bigText}>გამარჯობა!</Text>
        <Text style={styles.smallText}>
          რეგისრაციისთვის გთხოვთ შეავსოთ მოცემული ველები
        </Text>
      </View>
      <View style={styles.inputs}>
        <PrimaryInput
          keyboardType="email-address"
          id="email"
          label="ელ.ფოსტა ან იუზერნეიმი"
          formik={formik}
        />
        <PrimaryInput
          keyboardType="text"
          secureTextEntry={true}
          id="password"
          label="პაროლი"
          formik={formik}
        />
        <PrimaryInput
          keyboardType="text"
          secureTextEntry={true}
          id="repeatPassword"
          label="გაიმეორეთ პაროლი"
          formik={formik}
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleNext}>
          <LinearGradient style={styles.button} colors={["#7BE495", "#329D9C"]}>
            <Text style={styles.buttonText}>გაგრძელება</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.underTextContainer}>
          <Text style={styles.underText}>გაქვს უკვე ანგარიში?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.underTextBold}> - შესვლა</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  underTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 5,
  },
  underTextBold: {
    fontFamily: "NinoBold",
  },
  underText: {
    fontFamily: "Nino",
  },
  textOver: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "80%",
  },
  bigText: {
    margin: 4,
    color: "#1B4B6D",
    fontSize: 35,
    textAlign: "center",
  },
  smallText: {
    margin: 4,
    color: "#1B4B6D",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "FiragoThin",
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "flex-end",
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
  inputs: {
    flex: 1,
    width: "82%",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    width: "82%",
    height: 50,
    alignSelf: "center",

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
  buttons: {
    flex: 1,
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
