import React from "react";
import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  setupIonicReact,
  useIonToast,
} from "@ionic/react";
import { play as playIcon } from "ionicons/icons";

// Core CSS required for Ionic components to work properly
import "@ionic/react/css/core.css";

// Basic CSS for apps built with Ionic
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

// Optional CSS utils that can be commented out
import "@ionic/react/css/padding.css";
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';

import "./App.scss";

setupIonicReact();

const App = (): JSX.Element => {
  const [presentToast] = useIonToast();

  const handleClick = () => {
    presentToast({
      message: "Hello world!",
      duration: 1500,
    });
  };

  // React.useEffect(() => {
  //   console.log("navigator.userAgent:", navigator.userAgent);
  // }, []);

  return (
    <React.Fragment>
      <IonApp>
        <IonHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <IonToolbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IonTitle placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Ionic-React App
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent
          className="ion-padding"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <IonButton
            color={"tertiary"}
            shape="round"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
            onClick={handleClick}
          >
            <IonIcon
              icon={playIcon}
              slot="start"
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />{" "}
            Click Me
          </IonButton>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
