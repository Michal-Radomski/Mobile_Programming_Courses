import { IonPage, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Daily Moments - Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        Go to <Link to={"/settings"}>Settings</Link>
        <br />
        Add some content here…
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
