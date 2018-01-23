import { observable, computed, action, /*autorun*/ } from 'mobx';

import UserService from '../services/UserService.js';
import ContactService from '../services/ContactService.js'
import BitcoinService from '../services/BitcoinService';


export default class AppStore {
    @observable user = UserService.getUser();
    @observable contacts = [];
    @observable rate = 0
    @observable currContact = null
    
    constructor() {
        this.initStore();
    }

    @computed get transactions() {
        return this.user.transactions
    }

    @action updateUser = (user = null) => {
        this.user = user;
    }

    @action _setContacts = (cons) => {
        this.contacts = cons
    }

    @action _setRate = (rate) => {
        this.rate = rate
    }

    @action _setCurrContact = (contact) => {
        // console.log({con})
        this.currContact = contact
    }

    @action _addTransaction = (tran) => {
        this.user.transactions.push(tran)
        this.user.coins -= tran.amount;
    }

    loadContacts = async (filter = null) => {
        this._setContacts(await ContactService.getContacts(filter))
        // ContactService.getContacts(filter)
        // .then(this._setContacts)
    }

    loadContact = (id) => {
        ContactService.getContactById(id)
            .then(this._setCurrContact)
    }

    addTransaction = (tran) => {
        this._addTransaction(tran)
        UserService.saveUser(this.user)
        return Promise.resolve(tran)
    }
    
    logoutUser = () => {
        UserService.logout();
        this.updateUser();
        return Promise.resolve();
    }

    saveUser = (user) => {
        UserService.saveUser(user);
        this.updateUser(user);
        return Promise.resolve();
    }

    saveContact = (contact) => {
        return ContactService.saveContact(contact)
            .then(_ => {
                this.loadContacts()
                return Promise.resolve()
            })
    }

    deleteContact = (id) => {
        return ContactService.deleteContact(id)
            .then(_ => {
                this.loadContacts()
                return Promise.resolve()
            })
    }

    initStore = () => {
        BitcoinService.getRate()
            .then(this._setRate)
        this.loadContacts()        
    }

    // initStore = autorun(()=> {
    //     console.count('autorun')
    //     BitcoinService.getRate()
    //         .then(this._setRate)
    //     this.loadContacts()
    // })

}


