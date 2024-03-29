const ora = require('ora')
const api = require('./api')
const utils = require('./utils')

/**
 * Controller module
 * @module controller
 */
module.exports = {

    /**
     * Sends a message to a user by indicating fiscal code, subject and content message.
     * 
     * Returns a string with a successful or error message.
     * 
     * @param {String} cf fiscal code
     * @param {String} subject message subject
     * @param {String} message message content
     * @returns {String}
     */
    sendMessage: (cf, subject, message) => {
        return new Promise( (resolve, reject) => {
            api.checkUser(cf).then(function (response) {
                if (response.data.sender_allowed) {
                    api.sendMessage(cf, subject, message).then(function (response) {
                        resolve("Message sent correctly")
                    }).catch(function (error) {
                        if (error.response) {
                            reject(utils.handleError(error.response.data))
                        }
                        else {
                            reject("Generic server error")
                        }
                    })
                }
                else {
                    reject("User not enable to receveive messages (sender_allowed = false)")
                }
            })
            .catch(function (error) {
                if(error.response)
                {
                    reject(utils.handleError(error.response.data))
                }
                else
                {
                    reject("Generic server error")
                }
            })
        } ) 
    }
}
