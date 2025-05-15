import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FitRoomPage from './components/FitRoomPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FitRoomPage />} />
        {/* Add other routes like /shop or /product/:slug as needed */}
      </Routes>
    </Router>
  );
};

export default App;
