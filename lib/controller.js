const ora = require('ora')
const api = require('./api')
const utils = require('./utils')

module.exports = {
    sendMessage: (cf, subject, message) => {
        return new Promise( (resolve, reject) => {
            api.checkUser(cf).then(function (response) {
                // handle success
                if (response.data.sender_allowed) {
                    api.sendMessage(cf, subject, message).then(function (response) {
                        resolve("Message sent correctly")
                    }).catch(function (error) {
                        reject(utils.handleError(error.response.data))
                    })
                }
                else {
                    reject("User not enable to receveive messages (sender_allowed = false)")
                }
            })
            .catch(function (error) {
                // handle error
                reject(utils.handleError(error.response.data))
            })
        } ) 
    }
}
