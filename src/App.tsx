import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Home from './pages/Home';

const App: FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/main" element={<Main />} />
  </Routes>
);
export default App;
