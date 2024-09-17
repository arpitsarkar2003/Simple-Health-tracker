import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';

function App() {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <div className='container mx-auto px-4 py-8'>
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/add' element={<AddPage />} />
            <Route path='/edit/:id' element={<EditPage />} />
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
