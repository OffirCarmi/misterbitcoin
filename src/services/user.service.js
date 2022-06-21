'use strict'

// import { dbService } from './db.service.js'

// const KEY = 'user_db'

export const userService = {
    signup,
    doTransfer
    // getUser,
    // query,
    // get,
    // remove,
    // save,
    // getEmptyCar,
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

// async function query() {
//     var cars = await dbService.query(KEY)

//     if (!cars || !cars.length) {
//         cars = _createDefaultCars()
//         await dbService.insert(KEY, cars)
//     }
//     return cars
// }

// async function get(id) {
//     return await dbService.get(KEY, id)
// }

// async function remove(id) {
//     return await dbService.remove(KEY, id)
// }

// async function save(car) {
//     if (car._id) return await dbService.put(KEY, car)
//     else return await dbService.post(KEY, car)
// }

// function getEmptyCar() {
//     return {
//         vendor: '',
//         speed: 0,
//     }
// }

// function _createDefaultCars() {
//     return [
//         _createCar('audi', 50),
//         _createCar('fiat', 73),
//         _createCar('honda', 100),
//         _createCar('suzuki', 100),
//     ]
// }

// function _createCar(vendor, speed) {
//     return {
//         vendor,
//         speed,
//     }
// }
