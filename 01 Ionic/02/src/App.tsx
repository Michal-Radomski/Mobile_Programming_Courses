import React from "react";
import { IonApp, IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";

import "./App.scss";

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <IonApp>
        <IonHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <IonToolbar placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <IonTitle placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              My App
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent
          className="ion-padding"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <p>Add some content here…</p>
        </IonContent>
      </IonApp>
    </React.Fragment>
  );
};

export default App;
