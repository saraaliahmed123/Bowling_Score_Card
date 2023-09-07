import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Entypo, Feather, AntDesign, MaterialIcons } from "@expo/vector-icons";

const InputBox = ({defaultVal, setter, icon, keyboard, index, shot, holder }) => {
  // console.log(index+"here")
  return (
      <View style={ shot ? styles.inputBoxThird : styles.inputBox}>
        {!!icon && <View style={styles.iconView}>{icon}</View>}
        <TextInput
          style={shot ? styles.inputThird : styles.inputOther}
          onEndEditing={(text) => {
            setter(text.nativeEvent.text, index);
          }}
          defaultValue={defaultVal}
          keyboardType={keyboard}
          placeholder={holder ? '0' : ''}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: "#E7EDF3",
    // width: 350,
    height: 55,
    // marginLeft: 25,
    marginHorizontal: 25,
    marginTop: 15,
    marginBottom: 20,
    borderRadius: 7,
    display: "flex",
    flexDirection: "row",
  },
  inputOther: {
    padding: 15,
    width: 350,
  },
  iconView: {
    borderRightColor: 'rgb(116,148, 185)',
    borderRightWidth: 2,
    padding: 15,
  },
  inputBoxThird: {
    backgroundColor: "#E7EDF3",
    height: 55,
    borderRadius: 7,
    display: "flex",
    flexDirection: "row",
    width: 150,
    marginTop: 15,
    marginBottom: 20,
  },
  inputThird: {
    marginLeft: 10,
    width: 130,
  },
});

export default InputBox;