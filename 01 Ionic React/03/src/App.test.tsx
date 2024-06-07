import React from "react";
import { render } from "@testing-library/react";

import App from "./App";

test("renders without crashing", () => {
  const { baseElement } = render(
    <React.Fragment>
      <App />
    </React.Fragment>
  );
  expect(baseElement).toBeDefined();
});
