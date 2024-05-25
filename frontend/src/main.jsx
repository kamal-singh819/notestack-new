import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import { SkeletonTheme } from 'react-loading-skeleton';
import { UserProvider } from './contexts/UserContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#8d99ae" highlightColor="#fff">
      <Router>
        <UserProvider>
          <App />
        </UserProvider>
      </Router>
    </SkeletonTheme>
  </React.StrictMode>
)
