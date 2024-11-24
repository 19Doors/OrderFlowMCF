import React from "react";
import ReactDOM from "react-dom/client";
import Homepage from "./homepage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Products from "./products";
import APIDetails from "./getDetails";
import AccProfile from "./accountInfo";
import Orders from "./ordersM";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const router = createBrowserRouter([
  {
    path: "/getDetails",
    element: <APIDetails />,
  },
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/account_info",
    element: <AccProfile />
  },
  {
    path: "/orders",
    element: <Orders/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>,
);
