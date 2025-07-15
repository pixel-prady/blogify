import arrow from "./arrow.svg";
import blog_icon from "./blog_icon.png";
import add_icon from "./add_icon.svg";
import list_icon from "./list_icon.svg";
import email_icon from "./email_icon.png";
import upload_area from "./upload_area.svg";
import user_icon from "./user_icon.svg";
import bin_icon from "./bin_icon.svg";
import comment_icon from "./comment_icon.svg";
import tick_icon from "./tick_icon.svg";
import cross_icon from "./cross_icon.svg";
import home_icon from "./home_icon.svg";
import gradientBackground from "./gradientBackground.png";

const star_icon = () => (
    <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        style={{ fill: 'var(--color-primary)' }}
    >
        <path d="M12 2l2.9 6.3L22 9.3l-5 4.9 1.2 7.1L12 18.6l-6.2 3.7L7 14.2 2 9.3l7.1-1L12 2z" />
    </svg>
);




const facebook_icon = () => (
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shadow-md">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="w-6 h-7 text-primary"
        >
    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2Z"></path>
        </svg>


    </div>
);

const twitter_icon = () => (
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shadow-md">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-primary"
        >
            <path fill="currentColor" d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584l-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path>
        </svg>
    </div>
);

const whatsapp_icon = () => (
    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shadow-md">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 432 432"
            className="w-5 h-5 text-primary"
        >
            <path fill="currentColor" d="M364.5 65Q427 127 427 214.5T364.5 364T214 426q-54 0-101-26L0 429l30-109Q2 271 2 214q0-87 62-149T214 3t150.5 62zM214 390q73 0 125-51.5T391 214T339 89.5T214 38T89.5 89.5T38 214q0 51 27 94l4 6l-18 65l67-17l6 3q42 25 90 25zm97-132q9 5 10 7q4 6-3 25q-3 8-15 15.5t-21 9.5q-18 2-33-2q-17-6-30-11q-8-4-15.5-8.5t-14.5-9t-13-9.5t-11.5-10t-10.5-10.5t-8.5-9.5t-7-8.5t-5.5-7t-3.5-5L128 222q-22-29-22-55q0-24 19-44q6-7 14-7q6 0 10 1q8 0 12 9q2 3 6 13l7 17.5l3 8.5q3 5 1 9q-3 7-5 9l-3 3l-3 3.5l-2 2.5q-6 6-3 11q13 22 30 37q13 11 43 26q7 3 11-1q12-15 17-21q4-6 12-3q6 3 36 17z"></path>
        </svg>

    </div>
);


const dashboard_icon_4 = () => (
    <div className=" p-2 rounded-xl x-0 flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 1024 1024"
            className="w-5  h-5 text-primary"
        >
            <path fill="currentColor" d="M128 320v576h576V320H128zm-32-64h640a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32zM960 96v704a32 32 0 0 1-32 32h-96v-64h64V128H384v64h-64V96a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32zM256 672h320v64H256v-64zm0-192h320v64H256v-64z"></path>
        </svg>

    </div>
);

const dashboard_icon_3 = () => (
    <div className="bg-primary/5 p-5 rounded-xl flex items-center justify-center">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-8 h-8 text-primary"
            fill="currentColor"
        >
            <path d="M20 2a1 1 0 0 1 1 1v3.757l-8.999 9l-.006 4.238l4.246.006L21 15.242V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h16Zm1.778 6.808l1.414 1.414L15.414 18l-1.416-.002l.002-1.412l7.778-7.778ZM12 12H7v2h5v-2Zm3-4H7v2h8V8Z" />
        </svg>
    </div>
);

const dashboard_icon_2 = () => (
    <div className="bg-primary/5 p-5 rounded-xl flex items-center justify-center">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 432 432"
            className="w-8 h-8 text-primary"
            fill="currentColor"
        >
            <path fill="currentColor" d="M405 88q9 0 15.5 6.5T427 109v320l-86-85H107q-9 0-15.5-6.5T85 323v-43h278V88h42zm-85 128q0 9-6.5 15t-14.5 6H85L0 323V24q0-9 6.5-15T21 3h278q8 0 14.5 6t6.5 15v192z"></path>
        </svg>
    </div>
);

const dashboard_icon_1 = () => (
    <div className="bg-primary/5 p-5 rounded-xl flex items-center justify-center">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 16 16"
            className="w-8 h-8 text-primary"
        >
            <path fill="currentColor" d="m10.878.282l.348 1.071a2.2 2.2 0 0 0 1.398 1.397l1.072.348l.021.006a.423.423 0 0 1 0 .798l-1.071.348a2.2 2.2 0 0 0-1.399 1.397l-.348 1.07a.423.423 0 0 1-.798 0l-.348-1.07a2.2 2.2 0 0 0-1.399-1.403l-1.072-.348a.423.423 0 0 1 0-.798l1.072-.348a2.2 2.2 0 0 0 1.377-1.397l.348-1.07a.423.423 0 0 1 .799 0m4.905 7.931l-.765-.248a1.58 1.58 0 0 1-1-.999l-.248-.764a.302.302 0 0 0-.57 0l-.25.764a1.58 1.58 0 0 1-.983.999l-.765.248a.303.303 0 0 0 0 .57l.765.249a1.58 1.58 0 0 1 1 1.002l.248.764a.302.302 0 0 0 .57 0l.249-.764a1.58 1.58 0 0 1 .999-.999l.765-.248a.303.303 0 0 0 0-.57zm-2.903 3.631c.19.101.402.155.622.156q.221.002.427-.056A3.79 3.79 0 0 1 10.21 15H6a1 1 0 0 1-1-1h5c1.364 0 2.515-.91 2.88-2.156M8.796 1H4.713C3.767 1 3 1.768 3 2.714v8.572C3 12.233 3.767 13 4.713 13h5.574c.946 0 1.713-.768 1.713-1.714v-.978a.5.5 0 0 0-.125-.181a.6.6 0 0 0-.22-.14l-.76-.25c-.27-.1-.491-.261-.651-.481s-.24-.481-.24-.752c0-.19.04-.38.12-.55q-.24-.06-.45-.21a1.7 1.7 0 0 1-.35-.363a.5.5 0 0 1-.234.11L9 7.5H6a.5.5 0 0 1-.09-.992L6 6.5h2.97l-.177-.54c-.09-.23-.18-.36-.29-.47a1.3 1.3 0 0 0-.471-.291l-1.061-.35c-.3-.1-.54-.291-.71-.532c-.17-.24-.261-.52-.261-.82c0-.301.09-.582.26-.822s.41-.42.69-.521l1.092-.35c.16-.05.32-.16.45-.291s.23-.29.29-.47zm.294 9.499l-.09.008H6a.5.5 0 0 1-.09-.992L6 9.507h3a.5.5 0 0 1 .09.992"></path>
        </svg>


    </div>
);

export const assets = {
    facebook_icon,
    twitter_icon,
    whatsapp_icon,
    arrow,
    blog_icon,
    add_icon,
    email_icon,
    upload_area,
    user_icon,
    bin_icon,
    comment_icon,
    tick_icon,
    star_icon,
    home_icon,
    gradientBackground,
    list_icon,
    cross_icon,
    dashboard_icon_1,
    dashboard_icon_2,
    dashboard_icon_3,
    dashboard_icon_4,
};


export const blogCategories = [
    "All",
    "Technology",
    "Startup",
    "Lifestyle",
    "Finance",
];


export const footer_data = [
    {
        title: "Quick Links",
        links: [
            { name: "Home", url: "/" },
            { name: "Best Sellers", url: "/bestsellers" },
            { name: "Offers & Deals", url: "/offers" },
            { name: "Contact Us", url: "/contact" },
            { name: "FAQs", url: "/faq" },
        ],
    },
    {
        title: "Need Help?",
        links: [
            { name: "Delivery Information", url: "/delivery" },
            { name: "Return & Refund Policy", url: "/refund" },
            { name: "Payment Methods", url: "/payments" },
            { name: "Track your Order", url: "/track" },
            { name: "Contact Us", url: "/contact" },
        ],
    },
    {
        title: "Follow Us",
        links: [
            { name: "Instagram", url: "https://instagram.com" },
            { name: "Twitter", url: "https://twitter.com" },
            { name: "Facebook", url: "https://facebook.com" },
            { name: "YouTube", url: "https://youtube.com" },
        ],
    },
];
