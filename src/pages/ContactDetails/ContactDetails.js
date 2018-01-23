import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react';

// import img from '../../assets/image_avatar.png'
import './ContactDetails.css'


@inject('AppStore') @observer
export default class ContactDetails extends Component {
  state = { 
    amount: 0,
    messageSuccess: null,
    messageError: null
  }


  componentDidMount() {
    this.props.AppStore.loadContact(this.props.match.params.id)
  }

  handleChange = (event) => {
    const amount = event.target.value
    this.setState({ amount: +amount })
  }

  transferCoins = (event) => {
    var user = this.props.AppStore.user
    console.log('typeof', typeof this.state.amount)
    if (this.state.amount === 0 || this.state.amount.length === 0) {
      this.setState({ messageError: 'Error! Please enter an amount' })
      return;
    } else if(this.state.amount < 0) {
      this.setState({ messageError: 'Error! Please enter a valid number'})
      return;
    } else if (user.coins < this.state.amount) {
      this.setState({ messageError: 'Error! Insufficient Funds' })
      return;
    }
    var transaction = {
      at: Date.now(),
      amount: this.state.amount,
      toId: this.props.AppStore.currContact._id,
      toName: this.props.AppStore.currContact.name
    }
    this.props.AppStore.addTransaction(transaction)
        .then( _ => {
              this.setState({ messageSuccess: 'Transfer bitcoins success'})
        })
  }

  render() {
    var contact = this.props.AppStore.currContact;
    // console.log(this.props.AppStore)
    // console.log(contact)
    if (!contact) return <div></div>
    return (
      <div>
        <div className="details-btns">
          <Link to='/contact'><button className="action-btn"><i class="fa fa-chevron-left" aria-hidden="true"></i></button></Link>
          <Link to={`/edit/${contact._id}`} className="contact-edit"><button className="action-btn"><i class="fa fa-pencil" aria-hidden="true"></i></button></Link>
        </div>
        <div className="details-main">
          <img className="contact-img" src={contact.imgUrl} alt="avatar-img"/>
          <div className="details-contact">
            <p>Name: {contact.name}</p>
            <p>Phone: {contact.phone}</p>
            <p>E-Mail: {contact.email}</p>
          </div>
        </div>
        
        <section className="details-transfer">
          {this.state.messageSuccess ? (
                                <div className="showMessageSuccess">
                                  {this.state.messageSuccess}
                                </div>
                                    ) : (
                                  <div className="details-transfer">
                                    <div className='showMessageError'>
                                      {this.state.messageError}
                                    </div>
                                    <div>
                                      <p>Transfer Bitcoins to {contact.name}?</p>
                                      <p className="details-transfer-main">Amount:
                                        <input type="number" className="user-input details-input" min="0" onChange={this.handleChange}/>
                                        <button className="action-btn" onClick={this.transferCoins} ><i className="fa fa-credit-card" aria-hidden="true"></i></button>
                                      </p>
                                    </div>
                              </div>
                              )}
        </section>


        {/* <div className="showMessage">
          {this.state.message ? this.state.message : ''}
        </div>

        <div className="details-transfer">
          <p>Transfer BitCoins to {contact.name}?</p>
          <p className="details-transfer-main">Amount:
            <input type="number" className="user-input details-input" onChange={this.handleChange}/>
            <button className="action-btn" onClick={this.transferCoins} ><i className="fa fa-credit-card" aria-hidden="true"></i></button>
          </p>
        </div> */}
      </div>
    )
  }

}
