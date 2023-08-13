// app/javascript/components/App.jsx

import React from 'react';
import { Routes, Route } from 'react-router';
import MapPage from './MapPage';
import ListPage from './ListPage';
import WelcomePage from './WelcomePage';

const App = () => {
  return (
    <Routes>
       <Route
        path="/"
        element={(<WelcomePage />)}
      />
        <Route path="/MapPage" element={(<MapPage />)}/>
        <Route path="/list" element={(<ListPage />)} />
        {/* Other routes as needed */}
    </Routes>
  );
};

export default App;
