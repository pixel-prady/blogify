import React from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import toast from 'react-hot-toast'

function CommentTableItem({ comment, fetchComments }) {
    const { blog, createdAt, _id } = comment
    const blogDate = new Date(createdAt)

    const approveComment = async () => {
        try {
            const { data } = await axios.post(`/api/v1/admin/approve-comment`, { id: _id })
            if (data.success) {
                toast.success(data.message);
                fetchComments();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    const deleteComment = async () => {
        try {
            const confirm = window.confirm("Are you sure to delete this comment")
            if (!confirm) return;
            const { data } = await axios.post(`/api/v1/admin/delete-comment`, { id: _id })
            if (data.success) {
                toast.success(data.message);
                fetchComments();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    }

    return (
        <tr className='order-y border-gray-300'>
            <td className='px-6 py-4'>
                <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
                <br />
                <br />
                <b className='font-medium text-gray-600'>Name</b> : {comment.name}
                <br />
                <b className='font-medium text-gray-600'>Comment</b> : {comment.comment} {/* FIXED here */}
            </td>
            <td className='px-6 py-4 max-sm:hidden'>
                {blogDate.toLocaleDateString()}
            </td>
            <td className='px-6 py-4'>
                <div className='inline-flex items-center gap-4'>
                    {
                        !comment.isApproved ?
                            <img src={assets.tick_icon} onClick = {approveComment} className='w-5 hover:scale-110 transition-all cursor-pointer' alt="Approve" />
                            :
                            <p
                                className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>
                                Approved
                            </p>
                    }
                    <img src={assets.bin_icon} onClick = {deleteComment} alt="Delete" className='w-5 hover:scale-110 transition-all cursor-pointer' />
                </div>
            </td>
        </tr>
    )
}

export default CommentTableItem
