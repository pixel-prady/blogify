import React, { useRef } from 'react'
import { assets } from '../assets/assets.jsx'
import useTypingEffect from '../hooks/typingHook.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { setInput } from '../store/slices/appSlice.js';

function Header() {
    const text = useTypingEffect([
        "BLOGGING",
        "SHARING",
        "CREATING"
    ], 200, 2000);

    const input = useSelector((state) => state.app.input)
    const inputRef = useRef();
    const dispatch = useDispatch();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(setInput(inputRef.current.value))
    }

    const onClear = ()=>{ 
        dispatch(setInput(""))
        inputRef.current.value = ""; 
    }
    return (
        <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
            <div className='text-center mt-20 mb-8'>
                <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm text-primary'>
                    <p>New: AI feature integrated</p>
                    <assets.star_icon className='w-2.5' />
                </div>

                <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>
                    YOUR OWN
                    <span className="text-primary transition-all duration-200 ease-in-out">
                        {" "}{text}
                    </span>
                    <br /> PLATFORM
                </h1>

                <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-600'>
                    Welcome to your personal blog space—where your ideas take shape and your voice reaches readers.
                    Whether you’re sharing quick thoughts or in-depth stories, this is your platform to inspire, inform, and connect.
                </p>

                <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-300 bg-white rounded overflow-hidden'>
                    <input ref={inputRef} type="text" placeholder='Search for blogs' required className='w-full pl-4 outline-none' />
                    <button type='submit' className='bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer'>
                        Search
                    </button>
                </form>
            </div>

            <div className='text-center'>
                {
                    input && <button onClick={onClear} className='border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer'>Clear Search</button>
                }
            </div>

            <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-80' />
        </div>
    );
}

export default Header;
