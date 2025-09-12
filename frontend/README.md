# Brand Rating System - Frontend

React.js frontend application with role-based authentication and user interfaces.

## Features

- **Modern React**: Built with React 18 and functional components
- **Routing**: React Router v6 with protected routes
- **Authentication**: JWT-based authentication with context API
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React Query for server state management
- **Notifications**: React Hot Toast for user feedback
- **Role-Based UI**: Different interfaces for Users, Store Owners, and Admins

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on port 3001

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the frontend directory (optional):

```env
REACT_APP_API_URL=http://localhost:3001/api
```

If not set, defaults to `http://localhost:3001/api`

### 3. Start Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Layout.js          # Main layout with navigation
│   │   └── ProtectedRoute.js  # Route protection component
│   ├── contexts/
│   │   └── AuthContext.js     # Authentication state management
│   ├── pages/
│   │   ├── Home.js           # Landing page
│   │   ├── Login.js          # Login form
│   │   ├── Register.js       # Registration form
│   │   ├── Profile.js        # User profile management
│   │   ├── StoreList.js      # Browse stores (public)
│   │   ├── StoreDetails.js   # Store details and ratings
│   │   ├── MyRatings.js      # User's ratings management
│   │   ├── StoreOwnerDashboard.js # Store owner interface
│   │   └── AdminDashboard.js # Admin panel
│   ├── services/
│   │   └── api.js            # Axios configuration and API calls
│   ├── App.js                # Main app component with routing
│   ├── index.js             # React DOM render
│   └── index.css            # Tailwind CSS and global styles
├── tailwind.config.js        # Tailwind configuration
└── package.json
```

## User Roles and Features

### Regular User
- Browse and search stores
- View store details and ratings
- Submit ratings and reviews
- Manage personal profile
- View personal rating history

### Store Owner
- All user features
- Create and manage stores
- View ratings for owned stores
- Store dashboard with analytics
- Respond to customer feedback

### Admin
- All features from other roles
- System-wide dashboard
- User management
- Store management
- System analytics and monitoring

## Routes

### Public Routes
- `/` - Home page
- `/login` - User login
- `/register` - User registration
- `/stores` - Browse stores
- `/stores/:id` - Store details

### Protected Routes (Authenticated Users)
- `/profile` - User profile
- `/my-ratings` - Personal ratings

### Store Owner Routes
- `/store-dashboard` - Store management

### Admin Routes
- `/admin` - Admin dashboard

## API Integration

The frontend communicates with the backend API using:

- **Axios**: HTTP client with interceptors
- **JWT Tokens**: Stored in localStorage
- **Error Handling**: Global error handling with toast notifications
- **Auto-retry**: Automatic token refresh handling

## Components

### Layout Component
- Responsive navigation bar
- Role-based menu items
- Mobile-friendly hamburger menu
- User authentication status

### ProtectedRoute Component
- Route-level authentication
- Role-based access control
- Loading states
- Redirect handling

### AuthContext
- Global authentication state
- Login/logout functionality
- Token management
- User profile updates

## Styling

Built with Tailwind CSS featuring:

- Responsive design (mobile-first)
- Custom component classes
- Consistent color scheme
- Loading states and animations
- Form validation styling

## Development Notes

- Uses React strict mode
- ESLint configuration for code quality
- Responsive design breakpoints
- Optimized for modern browsers
- PWA-ready structure

## Demo Accounts

For testing purposes, the system supports these demo accounts:

- **Admin**: admin@demo.com / password
- **Store Owner**: owner@demo.com / password  
- **Regular User**: user@demo.com / password

## Integration with Backend

The frontend is designed to work with the Express.js backend:

1. Ensure backend is running on `http://localhost:3001`
2. Database should be populated with initial data
3. CORS is configured to allow frontend origin
4. JWT tokens are properly configured

## Next Steps

1. Install Node.js and npm
2. Run `npm install` to install dependencies
3. Start the backend API server first
4. Run `npm start` to launch the frontend
5. Register a new account or use demo credentials

The application is fully functional for role-based brand rating management!
