import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import "./index.css";
import { store } from "./store";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  </Provider>
);
