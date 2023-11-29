import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from './routes/root'
import { loader as rootLoader } from './routes/rootLoader'
import ErrorPage from './error-page'
import Contact from './routes/contact'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: 'contacts/:contactId',
        element: <Contact />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
