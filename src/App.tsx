import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import PhonesPage from './components/PhonesPage/PhonesPage';
import PhoneDetailsPage from './components/PhoneDetailsPage/PhoneDetailsPage';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import Basket from './components/Basket/Basket';
import Featured from './components/Feathured/Featured';
import TabletsPage from './components/TabletsPage/TabletsPage';
import AccessoriesPage from './components/AccessoriesPage/AccessoriesPage';
import TabletDetailsPage
  from './components/TabletDetailsPage/TabletDetailsPage';

import AccessoryDetailsPage
  from './components/AccessoryDetailsPage/AccessoryDetailsPage';
import { Footer } from './components/Footer/Footer';

const App: FC = () => {
  return (
    <div className="app">
      <div className="app__container">
        <div id="top-anchor" />
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/phones" exact component={PhonesPage} />
          <Route path="/tablets" exact component={TabletsPage} />
          <Route path="/accessories" exact component={AccessoriesPage} />
          <Route path="/basket" exact component={Basket} />
          <Route path="/featured" exact component={Featured} />
          <Route path="/phones/:phoneId" component={PhoneDetailsPage} exact />

          <Route
            path="/tablets/:tabletId"
            component={TabletDetailsPage}
            exact
          />

          <Route
            path="/accessories/:accessoryId"
            component={AccessoryDetailsPage}
            exact
          />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
};

export default App;
