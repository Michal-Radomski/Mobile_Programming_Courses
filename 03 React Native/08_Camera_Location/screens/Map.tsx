import React from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker } from "react-native-maps";

import IconButton from "../components/UI/IconButton";

function Map({ navigation }: { navigation: any }): JSX.Element {
  // console.log("navigation:", navigation);

  const [selectedLocation, setSelectedLocation] = React.useState<LocationI | null>(null);

  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event: MapPressEvent): void {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = React.useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location picked!", "You have to pick a location (by tapping on the map) first!");
      return;
    }

    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }: { tintColor: string }) => {
        // console.log({ tintColor });
        return <IconButton icon="save" size={24} color={tintColor} onPress={savePickedLocationHandler} />;
      },
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler}>
      {selectedLocation ? (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      ) : null}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
