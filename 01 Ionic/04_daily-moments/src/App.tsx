import { IonApp, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";

import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact={true} path="/home">
            <HomePage />
          </Route>
          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Redirect exact={true} path="/" to="/home" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
