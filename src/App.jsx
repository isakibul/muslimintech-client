import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThankYouPage from './form/ThankYouPage';
import FormPage from './form/FormPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<FormPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
};

export default App;
