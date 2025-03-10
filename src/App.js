import React from 'react';
import Register from './components/Auth/Register';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import { Toaster } from 'react-hot-toast';
import Lessons from './components/Lessons/Lessons';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import InverseProtectedRoute from './components/InverseProtectedRoute/InverseProtectedRoute';
import NotFound from './components/NotFound/NotFound';



function App() {
  const routes = createBrowserRouter([
    {  path: '/',  element: <Layout />, children:[
      { index: true , element:<Home />},
      { path: 'Login', element:<InverseProtectedRoute><Login /></InverseProtectedRoute>},
      { path: 'Register', element:<InverseProtectedRoute><Register /></InverseProtectedRoute>},
      { path: 'Lessons', element:<ProtectedRoute><Lessons /></ProtectedRoute>},
      {path: '*' , element: <NotFound/>},
    ] },
  ]);

  return <>
    <RouterProvider router={routes} />
    <Toaster/>
    </>;
}

export default App;
