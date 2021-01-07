#!/usr/bin/env node
const clear = require('clear')
const ui = require('./lib/ui')
const controller = require('./lib/controller')
const envVariables = require('./config');

// clear the terminal
clear()

// display the title
ui.showTitle()

/**
 * Main function. 
 */
const run = async () => {

    if (!envVariables.endpoint || !envVariables.masterKey) {
        ui.showError(".env file not exists or invalid parameters of .env file");
        process.exit()
    }

    let end = false;
    while(!end)
    {
        const messageParameters = await ui.sendMessageMenu()

        let spinner = ui.startSpinner();
        
        await controller.sendMessage(messageParameters.FiscalCode, messageParameters.Subject, messageParameters.Message)
        .then(function(message){
            ui.stopSpinner(spinner)
            ui.showInfo(message)
        }).catch(function(errorMessage){
            ui.stopSpinner(spinner)
            ui.showError(errorMessage);
        })

        let resContinue = await ui.optionMenu()
        end = resContinue.option == 'No' 
        clear();
    }
}
run()