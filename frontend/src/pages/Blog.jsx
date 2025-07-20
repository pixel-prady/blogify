import React, { useEffect, useId, useState ,useLayoutEffect} from "react";
import hljs from "highlight.js";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { assets } from "../assets/assets";
import Moment from "moment";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import axios from "axios";
import toast from "react-hot-toast";
import DOMPurify from 'dompurify';

function Blog() {
    const { id } = useParams();
    const keyId = useId();
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    const fetchBlogData = async () => {
        try {
            const { data } = await axios.get(`/api/v1/blog/${id}`);
            data.success ? setData(data.data) : toast.error(data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const fetchComments = async () => {
        try {
            const { data } = await axios.post("/api/v1/blog/comments", {
                blogId: id,
            });
            if (data.success) {
                setComments(data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    const addComment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/v1/blog/add-comment", {
                blog: id,
                name,
                comment: content,
            });
            if (data.success) {
                toast.success(data.message);
                setName("");
                setContent("");
                fetchComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        fetchBlogData();
        fetchComments();
    }, []);
    useLayoutEffect(() => {
        if (!data) return;

        const container = document.querySelector(".rich-text");
        if (!container) return;

        const containers = container.querySelectorAll(".ql-code-block-container");

        containers.forEach((blockContainer) => {
            const codeLines = blockContainer.querySelectorAll(".ql-code-block");
            if (!codeLines.length) return;

            const wrapper = document.createElement("div");
            wrapper.className = "code-block-wrapper";

            const pre = document.createElement("pre");
            const code = document.createElement("code");

            const language = codeLines[0].getAttribute("data-language");
            if (language && language !== "plaintext") {
                code.className = `language-${language}`;
            }

            let innerHTML = "";
            codeLines.forEach((line) => {
                innerHTML += line.innerHTML + "\n";
            });

            code.innerHTML = innerHTML;
            pre.appendChild(code);
            wrapper.appendChild(pre);

            blockContainer.replaceWith(wrapper);

            hljs.highlightElement(code);
        });
    }, [data]);



    return data ? (
        <div className="relative">
            <img
                src={assets.gradientBackground}
                alt=""
                className="absolute -top-50 -z-1 opacity-100"
            />

            <NavBar />

            <div className="text-center mt-20 text-gray-600">
                <p className="text-primary py-4 font-medium">
                    Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
                </p>
                <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
                    {data.title}
                </h1>
                <h2 className="my-5 max-w-lg truncate mx-auto">{data.subTitle}</h2>
                <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary">
                    Author : {data.owner?.name || data.owner?.email || "Anonymous"}
                </p>
            </div>

            <div className="mx-5 max-w-5xl md:mx-auto my-10 mt-6">
                <img src={data.image} alt="" className="rounded-3xl mb-5" />

                <div
                    className="rich-text max-w-3xl mx-auto"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(data.description)
                    }}
                ></div>

                <div className="mt-14 mb-10 max-w-3xl mx-auto">
                    <p className="font-semibold mb-4">Comments ({comments.length})</p>
                    <div className="flex flex-col gap-4">
                        {comments.map((items, index) => (
                            <div
                                key={keyId + index}
                                className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 pb-8 rounded text-gray-600"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <img src={assets.user_icon} alt="" className="w-6" />
                                    <p className="font-medium">{items.name}</p>
                                </div>
                                <p className="text-sm max-w-md ml-8">{items.comment}</p>

                                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                                    {Moment(items.createdAt).fromNow()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="max-w-3xl mx-auto">
                    <p className="font-semibold mb-4">Add your comment</p>
                    <form
                        onSubmit={addComment}
                        className="flex flex-col items-start gap-4 max-w-lg"
                    >
                        <input
                            type="text"
                            placeholder="Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded outline-none"
                        />
                        <textarea
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder="Comment"
                            className="w-full p-2 border border-gray-300 rounded outline-none h-48"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                <div className="my-24 max-w-3xl mx-auto text-center">
                    <p className="font-semibold my-4">
                        Share this article on social media
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                window.location.href
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <assets.facebook_icon />
                        </a>

                        <a
                            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                window.location.href
                            )}&text=${encodeURIComponent("Check out this article!")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <assets.twitter_icon />
                        </a>

                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(
                                "Check out this blog: " + window.location.href
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <assets.whatsapp_icon />
                        </a>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    ) : (
        <Loader />
    );
}

export default Blog;
