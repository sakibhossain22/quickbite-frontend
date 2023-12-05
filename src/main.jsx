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
