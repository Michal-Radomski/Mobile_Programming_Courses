import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useHistory, useParams } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "@firebase/firestore";
import { trash as trashIcon } from "ionicons/icons";

// import { entries } from "../data";
import { Entry, RouteParams, toEntry } from "../Interfaces.d";
import { firestore } from "../firebase";
import { useAuth } from "../auth";

const EntryPage: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const { userId } = useAuth();
  const history = useHistory();

  // const entry = entries.find((entry) => entry.id === id);
  // console.log({ entry });

  const [entry, setEntry] = React.useState<Entry>({} as Entry);

  React.useEffect(() => {
    const entryRef = doc(firestore, "users", userId!, "entries", id);
    getDoc(entryRef).then((doc) => setEntry(toEntry(doc)));
  }, [id, userId]);

  if (!entry) {
    throw new Error(`No such entry: ${id}`);
  }

  const handleDelete = async (): Promise<void> => {
    const entryRef = doc(firestore, "users", userId!, "entries", id);
    await deleteDoc(entryRef);
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Daily Moments - Entry {entry?.title}</IonTitle>

          <IonButtons slot="end">
            <IonButton onClick={handleDelete}>
              <IonIcon icon={trashIcon} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Go to <IonRouterLink routerLink={"/home"}>Home</IonRouterLink> */}
        {entry?.description}
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
