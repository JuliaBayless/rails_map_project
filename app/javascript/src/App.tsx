// app/javascript/components/App.jsx

import React from 'react';
import '@fontsource/poppins';
import '@fontsource/outfit';
import { Routes, Route } from 'react-router';
import MapPage from './MapPage';
import ListPage from './ListPage';
import WelcomePage from './WelcomePage';
import BasePage from './BasePage';

const App = () => {
  return (
    <Routes>
       <Route
        path="/"
        element={(
        <BasePage backBtn={false}>
          <WelcomePage />
        </BasePage>
        )}
      />
        <Route 
        path="/MapPage" 
        element={(
        <BasePage>
        <MapPage />
        </BasePage>
        )}/>
        <Route 
        path="/list" 
        element={(
          <BasePage>
        <ListPage />
        </BasePage>
        )} />
        {/* Other routes as needed */}
    </Routes>
  );
};

export default App;
