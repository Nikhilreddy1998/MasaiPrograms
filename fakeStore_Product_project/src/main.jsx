import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./Routes/Routes.jsx";
import { ProductContextProvider } from "./context/Productcontext.jsx";
import { CartContextProvider } from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductContextProvider>
      <CartContextProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </CartContextProvider>
    </ProductContextProvider>
  </StrictMode>
);
