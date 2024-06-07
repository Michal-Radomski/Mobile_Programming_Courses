import React from "react";
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";

import { home as homeIcon, settings as settingsIcon } from "ionicons/icons";

import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import EntryPage from "./pages/EntryPage";
import { useAuth } from "./auth";
import AddEntryPage from "./pages/AddEntryPage";

const AppTabs: React.FC<{}> = () => {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact={true} path="/my/entries">
          <HomePage />
        </Route>
        <Route path="/my/entries/view/:id">
          <EntryPage />
        </Route>
        <Route path="/my/entries/add">
          <AddEntryPage />
        </Route>
        <Route path="/my/settings">
          <SettingsPage />
        </Route>

        <Redirect exact={true} path="/" to="/my/entries" />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/my/entries">
          <IonIcon icon={homeIcon} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="settings" href="/my/settings">
          <IonIcon icon={settingsIcon} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;
