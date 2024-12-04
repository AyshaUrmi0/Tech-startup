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


const Layout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
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
        <AddCampaign />
      </Layout>
    ),
  },
  {
    path: '/myCampaigns',
    element: (
      <Layout>
        <MyCampaigns />
      </Layout>
    ),
  },
  {
    path: '/myDonations',
    element: (
      <Layout>
        <MyDonations />
      </Layout>
    ),
  },
  {
    path: '/campaign/:id',
    element: (
      <Layout>
        <CampaignDetails />
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
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: '/register',
    element: (
      <Layout>
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
