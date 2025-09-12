import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import StoreList from './pages/StoreList';
import StoreDetails from './pages/StoreDetails';
import Profile from './pages/Profile';
import MyRatings from './pages/MyRatings';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard';
import AdminDashboard from './pages/AdminDashboard';

import './index.css';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="App min-h-screen bg-gray-50">
            <Layout>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/stores" element={<StoreList />} />
                <Route path="/stores/:id" element={<StoreDetails />} />

                {/* Protected routes - All authenticated users */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/my-ratings"
                  element={
                    <ProtectedRoute>
                      <MyRatings />
                    </ProtectedRoute>
                  }
                />

                {/* Store Owner Dashboard */}
                <Route
                  path="/store-dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['store_owner', 'admin']}>
                      <StoreOwnerDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Admin Dashboard */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Layout>
            <Toaster position="top-right" />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
