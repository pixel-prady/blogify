# 📝 Blogify

A modern, full-stack blogging platform with rich text editing, syntax highlighting, authentication, and **AI-powered blog generation**. Built with the **MERN** stack and Google GenAI.

<!-- ![Blogify Banner](https://your-screenshot-url-if-any.com) -->

## 🚀 Features

- 🔐 Secure authentication system with:  
  - Access & Refresh Tokens (JWT)  
  - HttpOnly cookies for storing tokens securely  
  - Hashed passwords using `bcrypt`  
- 🖋️ Rich Text Editor using [Quill.js](https://quilljs.com)  
- 🤖 **AI Blog Writing powered by Google GenAI**  
- 💡 Syntax Highlighting with [Highlight.js](https://highlightjs.org/)  
- ⏱️ Relative timestamps with [Moment.js](https://momentjs.com)  
- 🧼 HTML sanitization using `dompurify`  
- 🛠️ File uploads via Multer and ImageKit  

- 🧑‍💼 Admin dashboard with blog and comment moderation tools:
  - View all blogs created by the logged-in admin  
  - Approve or delete user comments  
  - Toggle publish/unpublish status of blogs  
  - Access dashboard metrics (total blogs, drafts, and comments count)
- ⚙️ State Management via Redux Toolkit  
- 📣 Toast Notifications with `react-hot-toast`  
- 🎨 Tailwind CSS for styling  
- 🌀 Smooth animations using [Framer Motion](https://www.framer.com/motion/)
- ☁️ **Frontend deployed on [Vercel](https://vercel.com)**  
- ☁️ **Backend deployed on [Railway](https://railway.app) -        [Deployed Backend repo](https://github.com/pixel-prady/backend-blogify.git)** 

---

## 🧑‍💻 Tech Stack

### Frontend
- React 18 (latest stable) 
- Vite 7  
- Tailwind CSS 4  
- React Router v7  
- Quill.js (Rich Text Editor)  
- Highlight.js (Code syntax highlighting)  
- Redux Toolkit (State management)
- Axios  
- DOMPurify (HTML sanitization)  
- Moment.js  
- Framer Motion (Animations)
- react-hot-toast (Notifications)  
- @tailwindcss/vite (Vite plugin for Tailwind)

### Backend
- Node.js (ESModules)  
- Express v5  
- MongoDB with Mongoose  
- JWT Authentication:  
  - Access Token (short-lived)  
  - Refresh Token (long-lived)  
- `bcrypt` for secure password hashing 🔐  
- Google GenAI SDK (`@google/genai`) for AI blog creation  
- Multer (File uploads handling)  
- ImageKit SDK (Cloud image uploads)  
- Cookie-parser (HttpOnly cookie support)  
- CORS & dotenv for environment config  
- Nodemon (Dev server reload)  
- Prettier (Code formatting)  



---

## 📁 Project Structure
```bash
backend
├── public
│   └── temp ( for storing the image uploaded on server )
└── src
    ├── app.js
    ├── constants.js
    ├── controllers
    │   ├── admin.controller.js
    │   ├── blog.controller.js
    │   └── user.controller.js
    ├── db
    │   └── connection.js
    ├── gemini
    │   └── gemini.js
    ├── index.js  ( entry point )
    ├── middleware
    │   ├── auth.middleware.js
    │   └── multer.middleware.js
    ├── models
    │   ├── blog.model.js
    │   ├── comments.model.js
    │   └── user.model.js
    ├── routes
    │   ├── admin.route.js
    │   ├── auth.route.js ( refresh access token )
    │   ├── blog.route.js
    │   └── user.routes.js
    └── utils 
        ├── apiError.js
        ├── apiResponse.js
        ├── asyncHandler.js
        └── imageKit.js


frontend
├── index.html
├── public
│   └── favicon.svg
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets/
│   ├── components
│   │   ├── Blogcard.jsx
│   │   ├── Bloglist.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Loader.jsx
│   │   ├── Logo.jsx
│   │   ├── NavBar.jsx
│   │   ├── Newsletter.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── admin
│   │       ├── BlogTableItem.jsx
│   │       ├── CommentTableItem.jsx
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       └── Sidebar.jsx
│   ├── hooks
│   │   └── typingHook.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── pages
│   │   ├── Blog.jsx
│   │   ├── Home.jsx
│   │   └── admin
│   │       ├── Addblog.jsx
│   │       ├── Comments.jsx
│   │       ├── Dashboard.jsx
│   │       ├── Layout.jsx
│   │       └── Listblog.jsx
│   ├── store
│   │   ├── slices
│   │   │   └── appSlice.js
│   │   └── store.js
│   └── utils
│       └── RefreshAccessToken.js
```
---

---

## 🗂️ Backend Model Schema

Below is the backend model schema showing the relations between **users**, **blogs**, and **comments** tables:

![Backend Model Schema](https://ik.imagekit.io/mqvepomiqj/blogs/diagram-export-7-18-2025-10_29_24-AM.png?updatedAt=1752814802998)

---

## 📦 Installation

### Clone the repository

```bash
git clone https://github.com/pixel-prady/blogify.git
cd blogify
```
## ⚙️ Environment Variables Setup

Create `.env` files in both your backend and frontend folders with the following variables:

### Backend `.env`

```bash
PORT=8000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

ACCESS_TOKEN_SECRET=your_jwt_access_token_secret
ACCESS_TOKEN_EXPIRY=30m 
REFRESH_TOKEN_SECRET=your_jwt_refresh_token_secret
REFRESH_TOKEN_EXPIRY=2d

GEMINI_API_KEY=your_google_genai_api_key
```

### Frontend `.env`

```env
VITE_BASE_URL="http://localhost:8000"
```
---

### Setup Backend

```bash
cd backend
npm install
npm run dev
```
### Setup frontend

```bash
cd frontend
npm install
npm run dev
```
---


## 🔌 API Routes

The backend exposes the following API endpoints, grouped by functionality:



### User Routes (`/api/v1/users`)

| Method | Endpoint         | Description               |
| ------ | ---------------- | -------------------------|
| POST   | `/register`      | Register a new user       |
| POST   | `/login`         | User login               |
| POST   | `/logout`        | Logout (authenticated)    |

---

### Blog Routes (`/api/v1/blog`)

| Method | Endpoint             | Description                          |
| ------ | -------------------- | ---------------------------------- |
| GET    | `/all`               | Get all blogs                      |
| GET    | `/:blogId`           | Get a blog by ID                   |
| POST   | `/add-comment`       | Add a comment to a blog            |
| POST   | `/comments`          | Get comments for a blog            |
| POST   | `/addBlog`           | Add a new blog (authenticated)    |
| POST   | `/delete`            | Delete a blog by ID (authenticated) |
| POST   | `/toggle-publish`    | Toggle publish status (authenticated) |
| POST   | `/generate`          | Generate AI-powered blog content (authenticated) |

---

### Admin Routes (`/api/v1/admin`)

| Method | Endpoint            | Description                      |
| ------ | ------------------- | --------------------------------|
| GET    | `/comments`         | Get all comments (authenticated) |
| GET    | `/blogs`            | Get all blogs of logged-in user (authenticated) |
| POST   | `/delete-comment`   | Delete a comment by ID (authenticated) |
| POST   | `/approve-comment`  | Approve a comment (authenticated) |
| GET    | `/dashboard`        | Get admin dashboard data (authenticated) |

---

### Auth Routes (`/api/v1/token/refresh`)

- Routes related to token refresh and authentication management.

---

> **Note:** Routes marked with `(authenticated)` require a valid JWT access token in the request headers.

---





## 🖼️ Image Upload & Deletion Workflow

Blogify handles images with a hybrid approach of temporary local storage and cloud hosting via [ImageKit.io](https://imagekit.io), ensuring fast delivery and optimized space usage.



### 📊 Flow Diagram

![Image Upload & Deletion Workflow](https://ik.imagekit.io/mqvepomiqj/blogs/download.png?updatedAt=1752821182446)


---
### 🎯 Fun Feature

✨ **Instant UI Transformation**

Change a single CSS variable in your `index.css` to completely restyle the entire application — including **all SVG icon colors**:

```css
@theme {
  --color-primary: #711400;
}
```
## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for improvements or bug fixes.


## ❤️ Made with love by Pradhuman Chaudhary