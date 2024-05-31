import React from "react";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";

import LoginPage from "./pages/LoginPage";
import AppTabs from "./AppTabs";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  // console.log({ loggedIn });

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact={true} path="/login">
            {/* {loggedIn ? <Redirect to="/my/entries" /> : <LoginPage onLogin={() => setLoggedIn(true)} loggedIn={loggedIn} />} */}
            <LoginPage onLogin={() => setLoggedIn(true)} loggedIn={loggedIn} />
          </Route>

          <Route path="/my">
            <AppTabs loggedIn={loggedIn} />
          </Route>

          <Redirect exact={true} path="/" to="/my/entries" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
