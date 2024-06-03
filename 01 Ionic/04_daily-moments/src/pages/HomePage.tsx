import React from "react";
import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem } from "@ionic/react";
import { collection, query, onSnapshot } from "@firebase/firestore";

// import { entries } from "../data";
import { firestore } from "../firebase";
import { Entry, toEntry } from "../Interfaces.d";
import { useAuth } from "../auth";

const HomePage: React.FC = () => {
  const [entries, setEntries] = React.useState<Entry[]>([]);
  const { userId } = useAuth();

  React.useEffect(() => {
    const entriesRef = collection(firestore, "users", userId!, "entries");
    const entriesQuery = query(entriesRef);
    return onSnapshot(entriesQuery, ({ docs }) => setEntries(docs.map(toEntry)));
  }, [userId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Daily Moments - Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Go to <IonRouterLink routerLink={"/settings"}>Settings</IonRouterLink> */}
        HomePage
        <IonList>
          {entries.map((entry, index) => {
            return (
              <IonItem key={entry.id + index} button={true} routerLink={`/my/entries/${entry.id}`}>
                <IonLabel>{entry.title}</IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
