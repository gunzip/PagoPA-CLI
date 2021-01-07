#!/usr/bin/env node
const ora = require('ora')
const chalk = require('chalk')
const clear = require('clear')
const ui = require('./lib/ui')
const controller = require('./lib/controller')

// clear the terminal
clear()

// display the title
ui.showTitle()

// main function
const run = async () => {
        let end = false;
        while(!end)
        {
            const messageParameters = await ui.sendMessageMenu()

            spinner = ora({
                text: `${chalk.yellow('Loading...')}\n`,
                color: 'yellow',
            }).start()
            
            
            await controller.sendMessage(messageParameters.FiscalCode, messageParameters.Subject, messageParameters.Message)
            .then(function(message){
                spinner.stop()
                ui.showInfo(message)
            }).catch(function(errorMessage){
                spinner.stop();
                ui.showError(errorMessage);
            })

            let resContinue = await ui.optionMenu()
            end = resContinue.option == 'No' 
            clear();
        }
}
run()