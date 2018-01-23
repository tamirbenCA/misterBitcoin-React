import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';

import TransactionPreview from '../../cmps/TransactionPreview/TransactionPreview.js'
import './TransactionPage.css'

@inject('AppStore') @observer
export default class TransactionPage extends Component {
    render() {
        const { transactions } = this.props.AppStore
        // console.log({transactions})

        return (
            <section className="trans-page">
                { transactions.length > 0 ? (
                    <div>
                        <h3 className="trans-header">Yours Transactions:</h3>
                        <ul>  
                            {transactions.map(transaction => 
                                <TransactionPreview transaction={transaction} key={transaction.at}></TransactionPreview>)}
                        </ul>
                    </div>
                ) : (
                    <h3>No Transactions To Display</h3>
                )}
            </section>
        )
    }
}