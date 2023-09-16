import React, { useContext }  from 'react'
// import dp2 from '../img/dp2.jfif'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)


  return (
    <div className='navbar'>
        <span className="logo">TalkItOut</span>
            <div className="user">
            <img src={ currentUser.photoURL } alt="" />
            <span>{currentUser.displayName}</span>
            <button onClick={()=>signOut(auth)}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar