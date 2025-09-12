import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Brand Rating System</h1>
        <p className="mt-4 text-gray-600">
          Discover, rate, and manage stores with role-based access for Users, Store Owners, and Admins.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <h2 className="text-xl font-semibold">For Users</h2>
          <p className="mt-2 text-gray-600">Browse stores, leave ratings and reviews, and manage your profile.</p>
          <Link to="/stores" className="btn btn-primary mt-4 inline-block">Browse Stores</Link>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold">For Store Owners</h2>
          <p className="mt-2 text-gray-600">Create and manage your stores, and view ratings and feedback.</p>
          <Link to="/store-dashboard" className="btn btn-secondary mt-4 inline-block">Owner Dashboard</Link>
        </div>
        <div className="card p-6">
          <h2 className="text-xl font-semibold">For Admins</h2>
          <p className="mt-2 text-gray-600">Monitor system-wide activity, users, and stores from a central dashboard.</p>
          <Link to="/admin" className="btn btn-secondary mt-4 inline-block">Admin Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
