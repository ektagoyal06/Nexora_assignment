import ReactDOM from "react-dom/client";
import App from "./App";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProductProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ProductProvider>
);
