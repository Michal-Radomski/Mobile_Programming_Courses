import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/Place";

const PlaceForm = ({ onCreatePlace }: { onCreatePlace: Function }): JSX.Element => {
  const [enteredTitle, setEnteredTitle] = React.useState<string>("");
  const [selectedImage, setSelectedImage] = React.useState<string>("");
  const [pickedLocation, setPickedLocation] = React.useState<PlaceI | null>(null);

  function changeTitleHandler(enteredText: React.SetStateAction<string>): void {
    setEnteredTitle(enteredText);
  }

  function takeImageHandler(imageUri: string): void {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = React.useCallback((location: PlaceI) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler(): void {
    // console.log("enteredTitle:", enteredTitle);
    // console.log("selectedImage:", selectedImage);
    // console.log("pickedLocation:", pickedLocation);
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation!);
    // console.log("placeData:", placeData);
    onCreatePlace(placeData);
  }

  return (
    <React.Fragment>
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
        </View>
        <ImagePicker onTakeImage={takeImageHandler} />
        <LocationPicker onPickLocation={pickLocationHandler} />
        <Button onPress={savePlaceHandler}>Add Place</Button>
      </ScrollView>
    </React.Fragment>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
