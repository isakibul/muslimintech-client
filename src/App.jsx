import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ThankYouPage from './form/ThankYouPage';
import FormPage from './form/FormPage';
import ErrorPage from './form/ErrorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<FormPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
