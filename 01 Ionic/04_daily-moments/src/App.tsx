import { IonApp } from "@ionic/react";

import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";

const App: React.FC = () => {
  return (
    <IonApp>
      <HomePage />
      <SettingsPage />
    </IonApp>
  );
};

export default App;
