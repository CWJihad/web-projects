import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import ProtectedRoute from './components/ProtectedRoute'
import ForgotPassword from './pages/ForgotPassword'
import VerifyOtp from './pages/VerifyOtp'
import ResetPassword from './pages/ResetPassword'
import PublicRoute from './components/PublicRoute'
import Notes from './pages/Notes'
import Profile from "./pages/Profile";
import Feedback from './pages/Feedback'
import WatchDemo from './pages/WatchDemo'

const router = createBrowserRouter([
  {
    path: '/',
    // element:  <ProtectedRoute><Home/></ProtectedRoute>
    element:  <Home/>
  },
  {
    path: '/register',
    element: <PublicRoute><Register/></PublicRoute>
  },
  {
    path: '/verify',
    element: <PublicRoute><VerifyEmail/></PublicRoute>
  },
  {
    path: '/login',
    element: <PublicRoute><Login/></PublicRoute>
  },
  {
    path: '/forgot-password',
    element: <PublicRoute><ForgotPassword/></PublicRoute>
  },
  {
    path: '/verify-otp',
    element: <PublicRoute><VerifyOtp/></PublicRoute>
  },
  {
    path: '/reset-password',
    element: <PublicRoute><ResetPassword/></PublicRoute>
  },
  {
    path: '/notes',
    element: <ProtectedRoute><Notes/></ProtectedRoute>
  },
  {
    path: '/profile',
    element: <ProtectedRoute><Profile/></ProtectedRoute>
  },
  {
    path: '/feedback',
    element: <ProtectedRoute><Feedback/></ProtectedRoute>
  },
  {
    path: '/watch-demo',
    element: <WatchDemo/>
  }
])

const App = () => {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
