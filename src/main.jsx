import React, { useState} from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import PostList from "./components/postList";
import AdminLogin from './components/logIn.jsx';
import Logout from "./components/logOut";
import SignUp from "./components/signUp";

import App from './App.jsx'
import HomePage from './components/Homepage.jsx';
import PageNotFound from './components/pageNotFound.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import './output.css'



const AppRouter = () => {

 
  const routes = [
 
  {
      path: "/",
      element: <HomePage />,
      children:[
        {path: "login", element: <AdminLogin />},
        {path: "signup", element: <SignUp />},
      ],
      errorElement: <PageNotFound />,
  },
  {
    path: "/homepage",
    element: <HomePage />,
    children:[
      {path: "login", element: <AdminLogin />},
      {path: "signup", element: <SignUp />},
    ],
},

  {
    path: "/blogPage",
    element: <App />,
    children:[
      {path: "dashboard", element: <AdminDashboard />},
      {path: "logout", element: <Logout />},
      {path: "post/:postId", element: <PostList /> },
    ],
  },
  
  ];

const router = createBrowserRouter(routes); 
return <RouterProvider router={router} /> 

};


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />  
  </React.StrictMode>,
)



