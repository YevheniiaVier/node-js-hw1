const { Command } = require('commander');
// const readline = require('readline');

const contactsOperations = require('./contacts');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const contacts = await contactsOperations.listContacts();
      break;

    case 'get':
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id: ${id} is not found`);
      }
      break;

    case 'add':
      // ... name email phone
      break;

    case 'remove':
      // ... id
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

// invokeAction(argv);

// (async () => {
//     await invokeAction(argv)
// })();

// process.argv.slice(2);
