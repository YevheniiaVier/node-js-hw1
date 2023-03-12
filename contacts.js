const fs = require('fs').promises;
const path = require('path');
const filePath = path.join(__dirname, 'db/contacts.json');

// const fileOperation = async (filePath, action = 'read', data = '') => {
//   switch (action) {
//     case 'read':
//       const result = await fs.readFile(filePath, 'utf-8');
//       break;
//   }
// };

// fileOperation('db/contacts.json');
// fs.readFile('db/contacts.json', 'utf-8')
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => console.log(err.message));

/*
 * Розкоментуйте і запиши значення
 * const contactsPath = ;
 */

// TODO: задокументувати кожну функцію
const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  //   console.log(contacts);
  return contacts;
};
listContacts();

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = await contacts.find(item => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

function removeContact(contactId) {
  // ...твій код
}

const addContact = async (name, email, phone) => {
  await fs.appendFile('db/contacts.json', { name, email, phone });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
