import React from "react";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";

import LoginPage from "./pages/LoginPage";
import AppTabs from "./AppTabs";
import { AuthContext } from "./auth";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  // console.log({ loggedIn });

  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn }}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact={true} path="/login">
              {/* {loggedIn ? <Redirect to="/my/entries" /> : <LoginPage onLogin={() => setLoggedIn(true)} loggedIn={loggedIn} />} */}
              <LoginPage onLogin={() => setLoggedIn(true)} />
            </Route>

            <Route path="/my">
              <AppTabs />
            </Route>

            <Redirect exact={true} path="/" to="/my/entries" />
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
