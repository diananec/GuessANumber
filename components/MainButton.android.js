import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity, //we will use this on IOS
  TouchableNativeFeedback, //we will use this on Android
  Platform,
} from "react-native";
import colors from "../constants/colors";

const MainButton = (props) => {
  let ButtonComponent = TouchableOpacity;
  if (Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  button: {
    backgroundColor: colors.buttons,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontFamily: "open-sans",
    fontSize: 18,
  },
});
export default MainButton;
