import React from "react";
import { TextInput, View } from "react-native";

import PrimaryButton from "../components/PrimaryButton";

const StartGameScreen = (): JSX.Element => {
  return (
    <React.Fragment>
      <View>
        <TextInput />
        <PrimaryButton>Reset</PrimaryButton>
        <PrimaryButton>Confirm</PrimaryButton>
      </View>
    </React.Fragment>
  );
};

export default StartGameScreen;
