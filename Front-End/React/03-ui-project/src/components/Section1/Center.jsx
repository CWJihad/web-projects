import React from 'react'
import LeftContent from './LeftContent'
import RightContent from './RightContent'

const Center = (props) => {
  
  return (
    <div className='py-10 flex gap-10 items-center h-[85vh] px-18'>
        <LeftContent/>
        <RightContent users={props.users}/>
    </div>
  )
}

export default Center
