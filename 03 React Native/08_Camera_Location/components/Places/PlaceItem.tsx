import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const PlaceItem = ({ place, onSelect }: { place: PlaceI; onSelect?: () => void }): JSX.Element => {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({});
