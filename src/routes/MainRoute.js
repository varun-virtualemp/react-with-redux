import React, {lazy} from 'react';
import { Route, Switch, Router } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import MainLayout from '../pages/MainLayout';
import NotFound from '../pages/NotFound/index';
import {history} from '../utils/helper'
const Login = lazy(() => import('../containers/Login'))
const ForgotPassword = lazy(() => import('../containers/ForgotPassword'))
const User = lazy(() => import('../containers/User/UserList'))
const UserForm = lazy(() => import('../containers/User/UserForm'))
const Dashboard = lazy(() => import('../containers/Dashboard'))

function MainRoute() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/forgetpassword" component={ForgotPassword} />
                <MainLayout>
                    <Switch>
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                        <PrivateRoute exact path="/user" component={User} />
                        <PrivateRoute exact path="/user/create" component={UserForm} />
                        <PrivateRoute exact path="/user/edit/:id" component={UserForm} />

                        {/*Page Not Found*/}
                        <Route component={NotFound} />
                    </Switch>
                </MainLayout>
            </Switch>
        </Router>
    )
}

export default MainRoute;
