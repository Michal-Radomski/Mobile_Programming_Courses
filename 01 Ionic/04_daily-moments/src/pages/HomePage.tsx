import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar, IonRouterLink } from "@ionic/react";

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Daily Moments - Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        Go to <IonRouterLink routerLink={"/settings"}>Settings</IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
