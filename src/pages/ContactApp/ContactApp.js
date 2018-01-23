import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {inject, observer} from 'mobx-react';

import ContactList from '../../cmps/ContactList/ContactList.js'
import ContactFilter from '../../cmps/ContactFilter/ContactFilter.js'
import './ContactApp.css'

@inject('AppStore') @observer
export default class ContactApp extends Component {

  onFilter = ({term}) => {
    this.props.AppStore.loadContacts(term)
    }

  render() {
    console.log(this.props)
    // console.log(this.props.AppStore)

    const { contacts } = this.props.AppStore
    return (
      <div className="contact-app">
        <div className="contact-filter">
          <ContactFilter onFilter={this.onFilter}/>
        </div>
        <div className="contact-list">
          {/* {JSON.stringify()} */}
          <ContactList contacts={contacts} />
        </div>
        <div className="action-container">
          <Link to={'/add'}>+</Link>
        </div>
      </div>
    )
  }
}