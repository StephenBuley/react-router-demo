import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from './routes/root/root'
import {
  action as rootAction,
  loader as rootLoader,
} from './routes/root/rootLoaderAndAction'
import { loader as contactLoader } from './routes/contact/contactLoader'
import { action as editAction } from './routes/edit/editAction'
import ErrorPage from './error-page'
import Contact from './routes/contact/contact'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EditContact from './routes/edit/edit'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        path: 'contacts/:contactId',
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: 'contacts/:contactId/edit',
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
