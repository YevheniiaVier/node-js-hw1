const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const filePath = path.join(__dirname, 'db/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = await contacts.find(item => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const idx = contacts.findIdex(item => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return removedContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();

  const newContact = { name, email, phone, id: uuidv4() };
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, name, email, phone) => {
  const contacts = await listContacts();
  const idx = contacts.findIdex(item => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const updatedContact = { contactId, name, email, phone };
  contacts[idx] = updatedContact;
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
