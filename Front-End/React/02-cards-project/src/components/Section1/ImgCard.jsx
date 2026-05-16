import React from 'react'
import {ArrowRight} from 'lucide-react'


const ImgCard = (props) => {
    console.log(props);
    
  return (
    <div >
        <div className='flex h-full w-70'>
            <img className='h-full w-full object-cover rounded-4xl' src={props.img} alt="" />
            <div className='absolute w-full h-full flex flex-col justify-between py-8 pl-8'>
                <h2 style={{background: props.color}} className='text-white w-10 h-10 text-center font-bold p-2 rounded-full'>{props.num+1}</h2>
                <div>
                    <p style={{color: props.color}} className=' font-medium leading-[1.4] w-37 text-lg'>{props.intro}</p>
                    <button style={{background: props.color}} className='mt-8 w-[22%] py-1 px-5 rounded-2xl hover:underline cursor-pointer justify-between font-bold flex items-center text-white text-2xl'>
                         <div>{props.tag} </div> 
                         <div > <ArrowRight color='white' size={38}/> </div> 
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ImgCard
