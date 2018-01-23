import React from 'react';
import './TransactionPreview.css'

const TransactionPreview = ( {transaction} ) => (
    <li className="transaction-preview">
        <span className="trans-row">Date of transaction: {new Date(transaction.at).toLocaleString('en-GB')}</span>
        <span className="trans-row">Amount: {transaction.amount}</span>
        <span className="trans-row">Beneficiary: {transaction.toName}</span>
    </li>
)

export default TransactionPreview;