import React from 'react';
import './App.css';

import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App: React.FunctionComponent = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/Home' element={<Home data={[]} />} />            
        </Routes>
      </Router> 
    </>
  )
}

export default App

