import React from "react";
import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { getDamxmareebi } from "../../services/profileService";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
export default function CalendarTab() {
  const { isLoading, error, data } = useQuery("damxmareebi", getDamxmareebi);

  if (isLoading) return <Text>Loading</Text>;

  if (error) return <Text>Error</Text>;

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <LinearGradient
            colors={["#FF777B", "#FA696E"]}
            style={styles.rightAction}
          >
            <Feather name={"trash"} size={32} color={"#FFFFFF"}></Feather>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity>
          <LinearGradient
            colors={["#7BE495", "#329D9C"]}
            style={styles.rightAction}
          >
            <Feather name={"edit"} size={32} color={"#FFFFFF"}></Feather>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        flex: 1,
        paddingTop: 16,
      }}
    >
      <Text
        style={{
          fontSize: 35,
          fontFamily: "FiragoBold",
          color: "#215273",
          marginHorizontal: 32,
        }}
      >
        გუნდის
      </Text>
      <Text
        style={{
          fontSize: 35,
          fontFamily: "FiragoBold",
          color: "#215273",
          marginHorizontal: 32,
        }}
      >
        წევრები
      </Text>

      {data.data.map(({ username }) => (
        <Swipeable renderRightActions={renderRightActions}>
          <View
            style={{
              marginVertical: 10,
              marginHorizontal: 32,
              padding: 12,
              borderWidth: 0.5,
              borderColor: "rgba(1,180,175,0.16)",
              paddingVertical: 32,
              borderRadius: 14,

              backgroundColor: "#FFF",
              elevation: 3,
            }}
          >
            <Text
              style={{
                color: "rgba(138,149,158,0.5)",
                fontFamily: "FiragoBold",
              }}
            >
              ჩემი მაღაზია
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  color: "#215273",
                  fontSize: 14,
                  fontFamily: "FiragoBold",
                }}
              >
                {username}
              </Text>
              <Text
                style={{
                  color: "rgba(138,149,158,0.5)",
                  fontFamily: "FiragoBold",
                }}
              >
                გამყიდველი
              </Text>
            </View>
          </View>
        </Swipeable>
      ))}
    </SafeAreaView>
  );
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
    marginVertical: 10,
    backgroundColor: "red",
    paddingVertical: 32,
    marginHorizontal: 5,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
});
