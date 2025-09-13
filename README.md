# Brand Rating System

🌟 A comprehensive full-stack application for managing brand ratings with sophisticated role-based access control.
**GitHub Repository:** [Brand Rating System]  
(https://github.com/avantithakre5/Store_Rating_System_Fullstack)
## 🚀 Features

### Multi-Role Architecture
- **👥 Regular Users**: Browse stores, submit ratings and reviews, manage profile
- **🏪 Store Owners**: All user features + create/manage stores, view store analytics
- **🔧 Administrators**: Complete system oversight with dashboards and user management

### Core Functionality
- 🔐 **Secure Authentication**: JWT-based with automatic token refresh
- 🛡️ **Role-Based Access Control**: Route and feature-level permissions
- ⭐ **Rating System**: 1-5 star ratings with detailed reviews
- 🔍 **Search & Filter**: Advanced store discovery capabilities
- 📊 **Analytics Dashboard**: Real-time insights for owners and admins
- 📱 **Responsive Design**: Mobile-first UI with Tailwind CSS

## 🛠️ Tech Stack

### Backend
- **Framework**: Express.js (Node.js)
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Security**: Helmet, CORS, rate limiting, input validation
- **API**: RESTful endpoints with comprehensive error handling

### Frontend  
- **Framework**: React 18 with functional components
- **Routing**: React Router v6 with protected routes
- **State Management**: Context API + React Query
- **Styling**: Tailwind CSS with responsive design
- **Notifications**: React Hot Toast for user feedback
- **HTTP Client**: Axios with interceptors

### Database Schema
- **Users**: Authentication, profiles, roles
- **Stores**: Business information, location, categories
- **Ratings**: User reviews with aggregated scoring
- **Relationships**: Proper foreign keys and associations

## 📁 Project Structure

```
brand-rating-system/
├── 📂 backend/              # Express.js API Server
│   ├── 📂 config/           # Database configuration
│   ├── 📂 controllers/      # Request handlers
│   ├── 📂 middleware/       # Auth, RBAC, validation
│   ├── 📂 models/           # Sequelize models
│   ├── 📂 routes/           # API endpoints
│   ├── 📂 utils/            # Helper functions
│   ├── 📄 server.js         # Main server file
│   └── 📄 .env.example      # Environment template
├── 📂 frontend/             # React.js Client App
│   ├── 📂 public/           # Static assets
│   ├── 📂 src/
│   │   ├── 📂 components/   # Reusable UI components
│   │   ├── 📂 contexts/     # React contexts
│   │   ├── 📂 pages/        # Route components
│   │   ├── 📂 services/     # API integration
│   │   └── 📂 utils/        # Helper functions
│   ├── 📄 tailwind.config.js
│   └── 📄 package.json
├── 📄 setup.ps1            # Windows setup script
└── 📄 README.md            # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- Git (optional but recommended)

### Option 1: Automated Setup (Windows)
```bash
# Run the setup script
.\setup.ps1
```

### Option 2: Manual Setup

1. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend  
   cd ../frontend
   npm install
   ```

2. **Configure database**
   ```sql
   -- Create PostgreSQL database
   CREATE DATABASE brand_rating_system;
   ```

3. **Environment setup**
   ```bash
   # Copy and configure environment
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Start applications**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend  
   npm start
   ```

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Health**: http://localhost:3001/api/health

## 👤 Demo Accounts

For testing different roles:

```
🔧 Admin:        admin@demo.com / password
🏪 Store Owner:  owner@demo.com / password  
👤 Regular User: user@demo.com / password
```

## 📋 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get profile
- `PUT /api/auth/profile` - Update profile

### Stores
- `GET /api/stores` - Browse stores (public)
- `GET /api/stores/:id` - Store details
- `POST /api/stores` - Create store (owners+)
- `PUT /api/stores/:id` - Update store (owner/admin)
- `GET /api/stores/my/stores` - My stores (owners+)

### Ratings & Reviews
- `POST /api/ratings` - Submit rating
- `PUT /api/ratings/:id` - Update rating
- `DELETE /api/ratings/:id` - Delete rating
- `GET /api/users/my-ratings` - My ratings

### Admin
- `GET /api/admin/dashboard` - System statistics
- `GET /api/admin/users` - User management
- `GET /api/admin/stores` - Store management
- `PATCH /api/admin/users/:id/status` - Update user status

## 🛡️ Security Features

- **Password Security**: bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Rate Limiting**: Protection against brute force
- **Input Validation**: Comprehensive request validation
- **CORS Protection**: Configured for development/production
- **Security Headers**: Helmet.js security middleware
- **Role-Based Access**: Granular permission control

## 🎨 User Interface

- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, intuitive interface
- **Loading States**: Smooth user experience
- **Error Handling**: Comprehensive error feedback
- **Accessibility**: WCAG-compliant design patterns
- **Dark Mode Ready**: Tailwind CSS theming support

## 🚧 Development

### Backend Development
```bash
cd backend
npm run dev     # Development with nodemon
npm start       # Production mode
npm test        # Run tests
```

### Frontend Development  
```bash
cd frontend
npm start       # Development server
npm run build   # Production build
npm test        # Run tests
```

## 📚 Documentation

- [Backend API Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [Database Schema](./backend/models/)
- [API Endpoints](./backend/routes/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`) 
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for modern web development**

*Ready for production deployment with proper environment configuration*
