# Brand Rating System - Backend

Express.js REST API with PostgreSQL database and role-based access control.

## Features

- **Authentication**: JWT-based authentication
- **Role-Based Access Control**: User, Store Owner, Admin roles
- **RESTful APIs**: Complete CRUD operations for users, stores, and ratings
- **Database**: PostgreSQL with Sequelize ORM
- **Security**: Helmet, CORS, rate limiting, input validation
- **Error Handling**: Centralized error handling with proper HTTP status codes

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` and update with your configuration:

```bash
cp .env.example .env
```

Configure the following variables:
- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`: PostgreSQL connection
- `JWT_SECRET`: Strong secret key for JWT tokens
- `PORT`: Server port (default: 3001)

### 3. Database Setup

Create PostgreSQL database:
```sql
CREATE DATABASE brand_rating_system;
```

### 4. Start the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Stores
- `GET /api/stores` - Get all active stores (public)
- `GET /api/stores/:id` - Get store by ID (public)
- `POST /api/stores` - Create store (store owner/admin)
- `PUT /api/stores/:id` - Update store (store owner/admin)
- `DELETE /api/stores/:id` - Delete store (store owner/admin)
- `GET /api/stores/my/stores` - Get my stores (store owner/admin)

### Ratings
- `POST /api/ratings` - Submit rating (authenticated users)
- `PUT /api/ratings/:id` - Update rating (rating owner)
- `DELETE /api/ratings/:id` - Delete rating (rating owner)

### Users
- `GET /api/users/my-ratings` - Get user's ratings (authenticated)

### Admin
- `GET /api/admin/dashboard` - Dashboard statistics (admin only)
- `GET /api/admin/users` - Get all users (admin only)
- `GET /api/admin/stores` - Get all stores (admin only)
- `PATCH /api/admin/users/:userId/status` - Update user status (admin only)
- `PATCH /api/admin/stores/:storeId/status` - Update store status (admin only)

## User Roles

### User (default)
- View stores and ratings
- Submit, update, and delete their own ratings
- Update their profile

### Store Owner
- All user permissions
- Create and manage their own stores
- View ratings for their stores

### Admin
- All permissions
- View dashboard with system statistics
- Manage all users and stores
- Activate/deactivate users and stores

## Database Schema

### Users
- Authentication and profile information
- Role-based access control
- Activity tracking

### Stores
- Store information and location
- Owner relationship
- Rating aggregation (average, count)

### Ratings
- User ratings and reviews
- Store-user relationship (one rating per user per store)
- Anonymous rating option

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based route protection
- Request rate limiting
- Input validation and sanitization
- CORS configuration
- Security headers with Helmet

## Development

- Models use Sequelize ORM with proper relationships
- Controllers follow MVC pattern
- Middleware for authentication and authorization
- Comprehensive error handling
- Input validation with express-validator

## Health Check

Visit `http://localhost:3001/api/health` to check if the API is running.
