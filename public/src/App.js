import './App.css';
import React from 'react';
import { Route, Routes } from "react-router-dom"
import HomePage from "./components/HomePage/HomePage"
import Navbar from "./components/NavBar/Navbar"
import CreateCard from "./components/CreateCard/CreateCard"
import EditCard from './components/EditCard/EditCard';
import NotFound from './components/NotFound/NotFound';
import LearningPage from './components/LearningPage/LearningPage';
import CardGroups from './components/CardGroups/CardGroups';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={ <HomePage /> }/>
        <Route path='/createCard' element={ <CreateCard /> } />
        <Route exact path='/editCardGroups/:cardName' element={<CardGroups />} />
        {/* <Route exact path='/editCardGroups/:cardName' element={<EditCard />} /> */}
        <Route exact path='/learn/:cardName' element={<LearningPage />}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
