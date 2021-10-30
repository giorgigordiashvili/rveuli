import * as React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Alert,
  ScrollView,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import CategoryModalEdit from "../Modals/CategoryModalEdit";
import TransactionItem from "../TransactionItem";
import Dates from "../Dates";
import moment from "moment";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import axios from "axios";
import ValiModal from "../Modals/ValiModal";
import { userProvider } from "../../store/user/auth";

const FirstRoute = ({ setModalVisible, startDate, endDate, user }) => {
  const [valiModalVisible, setValiModalVisible] = React.useState(false);
  const [dabruneba, setDabruneba] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [transactionName, setTransactionName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [transactionType, setTransactionType] = React.useState("");
  return (
    <ScrollView style={[styles.scene]}>
      <TransactionItem
        setTransactionType={setTransactionType}
        setNumber={setNumber}
        setCategoryId={setCategoryId}
        setDabruneba={setDabruneba}
        setMobile={setMobile}
        setTransactionName={setTransactionName}
        setUsername={setUsername}
        setModalVisible={setValiModalVisible}
        category={null}
        startDate={startDate}
        endDate={endDate}
      ></TransactionItem>
      <ValiModal
        transactionType={transactionType}
        number={number}
        categoryId={categoryId}
        dabruneba={dabruneba}
        mobile={mobile}
        transactionName={transactionName}
        username={username}
        modalVisible={valiModalVisible}
        setModalVisible={setValiModalVisible}
      ></ValiModal>
    </ScrollView>
  );
};

const SecondRoute = ({ setModalVisible, startDate, endDate, user }) => {
  const [valiModalVisible, setValiModalVisible] = React.useState(false);
  const [dabruneba, setDabruneba] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [transactionName, setTransactionName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [transactionType, setTransactionType] = React.useState("");
  return (
    <ScrollView style={[styles.scene]}>
      <TransactionItem
        setTransactionType={setTransactionType}
        setNumber={setNumber}
        setCategoryId={setCategoryId}
        setDabruneba={setDabruneba}
        setMobile={setMobile}
        setTransactionName={setTransactionName}
        setUsername={setUsername}
        setModalVisible={setValiModalVisible}
        category={"1"}
        startDate={startDate}
        endDate={endDate}
      ></TransactionItem>
      <ValiModal
        transactionType={transactionType}
        number={number}
        categoryId={categoryId}
        dabruneba={dabruneba}
        mobile={mobile}
        transactionName={transactionName}
        username={username}
        modalVisible={valiModalVisible}
        setModalVisible={setValiModalVisible}
      ></ValiModal>
    </ScrollView>
  );
};

const ThirdRoute = ({ setModalVisible, startDate, endDate, user }) => {
  const [valiModalVisible, setValiModalVisible] = React.useState(false);
  const [dabruneba, setDabruneba] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [transactionName, setTransactionName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [transactionType, setTransactionType] = React.useState("");
  return (
    <ScrollView style={[styles.scene]}>
      <TransactionItem
        setTransactionType={setTransactionType}
        setNumber={setNumber}
        setCategoryId={setCategoryId}
        setDabruneba={setDabruneba}
        setMobile={setMobile}
        setTransactionName={setTransactionName}
        setUsername={setUsername}
        setModalVisible={setValiModalVisible}
        category={"2"}
        startDate={startDate}
        endDate={endDate}
      ></TransactionItem>
      <ValiModal
        transactionType={transactionType}
        number={number}
        categoryId={categoryId}
        dabruneba={dabruneba}
        mobile={mobile}
        transactionName={transactionName}
        username={username}
        modalVisible={valiModalVisible}
        setModalVisible={setValiModalVisible}
      ></ValiModal>
    </ScrollView>
  );
};

const ForthRoute = ({ setModalVisible, startDate, endDate, user }) => {
  const [valiModalVisible, setValiModalVisible] = React.useState(false);
  const [dabruneba, setDabruneba] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [transactionName, setTransactionName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [transactionType, setTransactionType] = React.useState("");
  return (
    <ScrollView style={[styles.scene]}>
      <TransactionItem
        setTransactionType={setTransactionType}
        setNumber={setNumber}
        setCategoryId={setCategoryId}
        setDabruneba={setDabruneba}
        setMobile={setMobile}
        setTransactionName={setTransactionName}
        setUsername={setUsername}
        setModalVisible={setValiModalVisible}
        category={"3"}
        startDate={startDate}
        endDate={endDate}
      ></TransactionItem>
      <ValiModal
        transactionType={transactionType}
        number={number}
        categoryId={categoryId}
        dabruneba={dabruneba}
        mobile={mobile}
        transactionName={transactionName}
        username={username}
        modalVisible={valiModalVisible}
        setModalVisible={setValiModalVisible}
      ></ValiModal>
    </ScrollView>
  );
};

const initialLayout = { width: Dimensions.get("window").width };

export default function TabViewExample() {
  const { currentUser, setCurrentUser, logOut } = userProvider();

  const [modalVisible, setModalVisible] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [focus, setFocus] = React.useState("startDate");
  const [startDate, setStartDate] = React.useState(
    moment().subtract(11, "months")
  );
  const [endDate, setEndDate] = React.useState(moment());
  const [isCalendarVisible, setIsCalendarVisible] = React.useState("none");

  const isDateBlocked = (date) => null;

  const onDatesChange = ({ startDate, endDate, focusedInput }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    if (endDate) {
      setIsCalendarVisible("none");
    }
    setFocus(focusedInput);
  };

  const [routes] = React.useState([
    { key: "first", title: "ყველა" },
    { key: "second", title: "ხარჯი" },
    { key: "third", title: "შემოსავალი" },
    { key: "forth", title: "ვალი" },
  ]);
  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "first":
        return (
          <FirstRoute
            setModalVisible={setModalVisible}
            startDate={startDate}
            endDate={endDate}
            jumpTo={jumpTo}
          />
        );
      case "second":
        return (
          <SecondRoute
            setModalVisible={setModalVisible}
            startDate={startDate}
            endDate={endDate}
            jumpTo={jumpTo}
          />
        );
      case "third":
        return (
          <ThirdRoute
            setModalVisible={setModalVisible}
            startDate={startDate}
            endDate={endDate}
            jumpTo={jumpTo}
          />
        );
      case "forth":
        return (
          <ForthRoute
            setModalVisible={setModalVisible}
            startDate={startDate}
            endDate={endDate}
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View
        style={{ position: "absolute", top: 100, zIndex: 99, width: "100%" }}
      >
        <View style={{ display: isCalendarVisible }}>
          <Dates
            onDatesChange={onDatesChange}
            isDateBlocked={isDateBlocked}
            startDate={startDate}
            endDate={endDate}
            focusedInput={focus}
            range
          />
        </View>
      </View>
      <CategoryModalEdit
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      ></CategoryModalEdit>
      <View style={styles.heading}>
        <Text style={styles.headerText}>ტრანზაქციები</Text>

        <View style={styles.icons}>
          <TouchableOpacity
            onPress={() =>
              setIsCalendarVisible(
                isCalendarVisible == "flex" ? "none" : "flex"
              )
            }
          >
            <Image
              style={styles.icon}
              source={require("../../assets/calendar-icon.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TabView
        swipeEnabled={false}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 30,
    paddingRight: 30,
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
  icon: {
    marginLeft: 20,
  },
});
