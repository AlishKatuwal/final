import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import "./index.css";
import AdminLayout from "./components/admin";
import Dashboard from "./pages/admin/dashboard";
import Orders from "./pages/admin/orders";
import Products from "./pages/admin/product";
import Shopping from "./components/shopping";
import NotFound from "./pages/notFound/index";
import ShopAccount from "./pages/shopping/account";
import ShoppingHome from "./pages/shopping/home";
import ShoppingListing from "./pages/shopping/listing";
import ShoppingCheckout from "./pages/shopping/checkout";
import AuthCheck from "./components/common/authCheck";
import UnauthPage from "./pages/unauthPage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { checkAuth } from "./store/authSlice/index";

const App = () => {
  // const isAuthenticated = true;
  // const user = {
  //   name: "John Doe",
  //   role : "admin",
    
  // };
 const { isAuthenticated, user, isLoading} =useSelector((state) => state.auth);
 const dispatch = useDispatch();

useEffect(() => {
  dispatch(checkAuth())
  },[dispatch]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/auth"
          element={
            <AuthCheck isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </AuthCheck>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AuthCheck isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </AuthCheck>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="product" element={<Products />} /> 
        </Route>

        {/* Shopping Routes */}
        <Route
          path="/shop"
          element={
            <AuthCheck isAuthenticated={isAuthenticated} user={user}>
              <Shopping />
            </AuthCheck>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="account" element={<ShopAccount />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
        </Route>

        {/* Not Found Page */}
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth" element={<UnauthPage />} />
      </Routes>
    </div>
  );
};

export default App;
