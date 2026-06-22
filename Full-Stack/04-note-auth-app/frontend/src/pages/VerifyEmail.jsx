import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const VerifyEmail = () => {
    const location = useLocation()
    
    if (!location.state?.fromRegister) {
        return <Navigate to={'/register'}/>
    }
    
  return (
    <div className='relative w-full h-190 overflow-hidden'>
        <div className='min-h-screen flex items-center justify-center' style={{backgroundColor: "#f0f4f8", fontFamily: "sans-serif"}}>
            <div className='bg-white p-15 rounded-2xl shadow-lg w-full max-w-md text-center'>
                <h2 className='text-2xl font-semibold text-orange-600 mb-4'>✅ Check Your Email</h2>
                <p className='text-gray-400 text-sm'>
                    We've sent a email to verify your account
                </p>
            </div>
        </div>
    </div>
  )
}

export default VerifyEmail
