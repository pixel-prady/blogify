import React from 'react'
import { assets } from '../assets/assets.jsx'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo.jsx'
import { useSelector } from 'react-redux'

function NavBar() {
    const navigate = useNavigate()
    const rawToken = useSelector((state) => state.app.token)

    // Safely validate token
    const token = rawToken && rawToken !== "undefined" && rawToken !== "null"

    return (
        <div className='flex justify-between items-center py-3 mx-8 sm:mx-20 xl:mx-32'>
            <div onClick={() => navigate('/')} className="cursor-pointer">
                <Logo/>
            </div>
            <button  
                onClick={() => navigate(token ? "/admin" : "/login")} 
                className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'
            >
                {token ? "Dashboard" : "Login"}
                <img src={assets.arrow} alt="arrow" className='w-3' />
            </button>
        </div>
    )
}

export default NavBar
