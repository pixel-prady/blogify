import React, { useEffect, useState } from 'react'
import CommentTableItem from '../../components/admin/CommentTableItem'
import toast from 'react-hot-toast'
import axios from 'axios'
import api from '../../utils/RefreshAccessToken'
function Comments() {

    const [comments, setComments] = useState([])
    const [filter, setFilter] = useState('Not Approved')


    const fetchComments = async () => {
       	try {
			const { data } = await api.get(`/api/v1/admin/comments`)
			// console.log ( data.data) ;
			data.success ? setComments(data.data) : toast.error(data.message)
		} catch (error) {
			toast.error(error.response?.data?.message || error.message);
		}
    }

    useEffect(() => {
        fetchComments();
    }, [])
    return (
        <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
            <div className='flex justify-between items-center max-w-3xl'>
                <h1>Comments</h1>
                <div className='flex gap-4'>
                    <button
                        onClick={() => setFilter('Approved')}
                        className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs whitespace-nowrap shrink-0 min-w-fit 
                                    ${filter === 'Approved' ? 'text-primary' : 'text-gray-700'}`}>
                        Approved</button>

                    <button
                        onClick={() => setFilter('Not Approved')}
                        className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs whitespace-nowrap shrink-0 min-w-fit 
                                    ${filter === 'Not Approved' ? 'text-primary' : 'text-gray-700'}`}>
                        Not Approved
                    </button>
                </div>
            </div>

            <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
                <table className="w-full text-sm text-gray-500">
                    <thead className="text-xs text-gray-700 text-left uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3"> Blog Title & Comment </th>
                            <th scope="col" className="px-6 py-3 max-sm:hidden"> Date </th>
                            <th scope="col" className="px-6 py-3"> Action </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            comments.filter((comment) =>
                                filter === "Approved" ? comment.isApproved : !comment.isApproved
                            )
                                .map((comment, index) => (
                                    <CommentTableItem key={comment._id} comment={comment} index={index + 1} fetchComments={fetchComments} />
                                ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Comments