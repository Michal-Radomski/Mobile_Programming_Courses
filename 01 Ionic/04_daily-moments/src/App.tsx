import { IonApp } from "@ionic/react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";

const App: React.FC = () => {
  return (
    <IonApp>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/home">
            <HomePage />
          </Route>

          <Route path="/settings">
            <SettingsPage />
          </Route>
          <Redirect exact={true} path="/" to="/home" />
        </Switch>
      </BrowserRouter>
    </IonApp>
  );
};

export default App;
