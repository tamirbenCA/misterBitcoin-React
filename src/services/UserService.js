import StorageService from './StorageService.js'

const KEY = 'mister-bitcoin-user'

function getUser() {
    return StorageService.loadFromStorage(KEY)
}

function saveUser(user) {
    StorageService.saveToStorage(KEY, user);
}

function getEmptyUser() {
    return {
        name: '',
        coins: 100,
        transactions: []
    }
}

function logout() {
    StorageService.clearStorage(KEY);
}

function updateUser(user, transactions) {
    var userToUpdate = user
    userToUpdate.transactions = transactions;
    userToUpdate.coins = (userToUpdate.coins - transactions[0].amount)
    saveUser(userToUpdate);
    console.log('update user:', userToUpdate)
    return userToUpdate;
}

export default {
    getUser,
    saveUser,
    getEmptyUser,
    logout,
    updateUser
}