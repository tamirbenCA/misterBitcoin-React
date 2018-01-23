import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import './ContactEdit.css'
import { inject, observer } from 'mobx-react';

import ContactService from '../../services/ContactService.js'

// import img from '../../assets/image_avatar.png'


const EditHeader = ({ contact, deleteContact }) => {
  const backUrl = contact._id ? `/contact/${contact._id}` : `/contact`

  return (
    <header className="edit-btns-top">
      <Link to={backUrl}><button className="action-btn"><i className="fa fa-undo" aria-hidden="true"></i></button></Link>
      {contact._id ? (<button className="action-btn" onClick={deleteContact}><i className="fa fa-trash" aria-hidden="true"></i></button>) : ''}
    </header>
  )
}

@inject('AppStore') @observer
export default class ContactDetails extends Component {

  state = { contact: {} }


  async componentDidMount() {
    if (this.props.match.params.id) {
      // this.setState({contact : await ContactService.getContactById(this.props.match.params.id)}) 
     this.props.AppStore.loadContact(this.props.match.params.id)
     this.setState({contact : this.props.AppStore.currContact })
    } else {
      this.setState({contact : await ContactService.getEmptyContact()}) 
    }
  }

  deleteContact = (event) => {
    this.props.AppStore.deleteContact(this.state.contact._id)
      .then(_ => this.props.history.push('/contact'));
  }

  saveContact = (event) => {
    this.props.AppStore.saveContact(this.state.contact)
      .then(_ => this.props.history.goBack());    
  }

  handleChange = (field) => {
    return event => {
      const contact = { ...this.state.contact, ...{ [field]: event.target.value } }
      // console.log(event.target.value)
      this.setState({ contact })
    }
  }

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    var contact = this.state.contact;
    // console.log({ edit: this.props })
    if (!contact) return <div></div>
    return (
      <div className="form-edit">
        <EditHeader contact={contact} deleteContact={this.deleteContact} />
        {/* <div className="edit-btns-top">
          <button className="action-btn" onClick={this.goBack}><i className="fa fa-undo" aria-hidden="true"></i></button>
          <button className="action-btn" onClick={this.deleteContact}><i className="fa fa-trash" aria-hidden="true"></i></button>
        </div> */}
        <div className="edit-main">
          <img className="contact-img" src={contact.imgUrl} alt="avatar-img" />
          <p>Name: <input className="user-input edit-input" type="text" placeholder="Name" onChange={this.handleChange('name')} value={contact.name || ''} /></p>
          <p>Phone: <input className="user-input edit-input" type="text" placeholder="Phone" onChange={this.handleChange('phone')} value={contact.phone || ''} /></p>
          <p>E-Mail: <input className="user-input edit-input" type="text" placeholder="Email" onChange={this.handleChange('email')} value={contact.email || ''} /></p>
        </div>
        <div className="edit-btns-bottom">
          <button className="action-btn" onClick={this.saveContact}><i className="fa fa-floppy-o" aria-hidden="true"></i></button>
        </div>
      </div>
    )
  }

}
