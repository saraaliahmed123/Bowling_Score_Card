import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const Button = ({ setDisplay, onPress, text, moveTo, action }) => {
  // console.log(moveTo);
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgb(116,148, 185)",
    padding: 10,
    borderRadius: 7,
    alignItems: "center",
    width: 100,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 25
  },
  buttonText: {
    color: "white",
  },
});

export default Button;
