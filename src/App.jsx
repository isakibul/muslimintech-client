import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MultiStepForm from './form/MultiStepForm';
import ThankYouPage from './form/ThankYouPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MultiStepForm />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
};

export default App;
