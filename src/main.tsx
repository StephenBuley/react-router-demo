import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Root from './routes/root/root'
import {
  action as rootAction,
  loader as rootLoader,
} from './routes/root/rootLoaderAndAction'
import {
  loader as contactLoader,
  action as contactAction,
} from './routes/contact/contactLoaderAndAction'
import { action as editAction } from './routes/edit/editAction'
import { action as destroyAction } from './routes/destroy'
import ErrorPage from './error-page'
import Contact from './routes/contact/contact'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import EditContact from './routes/edit/edit'
import Index from './routes'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />,
          },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: 'contacts/:contactId/edit',
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: 'contacts/:contactId/destroy',
            action: destroyAction,
            errorElement: <div>Oops, there was an issue!</div>,
          },
        ],
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
