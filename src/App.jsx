import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormField from './form/MultiStepForm';
import ThankYouPage from './form/ThankYouPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormField />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
};

export default App;
