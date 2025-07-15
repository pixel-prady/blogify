import React, { useState } from 'react'
import { blogCategories } from '../assets/assets'
// eslint-disable-next-line no-unused-vars
import { motion } from 'motion/react'
import Blogcard from './Blogcard'
import { useSelector } from 'react-redux'

function Bloglist() {

    const blogs = useSelector(state => state.app.blogs);
    // console.log(blogs) ; 
    const input = useSelector(state => state.app.input);

    const [menu, setmenu] = useState("All")

    const filteredBlogs = () => {
        if (!blogs) return []; 
        if (input === "") {
            return blogs;
        }
        return blogs.filter(
            (blog) =>
                blog.title.toLowerCase()
                    .includes(input.toLowerCase())

                ||

                blog.category.toLowerCase()
                    .includes(input.toLowerCase())
        )
    }

    return (
        <div>
            <div className='flex flex-wrap justify-center gap-4 sm:gap-8 my-10 relative'>
                {blogCategories.map((items) => (
                    <div key={items} className='relative'>
                        <button onClick={() => (setmenu(items))}
                            className={`cursor-pointer text-gray-600 ${menu === items && 'text-white px-4 pt-0.5'}`}>
                            {items}
                            {
                                menu == items
                                && <motion.div layoutId='underline'
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'

                                >
                                </motion.div>
                            }

                        </button>
                    </div>
                ))}
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40'>
                {
                    filteredBlogs()
                        .filter((blog) => menu === "All" ? true : blog.category === menu)
                        .map((blog) => <Blogcard key={blog._id} blog={blog} />)
                }
            </div>
        </div>
    )
}

export default Bloglist     