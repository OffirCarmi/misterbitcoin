'use strict'

import axios from 'axios'

const RATE_URL = 'https://blockchain.info/tobtc?currency=USD&value=1'
const MARKET_PRICE_URL = 'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
const TRANSACTIONS_URL = 'https://api.blockchain.info/charts/n-transactions?timespan=5months&format=json&cors=true'


import { storageService } from '@/services/storage.service.js'

export const bitcoinService = {
    getRate,
    getMarketPrice,
    getConfirmedTransactions
}

// async function getRate(coins) {
//     try {
//         const res = await axios.get(RATE_URL + coins)
//         return res.data

//     } catch (err) {
//         console.log('Cannot get data', err)
//         throw err
//     }
// }

// From cache
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

// data = values.map(value => {
//     const date = formatTimestamp(value.x * 1000)
//     const num = value.y.toLocaleString()
//     return {
//         date: num
//     }
// })

async function getMarketPrice() {
    try {
        let data = storageService.load('marketPrice_DB')
        if (!data || !data.length) {
            const res = await axios.get(MARKET_PRICE_URL)
            const values = res.data.values
            data = values.reduce((acc, value) => {
                const date = formatTimestamp(value.x * 1000)
                const num = value.y
                acc[0].push(date)
                acc[1].push(num)
                return acc
            }, [[], []])
            data[0] = data[0].reverse().slice(0, 30).reverse()
            data[1] = data[1].reverse().slice(0, 30).reverse()
            storageService.save('marketPrice_DB', data)
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
            const res = await axios.get(TRANSACTIONS_URL)
            const values = res.data.values
            data = values.reduce((acc, value) => {
                const date = formatTimestamp(value.x * 1000)
                const num = value.y
                acc[0].push(date)
                acc[1].push(num)
                return acc
            }, [[], []])
            data[0] = data[0].reverse().slice(0, 30).reverse()
            data[1] = data[1].reverse().slice(0, 30).reverse()
            storageService.save('transactions_DB', data)
        }
        return data
    } catch (err) {
        console.log('Cannot get data', err)
    }
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}