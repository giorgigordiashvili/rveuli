import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  LogBox,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import CategoryItem from "../CategoryItem";
import { FlatGrid } from "react-native-super-grid";
import CategoryModal from "../Modals/CategoryModal";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Keyboard } from "react-native";
import moment from "moment";
LogBox.ignoreAllLogs(true);
const FirstRoute = ({ setModalVisible, selectCategory }) => (
  <FlatGrid
    itemDimension={Dimensions.get("window").width / 4}
    data={[
      { name: "დენი", icon: "1" },
      { name: "გაზი", icon: "2" },
      { name: "წყალი", icon: "3" },
      { name: "ინტერნეტი", icon: "4" },
      { name: "დასუფთავება", icon: "5" },
      { name: "სესხი", icon: "6" },
      { name: "სხვადასხვა", icon: "7" },
    ]}
    renderItem={({ item }) => (
      <CategoryItem
        setModalVisible={setModalVisible}
        selectCategory={selectCategory}
        icon={item.icon}
        name={item.name}
      ></CategoryItem>
    )}
  />
);

const SecondRoute = ({ setModalVisible, selectCategory }) => (
  <FlatGrid
    itemDimension={Dimensions.get("window").width / 4}
    data={[
      { name: "ხელფასი", icon: "8" },
      { name: "ბონუსი", icon: "9" },
      { name: "ქირა", icon: "10" },
      { name: "ფასდაკლება", icon: "11" },
      { name: "ტანსაცმელი", icon: "12" },
      { name: "ინვესტიცია", icon: "13" },
      { name: "სხვადასხვა", icon: "14" },
    ]}
    renderItem={({ item }) => (
      <CategoryItem
        setModalVisible={setModalVisible}
        selectCategory={selectCategory}
        icon={item.icon}
        name={item.name}
      ></CategoryItem>
    )}
  />
);

const submitTransaction = async (
  title,
  value,
  user,
  date,
  username,
  number
) => {
  const sendData = {
    transaction_name: title,
    raodenoba: "1",
    number: value,
    category_id: 15,
    transaction_type: 3,
    user_id: user[0].id,
    in_template: 0,
    dabrunebis_tarigi: moment(date).format("YYYY-MM-DD"),
    username: username,
    mobile: number,
  };

  console.log(sendData);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  return axios.post(
    `https://rveuli.magsman.ge/api/insert-transaction`,
    sendData,
    headers
  );
};

const ThirdRoute = ({ user }) => {
  const [title, setTitle] = React.useState("");
  const [value, setValue] = React.useState("");
  const queryClient = useQueryClient();
  const [date, setDate] = React.useState(new Date());
  const [mode, setMode] = React.useState("date");
  const [show, setShow] = React.useState(true);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const [username, setUsername] = React.useState("");
  const [number, setNumber] = React.useState("");
  const mutation = useMutation(
    () => submitTransaction(title, value, user, date, username, number),
    {
      onSuccess: async () => {
        Alert.alert(
          "შეტყობინება",
          "ვალი წარმატებით დაემატა",
          [
            {
              text: "OK",
              onPress: () => {
                setTitle("");
                setValue("");
                setUsername("");
                setNumber("");
                setDate(new Date());

                queryClient.invalidateQueries("todos");
                queryClient.invalidateQueries("balance");
                queryClient.invalidateQueries("transactionstwo");
              },
            },
          ],
          { cancelable: false }
        );
      },
      onError: () => {
        // Works on both Android and iOS
        Alert.alert(
          "ინფორმაცია არასწორია",
          "გთხოვთ შეიყვანოთ ყველა ველი",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      },
    }
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputs}
      >
        <TextInput
          style={styles.input}
          value={username.toString()}
          onChangeText={(text) => setUsername(text)}
          keyboardType="email-address"
          placeholder="მომხმარებელი"
        />
        <TextInput
          style={styles.input}
          value={title.toString()}
          onChangeText={(text) => setTitle(text)}
          placeholder="დასახელება"
        />
        <TextInput
          style={styles.input}
          value={value.toString()}
          onChangeText={(text) => setValue(text)}
          keyboardType="number-pad"
          placeholder="ფასი"
        />

        <TextInput
          style={styles.input}
          value={number.toString()}
          onChangeText={(text) => setNumber(text)}
          keyboardType="phone-pad"
          placeholder="მობილურის ნომერი"
        />

        <View style={styles.inputDate}>
          <Text
            style={{
              flex: 1,
              flexDirection: "row",
              alignSelf: "center",
              color: "#d5d5d5",
            }}
          >
            დაბრუნების თარიღი:
          </Text>
          {show && (
            <DateTimePicker
              style={{ flex: 1, alignSelf: "center" }}
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              locale="ka-GE"
              onChange={onChange}
            />
          )}
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity onPress={() => mutation.mutate(title, value, user)}>
            <LinearGradient
              style={styles.button}
              colors={["#7BE495", "#329D9C"]}
            >
              <Text style={styles.buttonText}>დამატება</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}></View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const initialLayout = { width: Dimensions.get("window").width };

export default function TabViewExample({
  route,
  navigation,
  user,
  index,
  setIndex,
}) {
  const [category, selectCategory] = React.useState("1");

  const [modalVisible, setModalVisible] = React.useState(false);

  const [routes] = React.useState([
    { key: 1, title: "ხარჯი" },
    { key: 2, title: "შემოსავალი" },
    { key: 3, title: "ვალი" },
  ]);
  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case 1:
        return (
          <FirstRoute
            setModalVisible={setModalVisible}
            selectCategory={selectCategory}
            jumpTo={jumpTo}
          />
        );
      case 2:
        return (
          <SecondRoute
            setModalVisible={setModalVisible}
            selectCategory={selectCategory}
            jumpTo={jumpTo}
          />
        );
      case 3:
        return (
          <ThirdRoute
            setModalVisible={setModalVisible}
            selectCategory={selectCategory}
            user={user}
            jumpTo={jumpTo}
          />
        );
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "white" }}
      style={{ backgroundColor: "#FFFFFF" }}
      activeColor="#215273"
      inactiveColor="#8AA9BB"
      renderLabel={({ route, focused, color }) => (
        <Text style={{ fontSize: 12, color }}>{route.title}</Text>
      )}
    ></TabBar>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <CategoryModal
        selectedCategory={category}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        user={user}
      ></CategoryModal>
      <View style={styles.heading}>
        <Text style={styles.headerText}>აირჩიე კატეგორია</Text>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputs: {
    flex: 1,
    justifyContent: "flex-end",
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
  input: {
    width: "82%",
    height: 50,
    alignSelf: "center",

    marginTop: 20,
    padding: 15,
    shadowColor: "#329D9C",
    borderRadius: 13,
    shadowOffset: {
      width: 0,
      height: 13,
    },
    shadowOpacity: 0.08,
    shadowRadius: 34,
    elevation: 5,
    backgroundColor: "#FFF",
  },
  inputDate: {
    width: "82%",
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 15,
    shadowColor: "#329D9C",
    borderRadius: 13,

    shadowOffset: {
      width: 0,
      height: 13,
    },
    shadowOpacity: 0.08,
    shadowRadius: 34,
    elevation: 5,
    backgroundColor: "#FFF",
    flexDirection: "row",
  },
  button: {
    width: "82%",
    alignSelf: "center",
    padding: 15,
    borderRadius: 15,
    marginTop: 25,
  },

  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 17,
    fontFamily: "NinoBold",
  },
});
