import React from 'react'
import { assets } from '../../assets/assets';
import axios from 'axios';
import toast from 'react-hot-toast';
import { fetchBlogs as updater } from '../../store/slices/appSlice';
import { useDispatch } from 'react-redux';

function BlogTableItem({
    blog,
    fetchBlogs,
    index
}) {

    const { title, createdAt, isPublished } = blog;
    const BlogDate = new Date(createdAt)
    const dispatch = useDispatch() ; 

    const deleteBlog = async () => {
        const confirm = window.confirm('Are you sure you want to delete this blog ')
        if (!confirm) return;
        try {
            const { data } = await axios.post("api/v1/blog/delete", { id: blog._id })

            if (data.success) {
                toast.success(data.message)
                await fetchBlogs();
                dispatch(updater()) ; 
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);

        }
    }

    const togglePublish = async () => {
        try {
            const { data } = await axios.post('/api/v1/blog/toggle-publish', { id: blog._id })
            if (data.success) {
                toast.success(data.message)
                await fetchBlogs();
                dispatch(updater())
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);

        }
    }
    return (
        <>
            <tr className='border-y border-gray-300'>
                <th className='px-2 py-4'>{index}</th>
                <td className='px-2 py-4'> {title} </td>
                <td className='px-2 py-4 max-sm:hidden'> {BlogDate.toDateString()} </td>
                <td className='px-2 py-4 max-sm:hidden'>
                    <p className={`${isPublished ? "text-green-600" : "text-orange-700"}`}
                    >{isPublished ? 'Published' : 'Unpublished'}</p>
                </td>
                <td className='px-2 py-4 flex text-xs gap-3'>
                    <button onClick = {togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>
                        {isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    <img src={assets.cross_icon} className='w-8 hover:scale-110 transition-all cursor-pointer' alt="" onClick={deleteBlog}/>
                </td>
            </tr>
        </>
    )
}

export default BlogTableItem;