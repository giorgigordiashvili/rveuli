import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Dates from "../Dates";
import moment from "moment";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { userProvider } from "../../store/user/auth";

export default function HomeTab({ navigation, user, setIndex }) {
  const { currentUser, setCurrentUser, logOut } = userProvider();
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [debt, setDebt] = useState(0);
  const [isCalendarVisible, setIsCalendarVisible] = React.useState("none");
  const [focus, setFocus] = React.useState("startDate");
  const [startDate, setStartDate] = React.useState(
    moment().subtract(1, "months")
  );
  const [endDate, setEndDate] = React.useState(moment());
  const [expense, setExpense] = useState(0);
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery("todos", async () => {
    const { data } = await axios.get(
      `https://rveuli.magsman.ge/api/transactions-by-range`
    );

    return data;
  });
  const { data: balanceData, isLoading: isBalanceLoading } = useQuery(
    "balance",
    async () => {
      const link = `https://rveuli.magsman.ge/api/getSummary`;
      console.log(link);
      const { data } = await axios.get(link);
      setExpense(data.expense);
      setIncome(data.income);
      setDebt(data.debt);
      setBalance(data.income - data.expense - data.debt);

      return data;
    }
  );

  if (isLoading) {
    return (
      <View
        style={{
          backgroundColor: "#FFFFFF",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Image
          style={{ width: "20%", alignSelf: "center" }}
          resizeMode="contain"
          source={require("../../assets/spinner.gif")}
        ></Image>
      </View>
    );
  }
  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

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
    15: "ვალი",
  };
  let dataPieTwo = false;

  // if (balanceData?.categories_summary.length > 3) {
  //   dataPieTwo = [
  //     {
  //       name: categoryNames[
  //         parseInt(balanceData.categories_summary[0].category_id)
  //       ],
  //       population: balanceData.categories_summary[0].amount,
  //       color: "#47CACC",
  //       legendFontColor: "#7F7F7F",
  //       legendFontSize: 15,
  //     },
  //     {
  //       name:
  //         categoryNames[
  //           parseInt(balanceData.categories_summary[1].category_id)
  //         ] || "",
  //       population: balanceData.categories_summary[1].amount,
  //       color: "#E7B7C8",
  //       legendFontColor: "#7F7F7F",
  //       legendFontSize: 15,
  //     },
  //     {
  //       name:
  //         categoryNames[
  //           parseInt(balanceData.categories_summary[2].category_id)
  //         ] || "",
  //       population: balanceData.categories_summary[2].amount,
  //       color: "#FFBE88",
  //       legendFontColor: "#7F7F7F",
  //       legendFontSize: 15,
  //     },
  //     {
  //       name: "სხვა",
  //       population: balanceData.categories_summary[3].amount,
  //       color: "#C2E7B7",
  //       legendFontColor: "#7F7F7F",
  //       legendFontSize: 15,
  //     },
  //   ];
  // }

  const isDateBlocked = (date) => null;
  const onDatesChange = ({ startDate, endDate, focusedInput }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    if (endDate) {
      setIsCalendarVisible("none");
    }
    setFocus(focusedInput);
    queryClient.invalidateQueries("balance");
  };
  return (
    <TouchableWithoutFeedback onPress={() => setIsCalendarVisible(true)}>
      <View style={{ flex: 1 }}>
        <View
          style={{ position: "absolute", top: 100, zIndex: 3, width: "100%" }}
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

        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.topBar}>
              <View>
                <Text style={styles.hello}>გამარჯობა,</Text>
                <Text style={styles.hello}>{currentUser.user.username}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.topBar}>
              <View style={styles.icons}>
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                  onPress={() => {
                    setIsCalendarVisible(
                      isCalendarVisible == "flex" ? "none" : "flex"
                    );
                  }}
                >
                  <Text style={{ paddingRight: 20 }}>
                    {moment(startDate).format("DD MMM")} -{" "}
                    {moment(endDate).format("DD MMM")}
                  </Text>
                  <Image
                    style={styles.icon}
                    source={require("../../assets/calendar-icon.png")}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={styles.balanceText}>ჩემი ბალანსი</Text>
              {balanceData ? (
                <Text style={styles.balanceNumber}>
                  {balanceData.income - balanceData.debt - balanceData.expense}{" "}
                  ლარი
                </Text>
              ) : (
                <View></View>
              )}
            </View>
            <View></View>
          </View>
          <View style={styles.plusShadow}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CategoryTab", { switchTo: 2, user: user });
                setIndex(1);
              }}
              style={styles.plusContainer}
            >
              <View>
                <Text>შემოსავალი</Text>
                <Text>{income} ლარი</Text>
              </View>
              <View>
                <Image source={require("../../assets/plus.png")}></Image>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.plusShadow}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CategoryTab", { switchTo: 1, user: user });
                setIndex(2);
              }}
              style={styles.plusContainer}
            >
              <View>
                <Text>ვალი</Text>
                <Text>{debt} ლარი</Text>
              </View>
              <View>
                <Image source={require("../../assets/plus.png")}></Image>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.plusShadow}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CategoryTab", { switchTo: 3, user: user });
                setIndex(0);
              }}
              style={styles.plusContainer}
            >
              <View>
                <Text>ხარჯი</Text>
                <Text>{expense} ლარი</Text>
              </View>
              <View style={styles.notf}>
                <Image
                  style={styles.notf}
                  source={require("../../assets/plus.png")}
                ></Image>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={styles.balanceText}>ჩემი სტატისტიკა</Text>
            </View>
          </View>
          {dataPieTwo ? (
            <PieChart
              data={dataPieTwo}
              width={Dimensions.get("window").width}
              height={220}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              absolute
            />
          ) : (
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={styles.balanceTextTwo}>
                  მონაცემები არ არის შეყვანილი{" "}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  notf: {
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    paddingVertical: 40,
    justifyContent: "space-between",
  },
  hello: {
    color: "#215273",
    fontSize: 14,
    fontFamily: "NinoBold",
    paddingLeft: 10,
  },
  balanceText: {
    paddingHorizontal: 20,
    color: "#5A87A0",
    fontSize: 16,
    fontFamily: "NinoBold",
    paddingVertical: 10,
  },
  balanceTextTwo: {
    paddingHorizontal: 20,
    color: "#000",
    fontSize: 13,

    paddingVertical: 10,
  },
  balanceNumber: {
    paddingHorizontal: 20,
    color: "#215273",
    fontSize: 35,
    fontFamily: "Nino",
    paddingBottom: 40,
  },
  plusContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  plusShadow: {
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
});
const chartConfig = {
  backgroundColor: "#FFFFFF",

  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};
