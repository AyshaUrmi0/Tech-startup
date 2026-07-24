import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ErrorPage from '../Pages/ErrorPage';
import HomePage from '../Layout/HomePage';
import AllCampaigns from '../Layout/AllCampaigns';
import AddCampaign from '../Layout/AddCampaign';
import MyCampaigns from '../Layout/MyCampaigns';
import MyDonations from '../Layout/MyDonations';
import CampaignDetails from '../Layout/CampaignDetails';
import UpdateCampaign from '../Layout/UpdateCampaign';
import Register from '../Pages/Register';
import Login from '../Pages/Login';
import PrivateRoute from './Privateroute';



const Layout = ({ children, hideFooter = false }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow">{children}</main>
    {!hideFooter && <Footer />}
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: '/campaigns',
    element: (
      <Layout>
        <AllCampaigns />
      </Layout>
    ),
  },
  {
    path: '/addCampaign',
    element: (
      <Layout>
        <PrivateRoute>
          <AddCampaign />
        </PrivateRoute>
      </Layout>
    ),
  },
  {
    path: '/myCampaigns',
    element: (
      <Layout>
        <PrivateRoute>
          <MyCampaigns />
        </PrivateRoute>
      </Layout>
    ),
  },
  {
    path: '/myDonations',
    element: (
      <Layout>
        <PrivateRoute>
          <MyDonations />
        </PrivateRoute>
      </Layout>
    ),
  },
  {
    path: '/campaign/:id',
    element: (
      <Layout>
        <PrivateRoute>
          <CampaignDetails />
        </PrivateRoute>
      </Layout>
    ),
  },
  {
    path: '/updateCampaign/:id',
    element: (
      <Layout>
        <UpdateCampaign />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout hideFooter={true}>
        <Login />
      </Layout>
    ),
  },
  {
    path: '/register',
    element: (
      <Layout hideFooter={true}>
        <Register />
      </Layout>
    ),
  },
  {
    path: '*',
    element: <ErrorPage />, 
  },
]);

export default router;
