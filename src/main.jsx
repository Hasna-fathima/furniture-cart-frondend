import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css"; 
import AdminLayout from './Layout/AdminLayout';
import UserLayout from './Layout/UserLayout';
import UserSignup from './Components/UserSignup';
import AdminSignup from './Components/AdminSignup';
import LoginForm from './Components/AdminLogin';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Products from "./pages/products";
import SingleProduct from "./pages/singleProduct";
import Topcategories from "./pages/Topcategories";
import AboutUs from "./pages/Aboutus";
import ContactUs from "./pages/Contactus";
import ProductsByCategory from '../src/pages/productbycategoris'
import OrderPage from "./pages/Order";
import Ordercompletepage from "./pages/ordercompletepage";
import ShowCartPage from "./pages/showcart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout/>,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        path:'login',
        element: <LoginForm />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "signup",
        element: <UserSignup />
      },
      {
        path:'products',
        element:<Products/>
      },
      {
        path:'singleproduct/:Id',
        element:<SingleProduct/>
      },
      {
        path:'category',
        element:<Topcategories/>
      },
      {
        path:'aboutus',
        element:<AboutUs/>
      },
      {
        path:"contact",
        element:<ContactUs/>
      },
      {
        path:'products/:category',
        element:<ProductsByCategory/>
      },
      {
        path:'order',
        element:<OrderPage/>
      },
      {
        path:'ordercomplete',
        element:<Ordercompletepage/>
      },
      {
        path:'/showcart',
        element:<ShowCartPage/>
      }
    
    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <LoginForm />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "signup",
        element: <AdminSignup />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);