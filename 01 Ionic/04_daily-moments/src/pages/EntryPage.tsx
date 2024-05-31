import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { useParams } from "react-router-dom";

import { entries } from "../data";

const EntryPage: React.FC = () => {
  const { id } = useParams<RouteParams>();

  const entry = entries.find((entry) => entry.id === id);
  // console.log({ entry });

  if (!entry) {
    throw new Error(`No such entry: ${id}`);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Daily Moments - Entry {entry?.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Go to <IonRouterLink routerLink={"/home"}>Home</IonRouterLink> */}
        {entry.description}
      </IonContent>
    </IonPage>
  );
};

export default EntryPage;
