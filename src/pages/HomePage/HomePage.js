import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

import './HomePage.css'

@inject('AppStore')
@observer
export default class HomePage extends Component {

  logout = () => {
    this.props.AppStore.logoutUser()
      .then(_ => this.props.history.push('/login'))
  } 

  render() {
    const {user , rate} = this.props.AppStore
    return (
      <div className="homepage-container">
        <div className="homepage-header">
          <h2 className="homepage-greet">Hello {user.name}!</h2>
        </div>
        <div>
          <p className="homepage-status">You have {user.coins} Bitcoins</p>
          <p className="homepage-status">They value is ${user.coins / rate}</p>
          <p className="homepage-info">Current Bitcoin-USD Rate is: {1 / rate}</p>
        </div>
        <div className="homepage-footer">
          <p className="homepage-logout">not {user.name}?</p>
          <button type="button" className="action-btn" onClick={this.logout}><i className="fa fa-sign-out" aria-hidden="true"></i></button>
        </div>
      </div>
    )
  }
}