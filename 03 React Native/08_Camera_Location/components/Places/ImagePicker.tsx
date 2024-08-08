import React from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus, ImagePickerResult } from "expo-image-picker";

import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";

function ImagePicker({ onTakeImage }: { onTakeImage: (imageUri: string) => void }): JSX.Element {
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  const [pickedImage, setPickedImage] = React.useState<string>("");

  async function verifyPermissions(): Promise<boolean> {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permissions!", "You need to grant camera permissions to use this app.");
      return false;
    }

    return true;
  }

  async function takeImageHandler(): Promise<void> {
    const hasPermission: boolean = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image: ImagePickerResult = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    // console.log("image:", JSON.stringify(image));
    setPickedImage(image.assets?.[0]?.uri as string);
    onTakeImage(image.assets?.[0]?.uri as string);
  }

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
