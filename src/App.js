import './App.css';
import React, { useCallback } from 'react';
import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  Outlet,
} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import ContactUs from './components/pages/ContactUs';
import News from './components/pages/News';
import DiscKalimantan from './components/pages/DiscKalimantan';
import Standings from './components/pages/Standings';
import Footer from './components/Footer';
import HomeNavbar from './components/HomeNavbar';
import Navbar from './components/Navbar';
import NewsManagement from './components/pages/NewsManagement';
import DiscKalimantanManagement from './components/pages/DiscKalimantanManagement';
import StandingManagement from './components/pages/StandingsManagement';
import ContactUsInbox from './components/pages/ContactUsInbox';
import PrivacyPolicyManagement from './components/pages/PrivacyPolicyManagement';
import TermsConditionManagement from './components/pages/TermsConditionManagement';

function App() {
  const localUser = JSON.parse(localStorage.getItem('user'));

  const ProtectedRoute = useCallback(
    ({ children, redirectPath = '/login' }) => {
      if (localUser == null) {
        return <Navigate to={redirectPath} replace />;
      }

      return children ? children : <Outlet />;
    },
    [localUser]
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <React.Fragment>
          <HomeNavbar />
          <Home />
          <Footer />
        </React.Fragment>
      ),
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute user={localUser}>
          <Dashboard props={localUser} />
        </ProtectedRoute>
      ),
    },
    {
      path: '/contactus',
      element: (
        <React.Fragment>
          <Navbar />
          <ContactUs />
        </React.Fragment>
      ),
    },
    {
      path: '/news',
      element: (
        <React.Fragment>
          <Navbar />
          <News />
        </React.Fragment>
      ),
    },
    {
      path: '/discoverkalimantan',
      element: (
        <React.Fragment>
          <Navbar />
          <DiscKalimantan />
        </React.Fragment>
      ),
    },
    {
      path: '/standings',
      element: (
        <React.Fragment>
          <Navbar />
          <Standings />
        </React.Fragment>
      ),
    },
    {
      path: '/news-management',
      element: (
        <React.Fragment>
          <ProtectedRoute user={localUser}>
            <Dashboard title={'News Management'}>
              <NewsManagement />
            </Dashboard>
          </ProtectedRoute>
        </React.Fragment>
      ),
    },
    {
      path: '/disc-kalimantan-management',
      element: (
        <React.Fragment>
          <ProtectedRoute user={localUser}>
            <Dashboard title={'Discover Kalimantan Management'}>
              <DiscKalimantanManagement />
            </Dashboard>
          </ProtectedRoute>
        </React.Fragment>
      ),
    },
    {
      path: '/standings-management',
      element: (
        <React.Fragment>
          <ProtectedRoute user={localUser}>
            <Dashboard title={'Standings Management'}>
              <StandingManagement />
            </Dashboard>
          </ProtectedRoute>
        </React.Fragment>
      ),
    },
    {
      path: '/contactus-inbox',
      element: (
        <React.Fragment>
          <ProtectedRoute user={localUser}>
            <Dashboard title={'Contact Us Inbox'}>
              <ContactUsInbox />
            </Dashboard>
          </ProtectedRoute>
        </React.Fragment>
      ),
    },
    {
      path: '/privacypolicy-management',
      element: (
        <React.Fragment>
          <ProtectedRoute user={localUser}>
            <Dashboard title={'Privacy Policy'}>
              <PrivacyPolicyManagement />
            </Dashboard>
          </ProtectedRoute>
        </React.Fragment>
      ),
    },
    {
      path: '/termsconditions-management',
      element: (
        <React.Fragment>
          <ProtectedRoute user={localUser}>
            <Dashboard title={'Terms and Conditions'}>
              <TermsConditionManagement />
            </Dashboard>
          </ProtectedRoute>
        </React.Fragment>
      ),
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
