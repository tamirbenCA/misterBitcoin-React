import React from 'react';
import { Link } from 'react-router-dom';
import './ContactPreview.css'
// import avatar from '../../assets/image_avatar.png'

const ContactPreview = ( {contact} ) => (
    <Link to={`/contact/${contact._id}`} className="contact-preview">
        <img className="avatar-preview" src={contact.imgUrl} alt='avatar-img'/>
        <h3>{contact.name}</h3>
    </Link>
)

export default ContactPreview;