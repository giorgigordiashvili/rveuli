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
import { updateUser } from "../services/profileService";

const queryClient = new QueryClient();

export default function EditProfileScreen({ navigation, user }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [mobile, setMobile] = useState("");
  const { isLoading, error, data } = useQuery("userInfo", () =>
    fetch(`https://rveuli.magsman.ge/api/getUser/`).then((res) => res.json())
  );

  const updateUserMutation = useMutation(updateUser, {
    onMutate: (data) => {
      // A mutation is about to happen!
      console.log(data);
      // Optionally return a context containing data to use when for example rolling back
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(error.response.data);
      console.log(`rolling back optimistic update with id ${context.id}`);
    },
    onSuccess: (data, variables, context) => {
      Alert.alert("შეტყობინება", "ინფორმაცია დამახსოვრებულია", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  if (isLoading) return <Text>Loading...</Text>;

  if (error) return <Text>Error</Text>;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}>პარამეტრები</Text>
      </View>

      <View style={styles.plusShadow}>
        <TextInput
          placeholder="სახელი"
          value={name || data.name}
          onChangeText={setName}
          style={styles.buttonContainer}
        />
      </View>

      <View style={styles.plusShadow}>
        <TextInput
          placeholder="გვარი"
          onChangeText={setSurname}
          value={surname || data.surname}
          style={styles.buttonContainer}
        />
      </View>

      <View style={styles.plusShadow}>
        <TextInput
          value={email || data.email}
          onChangeText={setEmail}
          placeholder="ელ-ფოსტა"
          style={styles.buttonContainer}
        />
      </View>
      <View style={styles.plusShadow}>
        <TextInput
          value={mobile || data.mobile}
          onChangeText={setMobile}
          placeholder="მობილურის ნომერი"
          style={styles.buttonContainer}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          updateUserMutation.mutate({
            user_id: data.id,
            name: name || data.name,
            surname: surname || data.surname,
            email: email || data.email,
            mobile: mobile || data.mobile,
          });
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
