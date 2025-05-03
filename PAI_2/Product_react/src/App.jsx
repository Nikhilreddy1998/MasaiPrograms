import { Outlet } from "react-router";
import "./App.css";
import { ProductContextProvider } from "./Context/ProductContextProvider";
import { CartContextProvider } from "./Context/CartContext";

function App() {
  return (
    <>
      <ProductContextProvider>
        <CartContextProvider>
        <Outlet />
        </CartContextProvider>
      </ProductContextProvider>
    </>
  );
}

export default App;
