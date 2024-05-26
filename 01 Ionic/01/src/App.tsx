import React from "react";
import { IonButton, setupIonicReact } from "@ionic/react";

import "@ionic/react/css/core.css";
import "./App.scss";

setupIonicReact();

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <header>
        <h1>Ionic-React App</h1>
      </header>

      <main>
        <IonButton placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Click Me
        </IonButton>
      </main>
    </React.Fragment>
  );
};

export default App;
