import React from "react";
import { Text, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CategoryItem({
  name,
  icon,
  setModalVisible,
  selectCategory,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        selectCategory(icon);
        setModalVisible(true);
      }}
      style={styles.item}
    >
      <Image source={icons[icon]}></Image>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    paddingVertical: 20,
  },
  text: {
    paddingTop: 8,
    fontSize: 11,
    fontFamily: "FiragoLight",
  },
});

const icons = {
  1: require("../assets/1.png"),
  2: require("../assets/2.png"),
  3: require("../assets/3.png"),
  4: require("../assets/4.png"),
  5: require("../assets/5.png"),
  6: require("../assets/6.png"),
  7: require("../assets/7.png"),
  8: require("../assets/8.png"),
  9: require("../assets/9.png"),
  10: require("../assets/10.png"),
  11: require("../assets/11.png"),
  12: require("../assets/12.png"),
  13: require("../assets/13.png"),
  14: require("../assets/14.png"),
};
