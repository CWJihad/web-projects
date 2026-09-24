import React from 'react'
import {auth} from '@clerk/nextjs/server'
import ClientPage from './ClientPage'

const page = async () => {
  await auth.protect()

  return <ClientPage/>
}

export default page
