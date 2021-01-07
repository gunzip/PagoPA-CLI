const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('inquirer')
const utils = require('./utils')
const logSymbols = require('log-symbols')

module.exports = {

  showTitle: () =>
    console.log(`${
      chalk.white(
        figlet.textSync('PagoPA CLI ', {
          horizontalLayout: 'full',
        })
      )}\n`),
  
  showError: messageError =>{
    console.log(chalk.red(messageError))
  },

  showInfo: messageInfo => {
    console.log(chalk.green(messageInfo))
  },

  // sign in prompts
  sendMessageMenu: async () =>
    inquirer.prompt([
      {
        name: 'FiscalCode',
        type: 'input',
        message: 'Enter the addresse fiscal code:',
        validate: value => utils.validateFiscalCode(value)
          ? true
          : logSymbols.warning + ' Please enter a valid Fiscal Code'
      }, 
      {
        name: 'Subject',
        type: 'input',
        message: 'Enter the subject of the message:',
        validate: value => utils.validateSubject(value)
          ? true
          : logSymbols.warning + ' Please enter a valid subject. A valid subject must have a minimum of 10 characters and a maximum of 120 characters'
      },
      {
        name: 'Message',
        type: 'input',
        message: 'Enter the message to deliver:',
        validate: value => utils.validateMessage(value)
          ? true
          : logSymbols.warning + ' Please enter a valid message. A valid message must have a minimum of 80 characters and a maximum of 10,000 characters'
      }
    ]),

  optionMenu: async () =>
    inquirer.prompt([
      {
        name: 'option',
        type: 'rawlist',
        message: 'Send another message?:\n',
        choices: [
          'Yes',
          'No',
        ]
      }
    ]),

}