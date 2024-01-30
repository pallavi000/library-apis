import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ThemeContextProvider from "./context/ThemeContext.tsx";
import GlobalContextProvider from "./context/GlobalContext.tsx";
import ToastrProvider from "./context/ToastProvider.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <ToastrProvider>
          <GlobalContextProvider>
            <App />
          </GlobalContextProvider>
        </ToastrProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
