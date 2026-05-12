import React from 'react'
import Section1 from './components/Section1/Section1'
import Section2 from './components/Section2/Section2'
import {img} from './assets'

const App = () => {

  const users = 
  [
    {
     img: `${img.BillSingle}`,
     intro: 'Prime customers, that have access to bank credit and are satisfied with the current product',
     color: 'lightseagreen',
     tag: 'Satisfied' 
    },
    {
      img: `${img.Winter}`,
      intro: 'Many use the MyPrime app to instantly check their balance, pay bills, and manage their cards.',
      color: 'orange',
     tag: 'Underbanked'
    },
    {
      img: `${img.UpOld}`,
      intro: 'Users appreciate perks such as reward points (1 reward point for every BDT 50 spent), cashback, and discounts on retail and dining.',
      color: 'royalblue',
     tag: 'Unbreakable' 
    },
  ]
  
  return (
    <div>
      <Section1 users={users}/>
    </div>
  )
}

export default App
