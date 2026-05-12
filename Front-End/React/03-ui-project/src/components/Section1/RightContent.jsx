import React from 'react'
import RightCard from './RightCard'

const RightContent = (props) => {
  console.log(props.users);
  
  return (
    <div className=' h-full w-3/4 rounded-2xl'>
      <RightCard users={props.users}/>
    </div>
  )
}

export default RightContent
