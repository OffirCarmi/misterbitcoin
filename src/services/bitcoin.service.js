'use strict'

import axios from 'axios'

const RATE_URL = 'https://blockchain.info/tobtc?currency=USD&value=1'
const MARKET_PRICE_URL = 'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
const TRANSACTIONS_URL = 'https://www.blockchain.com/charts/market-price?timespan=5months&format=json&cors=true'

import { storageService } from '@/services/storage.service.js'

export const bitcoinService = {
    getRate,
    getMarketPrice,
    getConfirmedTransactions
}

async function getRate() {
    try {
        let rate = storageService.load('rate_DB')
        // console.log('rate from cache', rate);
        if (!rate) {
            const res = await axios.get(RATE_URL)
            rate = res.data
            // console.log('rate from data', rate);
            storageService.save('rate_DB', rate)
        }
        return rate
    } catch (err) {
        console.log('Cannot get data', err)
    }
}

getMarketPrice()
async function getMarketPrice() {
    try {
        let data = storageService.load('market_DB')
        if (!data || !data.length) {
            const res = await axios.get(MARKET_PRICE_URL)
            const values = res.data.values
            data = values.map(value => value.x / value.y)
            // console.log('data from Axios', data)
            storageService.save('market_DB', data)
        }
        return data
    } catch (err) {
        console.log('Cannot get data', err)
    }
}

async function getConfirmedTransactions() {
    try {
        let data = storageService.load('transactions_DB')
        if (!data || !data.length) {
            data = await axios.get(TRANSACTIONS_URL)
            storageService.save('transactions_DB', data)
        }
        return data
    } catch (err) {
        console.log('Cannot get data', err)
    }
}