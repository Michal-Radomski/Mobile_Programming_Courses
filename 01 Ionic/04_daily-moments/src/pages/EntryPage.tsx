import React from "react";
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from "@ionic/react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "@firebase/firestore";

// import { entries } from "../data";
import { Entry, RouteParams, toEntry } from "../Interfaces.d";
import { firestore } from "../firebase";

const EntryPage: React.FC = () => {
  const { id } = useParams<RouteParams>();

  // const entry = entries.find((entry) => entry.id === id);
  // console.log({ entry });

  const [entry, setEntry] = React.useState<Entry>({} as Entry);

  React.useEffect(() => {
    const entryRef = doc(firestore, "entries", id);
    getDoc(entryRef).then((doc) => setEntry(toEntry(doc)));
  }, [id]);

  if (!entry) {
    throw new Error(`No such entry: ${id}`);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Daily Moments - Entry {entry?.title}</IonTitle>
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
