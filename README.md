# 🎬 Netflix Clone - MERN Stack Application

<div align="center">
  <img src="frontend/public/netflix-logo.png" alt="Netflix Clone Logo" width="200"/>
  
  [![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.6-blue.svg)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)
</div>

## 📖 Overview

A full-stack Netflix clone built with the MERN stack, featuring a modern UI, user authentication, movie/TV show browsing, search functionality, and trailer playback. This application replicates the core functionality of Netflix with a responsive design and smooth user experience.

## ✨ Features

### 🔐 Authentication & User Management

- **User Registration & Login** with JWT-based authentication
- **Secure Password Hashing** using bcryptjs
- **Protected Routes** with middleware authentication
- **Session Management** with HTTP-only cookies
- **Avatar Selection** during registration

### 🎬 Content Browsing

- **Trending Movies & TV Shows** with real-time data from TMDB API
- **Content Categories** (Now Playing, Popular, Top Rated, Upcoming)
- **Movie & TV Show Details** with comprehensive information
- **Similar Content Recommendations**
- **Trailer Playback** with React Player integration

### 🔍 Search & Discovery

- **Advanced Search** for movies, TV shows, and actors
- **Search History** tracking and management
- **Real-time Search Results** with filtering
- **Content Filtering** by type (Movies/TV Shows)

### 🎨 User Interface

- **Responsive Design** optimized for all devices
- **Modern Netflix-like UI** with Tailwind CSS
- **Loading Skeletons** for better UX
- **Toast Notifications** for user feedback
- **Smooth Animations** and transitions
- **Dark Theme** with Netflix branding

### 🔧 Technical Features

- **RESTful API** with Express.js
- **Database Integration** with MongoDB
- **State Management** using Zustand
- **Route Protection** and navigation guards
- **Error Handling** with custom error pages
- **API Rate Limiting** and security middleware

## 🛠️ Tech Stack

### Frontend

- **React 18.3.1** - UI Library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **Axios** - HTTP client
- **React Player** - Video player component
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **Tailwind Scrollbar Hide** - Custom scrollbar styling

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cookie Parser** - Cookie handling
- **dotenv** - Environment variables
- **CORS** - Cross-origin resource sharing

### Development Tools

- **ESLint** - Code linting
- **Nodemon** - Development server
- **Cross-env** - Environment variables
- **Autoprefixer** - CSS vendor prefixes
- **PostCSS** - CSS processing

## 📸 Screenshots

### 🏠 Landing Page

![Landing Page](frontend/public/Screen%20Shots/home.png)
_Beautiful landing page with Netflix-inspired hero section_

### 🔐 Authentication

![Login Page](frontend/public/Screen%20Shots/login.png)
_Secure login interface_

![Signup Page](frontend/public/Screen%20Shots/signup.png)
_User registration with avatar selection_

### 🎬 Content Browsing

![Movies Page](frontend/public/Screen%20Shots/movies.png)
_Movies browsing with categories and trending content_

![TV Shows Page](frontend/public/Screen%20Shots/tv-shows.png)
_TV shows section with organized categories_

### 🔍 Search & Discovery

![Search Page](frontend/public/Screen%20Shots/search.png)
_Advanced search functionality_

![Movie Search Results](frontend/public/Screen%20Shots/movie-search.png)
_Search results for movies_

![TV Search Results](frontend/public/Screen%20Shots/tv-search.png)
_Search results for TV shows_

### 🎥 Content Details

![Watch Page](frontend/public/Screen%20Shots/watch.png)
_Movie/TV show details with trailer playback_

![Trailer Playback](frontend/public/Screen%20Shots/watch-Trailer.png)
_Embedded trailer player_

### 📊 User Features

![Search History](frontend/public/Screen%20Shots/history.png)
_User search history tracking_

![MongoDB User Data](frontend/public/Screen%20Shots/mongodb-user.png)
_User data stored in MongoDB_

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- TMDB API Key

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/mern-netflix-clone.git
   cd mern-netflix-clone
   ```

2. **Install dependencies**

   ```bash
   npm install
   npm install --prefix frontend
   ```

3. **Set up environment variables**

   Create a `.env` file in the `backend` directory:

   ```env
   # JWT Secret for authentication
   JWT_SECRET=your_super_secret_jwt_key_here

   # MongoDB Connection String
   MONGO_URI=mongodb://localhost:27017/netflix-clone
   # Or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/netflix-clone

   # TMDB API Key (get from https://www.themoviedb.org/settings/api)
   TMDB_API_KEY=your_tmdb_api_key_here

   # Environment
   NODE_ENV=development

   # Port
   PORT=5000
   ```

4. **Get TMDB API Key**
   - Visit [TMDB API Settings](https://www.themoviedb.org/settings/api)
   - Create an account and request an API key
   - Add the key to your `.env` file

### Running the Application

#### Development Mode

```bash
# Start backend server
npm run dev

# Start frontend development server (in another terminal)
cd frontend
npm run dev
```

#### Production Mode

```bash
# Build and start the application
npm run build
npm start
```

## 📁 Project Structure

```
mern-netflix-clone/
├── backend/
│   ├── config/
│   │   ├── db.js              # Database connection
│   │   └── envVars.js         # Environment variables
│   ├── controllers/
│   │   ├── auth.controller.js # Authentication logic
│   │   ├── movie.controller.js# Movie operations
│   │   ├── search.controller.js# Search functionality
│   │   └── tv.controller.js   # TV show operations
│   ├── middleware/
│   │   └── protectRoute.js    # Route protection
│   ├── models/
│   │   └── user.model.js      # User schema
│   ├── routes/
│   │   ├── auth.route.js      # Auth routes
│   │   ├── movie.route.js     # Movie routes
│   │   ├── search.route.js    # Search routes
│   │   └── tv.route.js        # TV routes
│   ├── services/
│   │   └── tmdb.service.js    # TMDB API integration
│   ├── utils/
│   │   └── generateToken.js   # JWT token generation
│   └── server.js              # Main server file
├── frontend/
│   ├── public/
│   │   ├── Screen Shots/      # Application screenshots
│   │   └── ...                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/             # Page components
│   │   ├── store/             # State management
│   │   └── utils/             # Utility functions
│   └── ...                    # Frontend configuration
└── README.md
```

## 🔧 API Endpoints

### Authentication

- `POST /api/v1/auth/signup` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/me` - Get current user

### Movies

- `GET /api/v1/movie/trending` - Get trending movies
- `GET /api/v1/movie/popular` - Get popular movies
- `GET /api/v1/movie/:id/details` - Get movie details
- `GET /api/v1/movie/:id/trailers` - Get movie trailers
- `GET /api/v1/movie/:id/similar` - Get similar movies

### TV Shows

- `GET /api/v1/tv/trending` - Get trending TV shows
- `GET /api/v1/tv/popular` - Get popular TV shows
- `GET /api/v1/tv/:id/details` - Get TV show details
- `GET /api/v1/tv/:id/trailers` - Get TV show trailers
- `GET /api/v1/tv/:id/similar` - Get similar TV shows

### Search

- `GET /api/v1/search?query=...` - Search movies/TV shows/actors
- `GET /api/v1/search/history` - Get search history
- `POST /api/v1/search/history` - Save search query

## 🌐 Deployment

### Environment Variables for Production

```env
JWT_SECRET=your_production_jwt_secret
MONGO_URI=your_production_mongodb_uri
TMDB_API_KEY=your_tmdb_api_key
NODE_ENV=production
PORT=5000
```

### Deployment Platforms

- **Heroku**: Use the buildpack for Node.js
- **Vercel**: Deploy with environment variables
- **Railway**: Connect your GitHub repository
- **Render**: Use the Node.js service

### Build Commands

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB API](https://www.themoviedb.org/documentation/api) for movie and TV show data
- [Netflix](https://netflix.com) for design inspiration
- [Tailwind CSS](https://tailwindcss.com) for the styling framework
- [React](https://reactjs.org) for the frontend framework

## 📞 Support

If you have any questions or need help with the project, feel free to:

- Open an issue on GitHub
- Contact me at [your-email@example.com]

---

<div align="center">
  <p>Made with ❤️ by [Your Name]</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
