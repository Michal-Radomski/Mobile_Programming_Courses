import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Daily Moments - Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">Add some content here…</IonContent>
    </IonPage>
  );
};

export default HomePage;
