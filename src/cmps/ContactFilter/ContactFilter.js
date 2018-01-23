import React, { Component } from 'react'
import './ContactFilter.css'

class ContactFilter extends Component {
    onChange = (event) => {
        this.props.onFilter({term: (event.target.value).toLowerCase()})
    } 

    render() {
        return (
            <div className="filter-container">
                <input className="filter-input" onChange={this.onChange} placeholder="Search..." />
            </div>
        )
    }
}

export default ContactFilter
