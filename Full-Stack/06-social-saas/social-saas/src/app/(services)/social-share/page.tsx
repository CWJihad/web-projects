import React from 'react'
import {auth} from '@clerk/nextjs/server'

const page = async () => {
    await auth.protect()
  return (
    <div>
      social 
      share
    </div>
  )
}

export default page
