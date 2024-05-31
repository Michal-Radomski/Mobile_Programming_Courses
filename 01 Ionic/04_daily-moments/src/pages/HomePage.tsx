import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonItem } from "@ionic/react";

import { entries } from "../data";

const HomePage: React.FC = () => {
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
              <IonItem key={entry.id + index} button={true} routerLink={`/entries/${entry.id}`}>
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
