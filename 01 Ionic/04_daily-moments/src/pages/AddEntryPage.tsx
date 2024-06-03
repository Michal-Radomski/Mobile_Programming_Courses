import React from "react";
import { addDoc, collection } from "@firebase/firestore";
import { getDownloadURL, ref as storageRef, uploadBytes } from "@firebase/storage";
// import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
import { useHistory } from "react-router";
import { useAuth } from "../auth";
import { firestore, storage } from "../firebase";

// async function savePicture(blobUrl, userId) {
//   const pictureRef = storageRef(storage, `/users/${userId}/pictures/${Date.now()}`);
//   const response = await fetch(blobUrl);
//   const blob = await response.blob();
//   const snapshot = await uploadBytes(pictureRef, blob);
//   const url = getDownloadURL(snapshot.ref);
//   console.log('saved picture:', url);
//   return url;
// }

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();

  const [date, setDate] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [pictureUrl, setPictureUrl] = React.useState<string>("/assets/placeholder.png");
  const [description, setDescription] = React.useState<string>("");

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(
    () => () => {
      if (pictureUrl.startsWith("blob:")) {
        URL.revokeObjectURL(pictureUrl);
      }
    },
    [pictureUrl]
  );

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files.item(0);
  //     const pictureUrl = URL.createObjectURL(file);
  //     setPictureUrl(pictureUrl);
  //   }
  // };

  // const handlePictureClick = async () => {
  //   if (isPlatform('capacitor')) {
  //     try {
  //       const photo = await Camera.getPhoto({
  //         resultType: CameraResultType.Uri,
  //         source: CameraSource.Prompt,
  //         width: 600,
  //       });
  //       setPictureUrl(photo.webPath);
  //     } catch (error) {
  //       console.log('Camera error:', error);
  //     }
  //   } else {
  //     fileInputRef.current.click();
  //   }
  // };

  const handleSave = async () => {
    const entriesRef = collection(firestore, "users", userId!, "entries");
    const entryData = { date, title, pictureUrl, description };
    // if (!pictureUrl.startsWith("/assets")) {
    //   entryData.pictureUrl = await savePicture(pictureUrl, userId);
    // }
    const entryRef = await addDoc(entriesRef, entryData);
    console.log("saved:", entryRef.id);
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add Entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonInput type="date" value={date} onIonChange={(event) => setDate(event.detail.value as string)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput value={title} onIonChange={(event) => setTitle(event.detail.value as string)} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Picture</IonLabel>
            <br />
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              // onChange={handleFileChange}
            />
            <img
              src={pictureUrl}
              alt=""
              style={{ cursor: "pointer" }}
              // onClick={handlePictureClick}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea value={description} onIonChange={(event) => setDescription(event.detail.value as string)} />
          </IonItem>
          <IonButton expand="block" onClick={handleSave}>
            Save
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
