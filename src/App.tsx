import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Navbar from './components/navbar/Navbar';
import Policy from './pages/Policy/Policy';
import Terms from './pages/Terms/Terms';
import Code from './pages/Code/Code';
import { Container } from './App.styled';
import Selfie from './pages/Selfie/Selfie';
import Account from './pages/Account/Account';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';
import Name from './pages/Name/Name';
import Email from './pages/Email/Email';
import AccountSettings from './pages/AccountSettings/AccountSettings';
import NameEdit from './pages/NameEdit/NameEdit';
import AlbumDetails from './components/albumDetails/AlbumDetails';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentPage from './components/PaymentPage/PaymentPage';
import ThankU from './components/thanku/ThankU';


const stripePromise = loadStripe("pk_test_51PqIRMRxh50Nc0qLf4KgICJ8Gb4lP7e4iOqZp0SJFlG9rIABwbfH0u09I708ArEEkN3VJ3lzojlUcuvwZ0IYXpcU00E7LfZZkG");

function App() {
  const [otpSent, setOtpSent] = useState(false);


  return (
    <Elements stripe={stripePromise}>
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Login onOtpSent={() => setOtpSent(true)} />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/code" element={otpSent ? <Code /> : <Navigate to="/" />} />
          <Route path="/selfie" element={<ProtectedRoute element={<Selfie />} />} />
          <Route path="/account" element={<ProtectedRoute element={<Account />} />} />
          <Route path="/accountsettings" element={<ProtectedRoute element={<AccountSettings />} />} />
          <Route path="/name" element={<ProtectedRoute element={<Name />} />} />
          <Route path="/nameedit" element={<ProtectedRoute element={<NameEdit />} />} />
          <Route path="/email" element={<ProtectedRoute element={<Email />} />} />
          <Route path="/albumDetails/:albumId" element={<ProtectedRoute element={<AlbumDetails />} />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/success" element={<ThankU />} />
        </Routes>
      </Container>
    </Router>
    </Elements>
  );
}

export default App;