import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import PrimaryButton from "../Shared/PrimaryButton";
import PrimaryInput from "../Shared/PrimaryInput";

export default function QuestionScreen({ navigation, formik }) {
  const [selectedValue, setSelectedValue] = useState(1);

  return Platform.OS === "ios" ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.textOver}>
        <Text style={styles.bigText}>საიდუმლო კითხვები </Text>
        <Text style={styles.smallText}>
          აირჩიეთ საიდუმლო შეკითხვა, რომლის პასუხიც მხოლოდ თქვენ გეცოდინებათ
        </Text>
      </View>
      <View style={styles.inputs}>
        <DropDownPicker
          items={[
            { label: "რომელ ქუჩაზე დაიბადეთ?", value: 1 },
            { label: "თქვენი პირველი ძაღლის სახელი", value: 2 },
            { label: "რა არის თქვენი საოცნებო სამსახური", value: 3 },
          ]}
          defaultValue={selectedValue}
          containerStyle={{ height: 60 }}
          placeholder="აირჩიეთ საიდუმლო კითხვა"
          style={[
            { backgroundColor: "#FFF", alignSelf: "flex-start" },
            styles.input,
          ]}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          labelStyle={{ color: "#000" }}
          dropDownStyle={{ backgroundColor: "#FFF", width: "80%" }}
          onChangeItem={(item) => {
            setSelectedValue(item.value);
            formik.setFieldValue("answer", item.value);
          }}
        />
        <PrimaryInput id="answer" label="პასუხი" formik={formik} />
      </View>
      <View style={styles.buttons}>
        <PrimaryButton onPress={formik.handleSubmit} label="რეგისტრაცია" />
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
        <Text style={styles.bigText}>საიდუმლო კითხვები </Text>
        <Text style={styles.smallText}>
          აირჩიეთ საიდუმლო შეკითხვა, რომლის პასუხიც მხოლოდ თქვენ გეცოდინებათ
        </Text>
      </View>
      <View style={styles.inputs}>
        <DropDownPicker
          items={[
            { label: "რომელ ქუჩაზე დაიბადეთ?", value: 1 },
            { label: "თქვენი პირველი ძაღლის სახელი", value: 2 },
            { label: "რა არის თქვენი საოცნებო სამსახური", value: 3 },
          ]}
          defaultValue={selectedValue}
          containerStyle={{ height: 60 }}
          placeholder="აირჩიეთ საიდუმლო კითხვა"
          style={[
            { backgroundColor: "#FFF", alignSelf: "flex-start" },
            styles.input,
          ]}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          labelStyle={{ color: "#000" }}
          dropDownStyle={{ backgroundColor: "#FFF", width: "80%" }}
          onChangeItem={(item) => {
            setSelectedValue(item.value);
            formik.setFieldValue("answer", item.value);
          }}
        />
        <PrimaryInput id="answer" label="პასუხი" formik={formik} />
      </View>
      <View style={styles.buttons}>
        <PrimaryButton onPress={formik.handleSubmit} label="რეგისტრაცია" />
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
  },

  inputs: {
    flex: 0.5,
    width: "82%",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    width: "100%",
    height: 50,
    alignSelf: "center",
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    borderBottomLeftRadius: 13,
    borderBottomRightRadius: 13,
    borderWidth: 1,
    borderColor: "#329D9C",
    margin: 5,
    padding: 15,
  },
  buttons: {
    flex: 1,
    width: "72%",
    justifyContent: "center",
  },
});
