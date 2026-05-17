import React, { useContext } from 'react'
import UserContext from '../context/UserContext'


const Profile = () => {

    const {user} = useContext(UserContext)

    console.log(user);
    
  if (!user) return <div style={{color: "red"}}>Please login!!</div>

  return (
    <div>
        <h2>Welcome {user.username}!</h2>
        <span>Your Password: {user.password}</span>
    </div>
  )
  
}

export default Profile
