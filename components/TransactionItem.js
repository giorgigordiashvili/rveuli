import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import Moment from "moment";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const RightActions = ({ id, setModalVisible }) => {
  const deleteTransaction = () => {
    console.log(data);
  };
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteTransaction);
  return (
    <View style={styles.rightActions}>
      <TouchableOpacity
        onPress={async () => {
          Alert.alert(
            "შეტყობინება",
            "გსურთ ტრანზაქციის წაშლა?",
            [
              {
                text: "დიახ",
                onPress: () => {
                  const sendData = {
                    transaction_id: id,
                  };
                  const headers = {
                    "Content-Type": "application/x-www-form-urlencoded",
                  };

                  axios
                    .delete(
                      `https://rveuli.magsman.ge/api/delete-transaction`,
                      { data: sendData },
                      headers
                    )
                    .then((res) => {
                      queryClient.refetchQueries("todos");
                      queryClient.refetchQueries("balance");
                      queryClient.refetchQueries("transactionstwo");
                      Alert.alert(
                        "შეტყობინება",
                        "ტრანზაქცია წარმატებით წაიშალა",
                        [{ text: "OK", onPress: () => {} }],
                        { cancelable: false }
                      );
                    })
                    .catch((error) => {
                      console.log(error);
                      // Works on both Android and iOS
                      Alert.alert(
                        "შეტყობინება",
                        "წაშლისას დაფიქსირდა შეცდომა",
                        [
                          {
                            text: "OK",
                            onPress: () => console.log("OK Pressed"),
                          },
                        ],
                        { cancelable: false }
                      );
                    });
                },
              },
              { text: "არა", onPress: () => {} },
            ],
            { cancelable: true }
          );
        }}
      >
        <LinearGradient
          colors={["#FF777B", "#FA696E"]}
          style={styles.rightAction}
        >
          <Feather name={"trash"} size={24} color={"#FFFFFF"}></Feather>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default function TransactionItem({
  category,
  setModalVisible,
  startDate,
  endDate,
  setDabruneba,
  setMobile,
  setTransactionName,
  setUsername,
  setTransactionType,
  setNumber,
  setCategoryId,
}) {
  const queryClient = useQueryClient();
  let arr = [];

  const { isLoading, isError, data, error } = useQuery(
    "transactionstwo",
    async () => {
      const { data } = await axios.get(
        `https://rveuli.magsman.ge/api/transactions-by-range`
      );
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
          source={require("../assets/spinner.gif")}
        ></Image>
      </View>
    );
  }
  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  if (category) {
    Object.values(data).map((items) => {
      if (Object.values(items).length) {
        Object.values(items).map((item) => {
          return item.transaction_type == category &&
            Moment(item.created_at).isAfter(startDate) &&
            Moment(item.created_at).isBefore(endDate)
            ? arr.push(item)
            : null;
        });
      }
    });
  } else {
    Object.values(data).map((items) => {
      if (Object.values(items).length) {
        Object.values(items).map((item) =>
          Moment(item.created_at).isAfter(startDate) &&
          Moment(item.created_at).isBefore(endDate)
            ? arr.push(item)
            : null
        );
      }
    });
  }

  return arr.map((item, i) => (
    <Swipeable
      renderRightActions={() => (
        <RightActions
          setModalVisible={setModalVisible}
          transaction_name={item.transaction_name}
          number={item.number}
          quantity={item.raodenoba}
          id={item.id}
        />
      )}
      key={i}
    >
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          setModalVisible(true);
          setMobile(item.mobile);
          setUsername(item.username);
          setTransactionName(item.transaction_name);
          setDabruneba(item.dabrunebis_tarigi);
          setTransactionType(item.transaction_type);
          setNumber(item.number);
          setCategoryId(item.category_id);
        }}
      >
        <View style={styles.leftContainer}>
          <View style={styles.itemImage}>
            <Image source={categories[item.category_id - 1]} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.transaction_name}</Text>
            <Text style={styles.date}>
              {Moment(item.created_at).format("DD-MM-YYYY HH:MM")}
            </Text>
          </View>
        </View>
        <View style={styles.value}>
          <Text>₾ {item.number}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  ));
}

const styles = StyleSheet.create({
  leftContainer: {
    flexDirection: "row",
  },
  item: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    flex: 1,
    margin: 10,
    justifyContent: "space-between",
    borderRadius: 19,
  },
  textContainer: {
    justifyContent: "space-between",
    margin: 10,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  itemImage: {
    alignSelf: "center",
    margin: 10,
  },
  itemText: {
    alignSelf: "center",
  },
  title: {
    color: "#55C595",
    fontFamily: "FiragoBook",
    fontSize: 15,
  },
  date: {
    fontSize: 10,
  },
  value: {
    alignSelf: "center",
    marginRight: 20,
    fontFamily: "FiragoBold",
    color: "#215273",
  },
  rightAction: {
    backgroundColor: "red",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 14,
    marginRight: 12,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
});

const categories = [
  require("../assets/1.png"),
  require("../assets/2.png"),
  require("../assets/3.png"),
  require("../assets/4.png"),
  require("../assets/5.png"),
  require("../assets/6.png"),
  require("../assets/7.png"),
  require("../assets/8.png"),
  require("../assets/9.png"),
  require("../assets/10.png"),
  require("../assets/11.png"),
  require("../assets/12.png"),
  require("../assets/13.png"),
  require("../assets/14.png"),
  require("../assets/15.png"),
];
