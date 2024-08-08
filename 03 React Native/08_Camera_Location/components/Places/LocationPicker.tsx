import React from "react";
import { Alert, View, StyleSheet, Image, Text } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus, LocationObject } from "expo-location";
import { useNavigation, useRoute, useIsFocused, ParamListBase, RouteProp } from "@react-navigation/native";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import { getAddress, getMapPreview } from "../../util/location";

function LocationPicker({ onPickLocation }: { onPickLocation: Function }): JSX.Element {
  const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

  const navigation = useNavigation<{
    navigate(arg0: string): unknown;
  }>();

  const isFocused: boolean = useIsFocused();
  const route: RouteProp<ParamListBase> = useRoute();

  const [pickedLocation, setPickedLocation] = React.useState<LocationI>({} as LocationI);

  React.useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: (route.params as any).pickedLat as number,
        lng: (route.params as any).pickedLng as number,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  React.useEffect(() => {
    async function handleLocation(): Promise<void> {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation.lat, pickedLocation.lng);
        onPickLocation({ ...pickedLocation, address: address });
      }
    }

    handleLocation();
  }, [pickedLocation, onPickLocation]);

  async function verifyPermissions(): Promise<boolean> {
    if (locationPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permissions!", "You need to grant location permissions to use this app.");
      return false;
    }

    return true;
  }

  async function getLocationHandler(): Promise<void> {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location: LocationObject = await getCurrentPositionAsync();
    // console.log({ location });
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler(): void {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
