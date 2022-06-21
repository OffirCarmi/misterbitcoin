'use strict'

import { dbService } from './db.service.js'
import { utilService } from './util.service'

const KEY = 'contact_DB'

export const contactService = {
    query,
    get,
    remove,
    save,
    getEmptyContact,
}

async function query() {
    let contacts = await dbService.query(KEY)
    // console.log('contacts from cache', contacts)
    if (contacts.length === 0) {
        contacts = _createDefaultContacts()
        // console.log('default contacts', contacts)
        await dbService.insert(KEY, contacts)
    }
    return _sort(contacts)
}

async function get(id) {
    return await dbService.get(KEY, id)
}

async function remove(id) {
    return await dbService.remove(KEY, id)
}

async function save(contact) {
    // console.log('saving form serivce', contact);
    if (contact._id) return await dbService.put(KEY, contact)
    else return await dbService.post(KEY, contact)
}

function getEmptyContact() {
    return {
        name: '',
        email: '',
        phone: ''
    }
}

function _sort(arr) {
    return arr.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }
  
      return 0;
    })
  }

function _createDefaultContacts() {
    return [
        _createContact('David Porat', 'david@mail.com', '+972 (50) 4040-328'),
        _createContact('Ran Shumel', 'ran_shmuel@mail.com', '+972 (54) 5060-476'),
        _createContact('Osnat Perry', 'os-per@mail.com', '+972 (54) 6270-543'),
        _createContact('Yaniv Moshe', 'moshe.yaniv@mail.com', '+972 (50) 7080-608'),
        _createContact('Meital Lalush', 'mimila@mail.com', '+972 (54) 8030-548'),
        _createContact('Shalev Yehuda', 'shashayu@mail.com', '+972 (54) 5090-720'),
        _createContact('Or Pink', 'or.pink@mail.com', '+972 (52) 5394-720'),
        _createContact('Yarden Lev', 'yar1988@mail.com', '+972 (50) 2264-260'),
        _createContact('Ronit Bern', 'ronitbern@mail.com', '+972 (54) 6464-554'),
        _createContact('Avi Alush', 'alush1@mail.com', '+972 (52) 6998-193'),
        _createContact('Ron Cohen', 'ronco@mail.com', '+972 (54) 6677-012'),
        _createContact('Debby Yardu', 'deb_yar@mail.com', '+972 (52) 9223-541'),
        _createContact('Aharon Zomer', 'aa_zomer@mail.com', '+972 (54) 7003-234'),
    ]
}

function _createContact(name, email, phone) {
    return {
        _id: utilService.makeId(),
        name,
        email,
        phone
    }
}

// const contact_DB = [
//     {
//       'name': 'Ochoa Hyde',
//       'email': 'ochoahyde@renovize.com',
//       'phone': '+1 (968) 593-3824'
//     },
//     {
//       '_id': '5a5664025f6ae9aa24a99fde',
//       'name': 'Hallie Mclean',
//       'email': 'halliemclean@renovize.com',
//       'phone': '+1 (948) 464-2888'
//     },
//     {
//       '_id': '5a56640252d6acddd183d319',
//       'name': 'Parsons Norris',
//       'email': 'parsonsnorris@renovize.com',
//       'phone': '+1 (958) 502-3495'
//     },
//     {
//       '_id': '5a566402ed1cf349f0b47b4d',
//       'name': 'Rachel Lowe',
//       'email': 'rachellowe@renovize.com',
//       'phone': '+1 (911) 475-2312'
//     },
//     {
//       '_id': '5a566402abce24c6bfe4699d',
//       'name': 'Dominique Soto',
//       'email': 'dominiquesoto@renovize.com',
//       'phone': '+1 (807) 551-3258'
//     },
//     {
//       '_id': '5a566402a6499c1d4da9220a',
//       'name': 'Shana Pope',
//       'email': 'shanapope@renovize.com',
//       'phone': '+1 (970) 527-3082'
//     },
//     {
//       '_id': '5a566402f90ae30e97f990db',
//       'name': 'Faulkner Flores',
//       'email': 'faulknerflores@renovize.com',
//       'phone': '+1 (952) 501-2678'
//     },
//     {
//       '_id': '5a5664027bae84ef280ffbdf',
//       'name': 'Holder Bean',
//       'email': 'holderbean@renovize.com',
//       'phone': '+1 (989) 503-2663'
//     },
//     {
//       '_id': '5a566402e3b846c5f6aec652',
//       'name': 'Rosanne Shelton',
//       'email': 'rosanneshelton@renovize.com',
//       'phone': '+1 (968) 454-3851'
//     },
//     {
//       '_id': '5a56640272c7dcdf59c3d411',
//       'name': 'Pamela Nolan',
//       'email': 'pamelanolan@renovize.com',
//       'phone': '+1 (986) 545-2166'
//     },
//     {
//       '_id': '5a5664029a8dd82a6178b15f',
//       'name': 'Roy Cantu',
//       'email': 'roycantu@renovize.com',
//       'phone': '+1 (929) 571-2295'
//     },
//     {
//       '_id': '5a5664028c096d08eeb13a8a',
//       'name': 'Ollie Christian',
//       'email': 'olliechristian@renovize.com',
//       'phone': '+1 (977) 419-3550'
//     },
//     {
//       '_id': '5a5664026c53582bb9ebe9d1',
//       'name': 'Nguyen Walls',
//       'email': 'nguyenwalls@renovize.com',
//       'phone': '+1 (963) 471-3181'
//     },
//     {
//       '_id': '5a56640298ab77236845b82b',
  
//       'name': 'Glenna Santana',
//       'email': 'glennasantana@renovize.com',
//       'phone': '+1 (860) 467-2376'
//     },
//     {
//       '_id': '5a56640208fba3e8ecb97305',
//       'name': 'Malone Clark',
//       'email': 'maloneclark@renovize.com',
//       'phone': '+1 (818) 565-2557'
//     },
//     {
//       '_id': '5a566402abb3146207bc4ec5',
//       'name': 'Floyd Rutledge',
//       'email': 'floydrutledge@renovize.com',
//       'phone': '+1 (807) 597-3629'
//     },
//     {
//       '_id': '5a56640298500fead8cb1ee5',
//       'name': 'Grace James',
//       'email': 'gracejames@renovize.com',
//       'phone': '+1 (959) 525-2529'
//     },
//     {
//       '_id': '5a56640243427b8f8445231e',
//       'name': 'Tanner Gates',
//       'email': 'tannergates@renovize.com',
//       'phone': '+1 (978) 591-2291'
//     },
//     {
//       '_id': '5a5664025c3abdad6f5e098c',
//       'name': 'Lilly Conner',
//       'email': 'lillyconner@renovize.com',
//       'phone': '+1 (842) 587-3812'
//     }
//   ]