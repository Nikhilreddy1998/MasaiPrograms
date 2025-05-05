import { createBrowserRouter, RouterProvider } from "react-router";
import App from "../App";
import ProductList from "../components/ProductList";
import { ProductDetail } from "../components/ProductDetail";
import { Cart } from "../components/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, Component: ProductList },
      { path: "product/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
    ],
  },
]);

export {router}
