import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import BodyText from "../components/BodyText";
import Card from "../components/Card";
import colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 4
  );

  const updateLayout = () => {
    setButtonWidth(Dimensions.get("window").width / 4);
  };

  Dimensions.addEventListener("change", updateLayout);
  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, "")); //replaces all the values that are not between 0-9 with an empty string
    //adica tot ce nu e numeric, ci e virgula sau punct etc, il sterge automat
  };

  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid number !", "Number has to be between 1 and 99.", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setEnteredValue("");
    setSelectedNumber(chosenNumber);
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected </BodyText>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>
          START GAME
        </MainButton>
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <TitleText style={styles.title}>Start a New Game !</TitleText>
            <Card style={styles.inputContainer}>
              <View style={styles.inputContainer}>
                <BodyText style={styles.text}>Select a Number !</BodyText>
                <Input
                  style={styles.input}
                  blurOnSubmit
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="number-pad"
                  maxLength={2}
                  onChangeText={numberInputHandler}
                  value={enteredValue}
                />
                <View style={styles.buttonContainer}>
                  <View style={{ width: buttonWidth }}>
                    <Button
                      title="Reset"
                      onPress={resetInputHandler}
                      color={colors.accent}
                    />
                  </View>
                  <View style={{ width: buttonWidth }}>
                    <Button
                      title="Confirm"
                      onPress={confirmInputHandler}
                      color={colors.secondary}
                    />
                  </View>
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  inputContainer: {
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  //button: {
  //width: 100,
  // width: Dimensions.get("window").width / 4, //this adjusts dynamically
  //depending on the size of the device we re using (the number of pixels it have)
  // margin: 15,
  //},
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  text: {
    fontFamily: "open-sans-bold",
  },
});

export default StartGameScreen;
