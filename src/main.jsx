import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './components/MainLayout/MainLayout.jsx';
import AuthProvider from './components/AuthProvider/AuthProvider.jsx';
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import Blog from './components/Blog/Blog.jsx';
import AllFoodItems from './components/AllFoodItems/AllFoodItems.jsx';
import FoodDetails from './components/FoodDetails/FoodDetails.jsx';
import AddFoodItems from './components/AddFoodItems/AddFoodItems.jsx';
import MyAddedFoodItems from './components/MyAddedFoodItems/MyAddedFoodItems.jsx';
import MyOrder from './components/MyOrder/MyOrder.jsx';
import FoodOrder from './components/PrivateRoute/FoodOrder/FoodOrder.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import EroorPage from './components/ErroPage/ErrorPage.jsx';
import UpdateFood from './components/UpdateFood/UpdateFood.jsx';
import Stripe from './components/Stripe/Stripe.jsx';
import SSLCommerz from './components/SSLCommerz/SSLCommerz.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Statistics from './components/Dashboard/Statistics/Statistics.jsx';
import DashError from './components/Dashboard/DashError/DashError.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <EroorPage></EroorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/blog',
        element: <Blog></Blog>
      },
      {
        path: '/all-food-items',
        element: <AllFoodItems></AllFoodItems>,
        loader: () => fetch(`https://quickbite-server.vercel.app/products`),
      },
      {
        path: '/details/:id',
        element: <FoodDetails></FoodDetails>,
      },
      {
        path: '/add-food-item',
        element: <PrivateRoute><AddFoodItems></AddFoodItems></PrivateRoute>
      },
      {
        path: '/my-added-food-items',
        element: <PrivateRoute><MyAddedFoodItems></MyAddedFoodItems></PrivateRoute>
      },
      {
        path: '/my-order',
        element: <PrivateRoute><MyOrder></MyOrder></PrivateRoute>
      },
      {
        path: '/food-purchase/:id',
        element: <PrivateRoute><FoodOrder></FoodOrder></PrivateRoute>,
        loader: ({ params }) => fetch(`https://quickbite-server.vercel.app/details/${params.id}`)
      },
      {
        path: '/update/:id',
        element: <UpdateFood></UpdateFood>,
        loader: ({ params }) => fetch(`https://quickbite-server.vercel.app/single/${params.id}`)
      },
      {
        path : '/payment-stripe',
        element : <Stripe></Stripe>
      },
      {
        path : '/payment-sslcommerz',
        element : <SSLCommerz></SSLCommerz>
      }
    ]
  },
  {
    path: '/dashboard',
    element : <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    errorElement : <DashError></DashError>,
    children :  [
      {
        path : '/dashboard/my-order',
        element : <PrivateRoute><MyOrder></MyOrder></PrivateRoute>
      },
      {
        path : '/dashboard',
        element : <PrivateRoute><Statistics></Statistics></PrivateRoute>
      },
      {
        path : '/dashboard/my-added-food-items',
        element : <PrivateRoute><MyAddedFoodItems></MyAddedFoodItems></PrivateRoute>
      },
      {
        path : '/dashboard/add-food-item',
        element : <PrivateRoute><AddFoodItems></AddFoodItems></PrivateRoute>
      },
      {
        path: '/dashboard/food-purchase/:id',
        element: <PrivateRoute><FoodOrder></FoodOrder></PrivateRoute>,
        loader: ({ params }) => fetch(`https://quickbite-server.vercel.app/details/${params.id}`)
      },
      {
        path: '/dashboard/update/:id',
        element: <UpdateFood></UpdateFood>,
        loader: ({ params }) => fetch(`https://quickbite-server.vercel.app/single/${params.id}`)
      }
    ]

  }

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
