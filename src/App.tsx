import React from 'react'
import './App.scss'
import Landing from './components/Landing'
import NotFound from './components/NotFound'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Resume from './components/Resume'

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Landing />,
        },
        {
            path: '/resume',
            element: <Resume />,
        },
        {
            path: '/404',
            element: <NotFound/>
        },
        {
            path: '*',
            element: <Navigate replace to='/404'/>
        }
    ])

    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}

export default App
