import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonLabel,
  IonItem,
  IonFab,
  IonFabButton,
  IonIcon,
  IonThumbnail,
  IonImg,
} from "@ionic/react";
import { collection, query, onSnapshot, orderBy, limit } from "@firebase/firestore";
import { add as addIcon } from "ionicons/icons";

// import { entries } from "../data";
import { firestore } from "../firebase";
import { Entry, toEntry } from "../Interfaces.d";
import { useAuth } from "../auth";
import { formatDate } from "../date";

const HomePage: React.FC = () => {
  const [entries, setEntries] = React.useState<Entry[]>([]);
  const { userId } = useAuth();

  React.useEffect(() => {
    const entriesRef = collection(firestore, "users", userId!, "entries");
    const entriesQuery = query(entriesRef, orderBy("date", "desc"), limit(7));
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
          {entries.map((entry: Entry, index: number) => {
            return (
              <IonItem key={entry.id + index} button={true} routerLink={`/my/entries/view/${entry.id}`}>
                <IonThumbnail slot="end">
                  <IonImg src={entry.pictureUrl} />
                </IonThumbnail>
                <IonLabel>
                  <h2>{entry?.date ? formatDate(entry?.date) : "n/a"}</h2>
                  <h3>{entry.title}</h3>
                  <p>{entry.description}</p>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
        <IonFab vertical="bottom" horizontal="end">
          <IonFabButton routerLink="/my/entries/add">
            <IonIcon icon={addIcon} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
