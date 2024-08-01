import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from './Components/Signup/Signup'
import Checkout from './Components/Checkout/Checkout'
import Recovery from './Components/Password Recovery/Recovery'
import Booking from './Components/Booking/Booking'
import Vendor from './Components/Vendor HomePage/Vendor'
import Contacts from './Components/ContactPage/Contacts';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Bookings from './Components/Past-Bookings/Bookings';
import Orders from './Components/Orders/Orders';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },

  {
    path: "/signup",
    element: <Signup/>,
  },

  {
    path: "/home",
    element: <Booking/>,
  },

  {
    path: "/vendorhome",
    element: <Vendor/>,
  },


  {
    path: "/checkout",
    element: <Checkout/>,
  },

  {
    path: "/recovery",
    element: <Recovery/>,
  },

  {
    path: "/contactUs",
    element: <Contacts/>,
  },
  {
    path: "/past-bookings",
    element: <Bookings/>,
  },
  {
    path: "/my-orders",
    element: <Orders/>,
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();