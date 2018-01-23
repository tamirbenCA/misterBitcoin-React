import axios from 'axios'

const URL = 'https://blockchain.info/tobtc?currency=USD&value=1';

function getRate() {
    return axios.get(`${URL}`)
        .then(res => {
            return res.data})
}

export default {
    getRate
}