import React from "react";
import { IonApp, IonLoading } from "@ionic/react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";

import LoginPage from "./pages/LoginPage";
import AppTabs from "./AppTabs";
import { Auth, AuthContext, useAuthInit } from "./auth";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";

const App: React.FC = () => {
  // const [authState, setAuthState] = React.useState<ObjectI>({ loading: true, loggedIn: false });
  // // console.log({ authState });

  // React.useEffect(() => {
  //   firebaseAuth.onAuthStateChanged((user) => {
  //     // console.log("user:", user);
  //     setAuthState({ loading: false, loggedIn: Boolean(user) });
  //   });
  // }, []);

  // if (authState.loading) {
  //   return <IonLoading isOpen />;
  // }

  const { loading, auth } = useAuthInit();
  if (loading) {
    return <IonLoading isOpen />;
  }

  return (
    <IonApp>
      <AuthContext.Provider value={auth as Auth}>
        <IonReactRouter>
          <Switch>
            <Route exact={true} path="/login">
              {/* {loggedIn ? <Redirect to="/my/entries" /> : <LoginPage onLogin={() => setLoggedIn(true)} loggedIn={loggedIn} />} */}
              <LoginPage />
            </Route>
            <Route exact={true} path="/register">
              <RegisterPage />
            </Route>

            <Route path="/my">
              <AppTabs />
            </Route>

            <Route>
              <NotFoundPage />
            </Route>

            <Redirect exact={true} path="/" to="/my/entries" />
          </Switch>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
