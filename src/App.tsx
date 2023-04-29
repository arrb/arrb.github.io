import React from 'react'
import './App.scss'
import Landing from './components/Landing'
import NotFound from './components/NotFound'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Resume from './components/Resume'

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Landing />,
            errorElement: <NotFound />,
        },
        {
            path: '/resume',
            element: <Resume />,
            errorElement: <NotFound />,
        },
    ])

    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}

export default App
