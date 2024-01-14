import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoginPage from "./pages/LoginPage"
import PlayQuizPage from './pages/PlayQuizPage'
import Home from "./pages/Home"
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

import SignupPage from './pages/SignupPage';


const router = createBrowserRouter([
  {
    path : "/",
    element : <App />,
    children : [
      {
        path : "/",
        element : <Home />,
      },
      {
        path : "/login",
        element : <LoginPage />
      },
      {
        path: "/signup",
        element: <SignupPage />
      },
      {
        path: "/play-quiz",
        element: <PlayQuizPage />
      }
    ]
  }
])



ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
 
  <RouterProvider router={router}/>
 
  </React.StrictMode>,
  
)

