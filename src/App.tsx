import React, { FC }  from 'react';
import { Header } from './components/Header/Header'

import './App.scss';

import { HomePage } from './components/HomePage/HomePage';
import PhonesPage from './components/PhonesPage/PhonesPage';
import { PhoneDetailsPage } from './components/PhoneDetailsPage/PhoneDetailsPage'
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage'
import { Switch, Route } from 'react-router-dom';
import Basket from './components/Basket/Basket';

const App:FC = () => {

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={ HomePage } />
        <Route path="/phones" exact component={ PhonesPage } />
        <Route path="/basket" exact component={ Basket } />
        <Route path="/phones/:phoneId" component={ PhoneDetailsPage } exact />
        <Route path="*" component={ NotFoundPage } />
      </Switch>
    </>
  )
}

export default App;
