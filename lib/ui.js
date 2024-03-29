const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('inquirer')
const utils = require('./utils')
const logSymbols = require('log-symbols')
const ora = require('ora')

/**
 * Ui module
 * @module ui
 */
module.exports = {

  /**
   * Shows on the console the application Title.
   */
  showTitle: () =>
    console.log(`${chalk.white(
      figlet.textSync('PagoPA CLI ', {
        horizontalLayout: 'full',
      })
    )}\n`),

  /**
   * Shows on the console an error message with red color.
   * 
   * @param {String} messageError error message
   */
  showError: messageError => {
    console.log(chalk.red(messageError))
  },

  /**
   * Shows on the console an information message with green color.
   * @param {String} messageInfo information message
   */
  showInfo: messageInfo => {
    console.log(chalk.green(messageInfo))
  },

  /**
   * Starts and show on the console a spinner logo with a yellow message.
   * 
   * @returns {ora} ora instance
   */
  startSpinner: () => {
    return ora({
      text: `${chalk.yellow('Loading...')}\n`,
      color: 'yellow',
    }).start()
  },

  /**
   * Stops a spinner instance passed as parameter.
   * 
   * @param {ora} spinner ora instance
   */
  stopSpinner: spinner => {
    spinner.stop();
  },

  /**
   * Shows on the console a menu by asking and checking the required inputs (FiscalCode, Subject, Message).
   */
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

  /**
   * Shows on the console a menu by asking to continue or not the execution.
   */
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