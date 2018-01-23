import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import UserService from '../../services/UserService.js'

import 'font-awesome/css/font-awesome.min.css';
import './LoginPage.css'

@inject('AppStore')
@observer
export default class LoginPage extends Component {
    state = { user: UserService.getEmptyUser() }

    handleChange = (event) => {
        const user = { ...this.state.user, ...{ name: event.target.value } }
        this.setState({ user })
    }

    onSubmit = (event) => {
        event.preventDefault();
        if (this.state.user.name.length === 0) return
        this.props.AppStore.saveUser(this.state.user)
            .then(_ => this.props.history.push('/'))
    }

    render() {
        // console.log('line 29:', this.props)
        const { user } = this.state;

        return (
            <div className="login-page">
                <form onSubmit={this.onSubmit}>
                    <div className="login-title">
                        please enter your name:
                    </div>
                    <div className="login-input">
                        <input className="user-input" placeholder="Name" value={user.name} onChange={this.handleChange} />
                        <button type="submit" className="action-btn"><i className="fa fa-sign-in" aria-hidden="true"></i></button>
                    </div>
                </form>
            </div>
        )
    }
}