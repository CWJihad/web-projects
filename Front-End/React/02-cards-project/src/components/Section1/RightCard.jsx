import React from 'react'
import ImgCard from './ImgCard'
import { Key } from 'lucide-react'

const RightCard = (props) => {
  return (
    <div className='flex justify-around  overflow-hidden relative h-full'>

      {props.users.map(function (elem, idx) {
        return <ImgCard key={idx} color={elem.color} num={idx} img={elem.img} intro={elem.intro} tag={elem.tag}/>
      })}
      
    </div>
  )
}

export default RightCard
