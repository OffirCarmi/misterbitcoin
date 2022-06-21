'use strict'

// import { dbService } from './db.service.js'

// const KEY = 'user_db'

export const userService = {
    signup,
    doTransfer
    // getUser,
}

function signup(credential) {
    return {
        name: credential,
        coins: 100,
        moves: []
    }
}


function doTransfer(transfer) {
    const { from, to, amount } = transfer
    if (from.coins - amount < 0) return
    else {
        const user = JSON.parse(JSON.stringify(from))
        user.coins -= amount
        user.moves.unshift({
            to,
            amount,
            date: Date.now()
        })
        return user
    }
}

// function getUser() {
//     return {
//         name: 'Mister user',
//         coins: 100,
//         moves: []
//     }
// }