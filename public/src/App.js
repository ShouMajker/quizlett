import React from 'react';
import { Route, Routes } from "react-router-dom"
import HomePage from "./components/HomePage/HomePage"
import Navbar from "./components/NavBar/Navbar"
import CreateCard from "./components/CreateCard/CreateCard"
import EditCard from './components/EditCard/EditCard';
import NotFound from './components/NotFound/NotFound';
import LearningPage from './components/LearningPage/LearningPage';
import CardGroups from './components/CardGroups/CardGroups';
import TestOnlyGroup from './components/TestOnlyGroup/TestOnlyGroup';
import Test from './components/Test/Test';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={ <HomePage /> }/>
        <Route path='/test/:cardName' element={ <Test />} />
        <Route path='/createCard' element={ <CreateCard /> } />
        <Route path='/cardGroups'>
          <Route path=':cardName' element={ <CardGroups />} />
          <Route path=':cardName/:groupName/edit' element={ <EditCard />} />
          <Route path=':cardName/:groupName/learn' element={ <LearningPage /> }/>
          <Route path=':cardName/:groupName/test' element={ <TestOnlyGroup /> }/>
        </Route>
        <Route path='*' element={ <NotFound/>}/>
      </Routes>
    </>
  );
}

export default App;
