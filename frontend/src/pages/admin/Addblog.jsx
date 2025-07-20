import React, { useEffect, useState, useRef, useId } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import toast from 'react-hot-toast'
import axios from 'axios'
import { parse } from 'marked'
import { useDispatch } from 'react-redux'
import { fetchBlogs } from '../../store/slices/appSlice'
import api from '../../utils/RefreshAccessToken'

function Addblog() {
    const keyId = useId()
    const dispatch = useDispatch();

    const [isAdding, setIsAdding] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [image, setImage] = useState(false)
    const [title, setTitle] = useState("")
    const [subTitle, setSubTitle] = useState("")
    const [category, setCategory] = useState('Startup')
    const [isPublished, setIsPublished] = useState(false)

    const editorRef = useRef()
    const quillRef = useRef()

    const submitHandler = async (e) => {
        try {
            e.preventDefault()
            setIsAdding(true);
            const contentHTML = quillRef.current?.root.innerHTML
            const blog = {
                title,
                subTitle,
                description: contentHTML,
                category,
                isPublished
            }

            const formData = new FormData();
            formData.append("blog", JSON.stringify(blog))
            formData.append("image", image)

            const { data } = await api.post("api/v1/blog/addBlog", formData);

            if (data.success) {
                toast.success(data.message);
                setImage(false);
                setTitle("");
                quillRef.current.root.innerHTML = "";
                setCategory("Startup")
                dispatch(fetchBlogs())
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setIsAdding(false);
        }
    }

    const generateWithAI = async () => {
        if (!title) return toast.error("Please enter the Title ")
        try {
            setLoading(true)
            const { data } = await api.post('/api/v1/blog/generate', { prompt: title })
            if (data.success) {
                // console.log(data.data)
                // quillRef.current.root.innerHTML = parse(data.data);
                quillRef.current.clipboard.dangerouslyPasteHTML(parse(data.data));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['code-block'],
                        ['link'],
                        ['clean']
                    ]
                }
            });
        }
    }, []);

    return (
        <form onSubmit={submitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-y-auto p-5 sm:p-8'>
            <div className='bg-white w-full p-4 md:p-10 shadow rounded'>
                <p className='font-medium'>Upload thumbnail</p>
                <label htmlFor="image">
                    <img
                        src={!image ? assets.upload_area : URL.createObjectURL(image)}
                        alt=""
                        className='mt-2 h-16 rounded cursor-pointer'
                    />
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id='image'
                        hidden
                        required
                    />
                </label>

                <p className='mt-4 font-medium'>Blog title</p>
                <input
                    type="text"
                    placeholder='Type blog title'
                    required
                    className='w-full mt-2 p-2 border border-gray-300 outline-none rounded'
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <p className='mt-4 font-medium'>Sub title</p>
                <input
                    type="text"
                    placeholder='Type subtitle'
                    required
                    className='w-full mt-2 p-2 border border-gray-300 outline-none rounded'
                    onChange={(e) => setSubTitle(e.target.value)}
                    value={subTitle}
                />

                <p className='mt-4 font-medium'>Blog Description</p>
                <div className='w-full pb-16 sm:pb-10 pt-2 relative'>
                    <div ref={editorRef} style={{ height: '400px' }}>
                        {isLoading && (
                            <div className='absolute inset-0 flex items-center justify-center bg-black/10 mt-2'>
                                <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'></div>
                            </div>
                        )}
                    </div>
                    <button
                        type='button'
                        onClick={generateWithAI}
                        disabled={isLoading}
                        className={`absolute bottom-1 right-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Generate with AI
                    </button>
                </div>

                <p className='mt-4 font-medium'>Blog category</p>
                <select
                    onChange={(e) => setCategory(e.target.value)}
                    name="category"
                    className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
                    value={category}
                >
                    <option value="">Select category</option>
                    {blogCategories.map((item, index) => (
                        <option key={keyId + index} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <div className='flex gap-2 mt-4'>
                    <p className='font-medium'>Publish Now</p>
                    <input
                        type="checkbox"
                        checked={isPublished}
                        className='scale-125 cursor-pointer'
                        onChange={e => setIsPublished(e.target.checked)}
                    />
                </div>

                <button disabled={isAdding} type="submit" className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>
                    {isAdding ? 'Adding...' : 'Add Blog'}
                </button>
            </div>
        </form>
    )
}

export default Addblog
