import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useFormik } from "formik";
import { checkUser } from "../../store/actions/user";
import { userProvider } from "../../store/user/auth";
import PrimaryInput from "../Shared/PrimaryInput";
import PrimaryButton from "../Shared/PrimaryButton";
import { loginValidationSchema } from "./validations";
export default function LoginScreen({ navigation }) {
  const { currentUser, setCurrentUser } = userProvider();

  const handleLogin = (values) => {
    checkUser(values, setCurrentUser, formik.setErrors);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    validateOnChange: true,
    onSubmit: handleLogin,
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.textOver}>
            <Text style={styles.bigText}>ანგარიშზე შესვლა</Text>
          </View>
          <View style={styles.inputs}>
            <PrimaryInput
              keyboardType="email-address"
              id="email"
              label="ელ. ფოსტა"
              formik={formik}
            />
            <PrimaryInput
              secureTextEntry={true}
              id="password"
              label="პაროლი"
              formik={formik}
            />
          </View>
          <View style={styles.buttons}>
            <PrimaryButton label="შესვლა" onPress={formik.handleSubmit} />
            <View style={styles.underTextContainer}>
              <Text style={styles.underText}>არ გაქვს ანგარიში?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.underTextBold}> - რეგისტრაცია</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    margin: 12,
    color: "#1B4B6D",
    fontSize: 35,
    textAlign: "center",
  },
  smallText: {
    margin: 12,
    color: "#1B4B6D",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "FiragoThin",
  },
  container: {
    flex: 1,

    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "flex-end",
  },

  inputs: {
    flex: 0.5,
    width: "82%",
    alignItems: "center",
    justifyContent: "center",
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
