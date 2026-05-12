import React, { useState } from 'react'
import Button from './components/Button'

const App = () => {

  const [color, setColor] = useState(['blue', 'red', 'green', 'orange', 'black', '', '']);
  const [BgColor, setBgColor] = useState('gray');

  const changeBgColor = (idx) => {
    // console.log(idx);
    // console.log(color[idx]);
    // console.log(setBgColor(color[1]));
    
    
    setBgColor(color[idx])
  }
  
  return (
    <div className='h-screen'
    style={{background: BgColor}}
    >
      <h1 className='text-center text-2xl font-bold p-2' style={{color: BgColor == 'black' ? 'white' : 'black'}}>Background Changer</h1>
      <div className='fixed flex justify-center items-center bottom-20 inset-x-0'>
        <div className='flex rounded-xl bg-amber-50 text-white px-6 py-4 gap-4'>
          {color.map((elem, idx) => {
            if (elem.length !== 0 || elem !== ''){
               return <div onClick={() => {
                 changeBgColor(idx)
                }} key={idx}><Button color={elem}/></div>
              }
          })}
        </div>
      </div>
    </div>
  )
}

export default App
