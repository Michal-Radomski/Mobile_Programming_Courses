import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { Link } from "react-router-dom";

const SettingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Daily Moments - Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        Go to <Link to={"/home"}>Home</Link>
        <br />
        Add some content here…
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
