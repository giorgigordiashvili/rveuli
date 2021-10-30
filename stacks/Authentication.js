import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../components/Auth/LoginScreen";
import RegisterScreen from "../components/Auth/RegisterScreen";
import QuestionScreen from "../components/Auth/QuestionScreen";
import HomeScreen from "../components/Auth/HomeScreen";
import { useFormik } from "formik";
import { registerValidationSchema } from "../components/Auth/validations";
import { userProvider } from "../store/user/auth";
import { signUp } from "../store/actions/user";

const Stack = createStackNavigator();

export default function Authentication() {
  const { setCurrentUser } = userProvider();

  const handleRegister = (values) => {
    signUp(values, setCurrentUser, formik);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
      question: "რომელ ქუჩაზე დაიბადეთ?",
      answer: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: handleRegister,
  });
  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register">
            {(props) => <RegisterScreen {...props} formik={formik} />}
          </Stack.Screen>
          <Stack.Screen name="Question">
            {(props) => <QuestionScreen {...props} formik={formik} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
