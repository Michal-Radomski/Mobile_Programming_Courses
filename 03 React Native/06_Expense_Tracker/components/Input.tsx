import { Text, TextInput, View } from "react-native";

import { ObjectI } from "../App";

function Input({ label, textInputConfig }: { label: string; textInputConfig: ObjectI }): JSX.Element {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput {...textInputConfig} />
    </View>
  );
}

export default Input;
