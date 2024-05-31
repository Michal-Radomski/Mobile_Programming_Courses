import React from "react";
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { home as homeIcon, settings as settingsIcon } from "ionicons/icons";

import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import EntryPage from "./pages/EntryPage";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  // console.log({ loggedIn });

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact={true} path="/login">
              {loggedIn ? <Redirect to="/entries" /> : <LoginPage onLogin={() => setLoggedIn(true)} />}
            </Route>

            <Route exact={true} path="/entries">
              {loggedIn ? <HomePage /> : <Redirect to="/login" />}
            </Route>
            <Route path="/entries/:id">
              <EntryPage />
            </Route>
            <Route path="/settings">
              <SettingsPage />
            </Route>

            <Redirect exact={true} path="/" to="/entries" />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/entries">
              <IonIcon icon={homeIcon} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={settingsIcon} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
