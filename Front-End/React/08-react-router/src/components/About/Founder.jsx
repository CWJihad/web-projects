import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import {githubIcon} from '../index'

const Founder = () => {
  const [name, setName] = useState("Jihad");
    const data = useLoaderData()
  return (
    <div className='m-2 flex text-6xl  bg-gray-700 justify-center items-center text-gray-200 font-bold'>
      <img src={data?.avatar_url != null ? data?.avatar_url : githubIcon} className='w-100 object-cover'  alt="image" />
      <span className='rounded w-[84%] text-center  p-4 mx-auto'>CEO: {data?.login != null ? data?.login : name}</span>
    </div>
  )
}

export default Founder
