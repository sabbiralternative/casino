import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "../src/assets/style.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StateProvider from "./provider/StateProvider.jsx";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StateProvider>
        <App />
      </StateProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
