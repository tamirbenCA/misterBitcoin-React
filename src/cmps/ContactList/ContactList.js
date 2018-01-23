
import React, { Component } from 'react'
import ContactPreview from '../ContactPreview/ContactPreview.js'
import './ContactList.css'



class ContactList extends Component {
    
    render() {
        var contacts = this.props.contacts;
        return (
            <div className="contact-list">
                 {contacts.map(contact =>
                    <ContactPreview contact={contact} key={contact._id}></ContactPreview>)}
            </div>
        )
    }
}

export default ContactList

