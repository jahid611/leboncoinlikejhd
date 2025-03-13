// src/App.js
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import CategoryList from './components/CategoryList';
import Favorites from './components/Favorites';
import Messages from './components/Messages';
import Comments from './components/Comments';
import Reviews from './components/Reviews';
import Blocks from './components/Blocks';
import Notifications from './components/Notifications';
import Tags from './components/Tags';
import SavedSearches from './components/SavedSearches';
import Reports from './components/Reports';
import ActivityLogs from './components/ActivityLogs';
import AnnonceHistory from './components/AnnonceHistory';
import Sessions from './components/Sessions';
import Settings from './components/Settings';
import Coupons from './components/Coupons';
import SupportTickets from './components/SupportTickets';
import ShippingOptions from './components/ShippingOptions';
import Subscriptions from './components/Subscriptions';
import Register from './components/Register';
import Login from './components/Login';
import Campaigns from './components/Campaigns';
import Transactions from './components/Transactions';
import PostAnnonce from './components/PostAnnonce';
import MyAnnonces from './components/MyAnnonces';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          {/* Page d'accueil */}
          <Route path="/" element={<HomePage />} />
          {/* Authentification */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Annonces */}
          <Route path="/post-annonce" element={<PostAnnonce />} />
          <Route path="/annonces/mine" element={<MyAnnonces />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/comments" element={<Comments annonceId={1} />} />
          <Route path="/reviews" element={<Reviews sellerId={1} />} />
          <Route path="/blocks" element={<Blocks />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/saved-searches" element={<SavedSearches />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/activity-logs" element={<ActivityLogs />} />
          <Route path="/annonce-history" element={<AnnonceHistory annonceId={1} />} />
          <Route path="/sessions" element={<Sessions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/support-tickets" element={<SupportTickets />} />
          <Route path="/shipping-options" element={<ShippingOptions annonceId={1} />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
