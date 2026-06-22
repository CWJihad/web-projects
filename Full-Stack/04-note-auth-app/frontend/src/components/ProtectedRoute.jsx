import React from 'react'
import { Navigate } from 'react-router-dom'
import { getData } from '@/context/userContext'

const ProtectedRoute = ({ children }) => {
    const { user, authLoading } = getData()

    if (authLoading) {
        return <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-400">Loading...</p>
        </div>
    }

    return user ? children : <Navigate to='/login'/>
}

export default ProtectedRoute