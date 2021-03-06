import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../pages/Home/HomePage';
import LoginPage from '../pages/Login/LoginPage';
import NewEstablishment from '../pages/NewEstablishment';
import Register from '../pages/Register';

const Routes: React.FC = () => (
    <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route path="/home" component={HomePage} />
        <Route path="/register" component={Register} />
        <Route path="/new-establishment" component={NewEstablishment} />
    </Switch>
);

export default Routes