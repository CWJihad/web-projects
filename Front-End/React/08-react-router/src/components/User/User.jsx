import React from 'react'
import {useParams} from 'react-router-dom'

const User = () => {
    const {userId} = useParams()
  return (
    <div className='m-2 flex text-gray-200 font-bold'>
      <span className='rounded bg-gray-700 w-[84%] text-center  p-4 mx-auto'>User: {userId}</span>
    </div>
  )
}

export default User
