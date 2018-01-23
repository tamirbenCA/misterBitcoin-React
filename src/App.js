import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, NavLink } from 'react-router-dom'
import {useStrict} from 'mobx'
import {observer, inject} from 'mobx-react'
import DevTool from 'mobx-react-devtools';

import HomePage from './pages/HomePage/HomePage.js'
import LoginPage from './pages/LoginPage/LoginPage.js'
import ContactDetails from './pages/ContactDetails/ContactDetails.js'
import ContactEdit from './pages/ContactEdit/ContactEdit.js'
import ContactApp from './pages/ContactApp/ContactApp.js'
import TransactionPage from './pages/TransactionPage/TransactionPage.js'
import PrivateRoute from './cmps/PrivateRoute/PrivateRoute.js'

import 'font-awesome/css/font-awesome.min.css';
import './App.css';

useStrict(true)

@inject('AppStore') @observer
export default class App extends Component {

  render() {
    return (
      <div className="App">
      <DevTool /> 
        <Router>
          <div>
            <header className="app-header">
              <NavLink to='/'><i className="fa fa-home" aria-hidden="true"></i></NavLink>
              <NavLink to='/contact'><i className="fa fa-users" aria-hidden="true"></i></NavLink>
              <NavLink to='/transaction'><i className="fa fa-handshake-o" aria-hidden="true"></i></NavLink>
            </header>

            <div className="app-container">
              <Switch>
                {/* <Route exact path="/" component={HomePage} /> */}
                <PrivateRoute exact path="/" component={HomePage} user={this.props.AppStore.user} />
                <Route path="/login" component={LoginPage} user={this.props.AppStore.user} />
                <PrivateRoute path="/transaction" component={TransactionPage}  user={this.props.AppStore.user}  />
                <PrivateRoute exact path="/contact" component={ContactApp} user={this.props.AppStore.user} />
                <PrivateRoute path="/contact/:id" component={ContactDetails} user={this.props.AppStore.user} />
                <PrivateRoute path="/add" component={ContactEdit} user={this.props.AppStore.user} />
                <PrivateRoute path="/edit/:id?" component={ContactEdit} user={this.props.AppStore.user} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

// AppStore.state.user ? <HomePage { ...props } AppStore={AppStore} /> : <Redirect to='/login' AppStore={AppStore}/>}/>
// <Route path="/login" render={( props ) => <LoginPage  { ...props } AppStore={AppStore}/> } />
// <Route path="/transaction" render={( props ) => (<TransactionPage {...props} AppStore={AppStore} />)} />