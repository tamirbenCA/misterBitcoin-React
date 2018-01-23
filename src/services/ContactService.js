var contacts = [
  {
    "_id": "5a56640269f443a5d64b32ca",
    "imgUrl": "./img/image_avatar.png",
    "name": "Ochoa Hyde",
    "email": "ochoahyde@renovize.com",
    "phone": "+1 (968) 593-3824"
  },
  {
    "_id": "5a5664025f6ae9aa24a99fde",
    "imgUrl": "./img/image_avatar.png",
    "name": "Hallie Mclean",
    "email": "halliemclean@renovize.com",
    "phone": "+1 (948) 464-2888"
  },
  {
    "_id": "5a56640252d6acddd183d319",
    "imgUrl": "./img/image_avatar.png",
    "name": "Parsons Norris",
    "email": "parsonsnorris@renovize.com",
    "phone": "+1 (958) 502-3495"
  },
  {
    "_id": "5a566402ed1cf349f0b47b4d",
    "imgUrl": "./img/image_avatar.png",
    "name": "Rachel Lowe",
    "email": "rachellowe@renovize.com",
    "phone": "+1 (911) 475-2312"
  },
  {
    "_id": "5a566402abce24c6bfe4699d",
    "imgUrl": "./img/image_avatar.png",
    "name": "Dominique Soto",
    "email": "dominiquesoto@renovize.com",
    "phone": "+1 (807) 551-3258"
  },
  {
    "_id": "5a566402a6499c1d4da9220a",
    "imgUrl": "./img/image_avatar.png",
    "name": "Shana Pope",
    "email": "shanapope@renovize.com",
    "phone": "+1 (970) 527-3082"
  },
  {
    "_id": "5a566402f90ae30e97f990db",
    "imgUrl": "./img/image_avatar.png",
    "name": "Faulkner Flores",
    "email": "faulknerflores@renovize.com",
    "phone": "+1 (952) 501-2678"
  },
  {
    "_id": "5a5664027bae84ef280ffbdf",
    "imgUrl": "./img/image_avatar.png",
    "name": "Holder Bean",
    "email": "holderbean@renovize.com",
    "phone": "+1 (989) 503-2663"
  },
  {
    "_id": "5a566402e3b846c5f6aec652",
    "imgUrl": "./img/image_avatar.png",
    "name": "Rosanne Shelton",
    "email": "rosanneshelton@renovize.com",
    "phone": "+1 (968) 454-3851"
  },
  {
    "_id": "5a56640272c7dcdf59c3d411",
    "imgUrl": "./img/image_avatar.png",
    "name": "Pamela Nolan",
    "email": "pamelanolan@renovize.com",
    "phone": "+1 (986) 545-2166"
  },
  {
    "_id": "5a5664029a8dd82a6178b15f",
    "imgUrl": "./img/image_avatar.png",
    "name": "Roy Cantu",
    "email": "roycantu@renovize.com",
    "phone": "+1 (929) 571-2295"
  },
  {
    "_id": "5a5664028c096d08eeb13a8a",
    "imgUrl": "./img/image_avatar.png",
    "name": "Ollie Christian",
    "email": "olliechristian@renovize.com",
    "phone": "+1 (977) 419-3550"
  },
  {
    "_id": "5a5664026c53582bb9ebe9d1",
    "imgUrl": "./img/image_avatar.png",
    "name": "Nguyen Walls",
    "email": "nguyenwalls@renovize.com",
    "phone": "+1 (963) 471-3181"
  },
  {
    "_id": "5a56640298ab77236845b82b",
    "imgUrl": "./img/image_avatar.png",
    "name": "Glenna Santana",
    "email": "glennasantana@renovize.com",
    "phone": "+1 (860) 467-2376"
  },
  {
    "_id": "5a56640208fba3e8ecb97305",
    "imgUrl": "./img/image_avatar.png",
    "name": "Malone Clark",
    "email": "maloneclark@renovize.com",
    "phone": "+1 (818) 565-2557"
  },
  {
    "_id": "5a566402abb3146207bc4ec5",
    "imgUrl": "./img/image_avatar.png",
    "name": "Floyd Rutledge",
    "email": "floydrutledge@renovize.com",
    "phone": "+1 (807) 597-3629"
  },
  {
    "_id": "5a56640298500fead8cb1ee5",
    "imgUrl": "./img/image_avatar.png",
    "name": "Grace James",
    "email": "gracejames@renovize.com",
    "phone": "+1 (959) 525-2529"
  },
  {
    "_id": "5a56640243427b8f8445231e",
    "imgUrl": "./img/image_avatar.png",
    "name": "Tanner Gates",
    "email": "tannergates@renovize.com",
    "phone": "+1 (978) 591-2291"
  },
  {
    "_id": "5a5664025c3abdad6f5e098c",
    "imgUrl": "./img/image_avatar.png",
    "name": "Lilly Conner",
    "email": "lillyconner@renovize.com",
    "phone": "+1 (842) 587-3812"
  }
]

function getContacts(filterBy = null) {
  var contactsToReturn = contacts;
  if (filterBy) {
    contactsToReturn = contacts.filter( contact => {
      return contact.name.toLocaleLowerCase().includes(filterBy) ||
             contact.phone.toLocaleLowerCase().includes(filterBy) ||
             contact.email.toLocaleLowerCase().includes(filterBy)
    })
  }
  return Promise.resolve(contactsToReturn);
}

function getContactById(id) {
  return Promise.resolve(contacts.filter(contact => contact._id === id)[0])
}

function deleteContact(id) {
  contacts.splice(_getContactIdx(contacts, id), 1)
  return Promise.resolve(contacts);
}

function saveContact(contactToUpdate) {
  if (contactToUpdate._id) {
    contacts.splice(_getContactIdx(contacts, contactToUpdate._id), 1, contactToUpdate)
  } else {
    contactToUpdate._id = _getUniqueId();
    contacts.push(contactToUpdate);
  }
  return Promise.resolve(contacts);
}

function getEmptyContact() {
  var emptyContact = {
    imgUrl: './img/image_avatar.png',
    name: '',
    email: '',
    phone: ''
  }
  return Promise.resolve(emptyContact)
}

// No need, it's merged with getContact func
// function filteredContacts(term) {
//   var filteredContacts = contacts.filter(contact => 
//     contact.name.toLowerCase().includes(term.toLowerCase()))
//   return Promise.resolve(filteredContacts)
// }

function _getContactIdx(contacts, contactId) {
  return contacts.findIndex(contact => contact._id === contactId)
}

function _getUniqueId() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
}

export default {
  getContacts,
  getContactById,
  deleteContact,
  saveContact,
  getEmptyContact,
  // filteredContacts
}