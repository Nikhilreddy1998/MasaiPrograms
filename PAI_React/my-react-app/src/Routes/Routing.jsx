import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import { ProductDetail } from "../Components/ProductDetail";
import { ProductList } from "../Components/ProductList";
import { Cart } from "../Components/Cart";
const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, Component: ProductList },
      { path: "product/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
    ],
  },
]);

export default router;
