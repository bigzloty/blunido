import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProductListingPage from "./pages/product/ProductListingPage";
import ProductDetailsPage from "./pages/product/ProductDetailsPage";
import CartPage from "./pages/cart/CartPage";
import ShopPage from "./pages/ShopPage";
import CategoryPage from "./pages/CategoryPage";
import SignUp from "./pages/authi/SignUp";
import Login from "./pages/authi/JoinUs";
import RegistrationDetails from "./pages/authi/RegistrationDetails";
import PrivateRoute from "./components/PrivateRoute";

import { useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Router>
      {/* <div id="main-content" ref={mainContentRef}> */}
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<HomePage featuredProducts={products} />} />
          <Route
            path="/products"
            element={<ProductListingPage products={products} />}
          />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/Cart" element={<CartPage />} />
          <Route path="/ShopPage" element={<ShopPage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
        </Route>

        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-details" element={<RegistrationDetails />} />
      </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;
