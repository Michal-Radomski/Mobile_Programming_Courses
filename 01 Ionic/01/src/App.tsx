import React from "react";
import { IonButton, IonIcon, setupIonicReact, useIonToast } from "@ionic/react";
import { play as playIcon } from "ionicons/icons";

import "@ionic/react/css/core.css";
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
      <header>
        <h1>Ionic-React App</h1>
      </header>

      <main>
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
      </main>
    </React.Fragment>
  );
};

export default App;
