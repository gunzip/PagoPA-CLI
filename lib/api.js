const axios = require('axios');
const envVariables = require('../config');

/**
 * API module
 * @module api
 */
module.exports = {
    /**
     * GET API call to check if a user exists by fiscal code.
     * 
     * @param {String} cf fiscal code
     * @returns {Promise} Promise
     */
    checkUser: cf => {
        let header = {
                headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': envVariables.masterKey           
                }
        }
        return axios.get(envVariables.endpoint + 'profiles/' + cf, header)
    },

    /**
     * POST API call to send a message to an user.
     * 
     * @param {String} cf fiscal code
     * @param {String} subject message subject
     * @param {String} message message content
     * @returns {Promise}
     */
    sendMessage: (cf, subjectMessage, message) => {
        let header = {
            headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': envVariables.masterKey
            }
        }
        let body = {
            fiscal_code: cf,
            content: {
                        subject: subjectMessage,
                        markdown: message
                    }
        }
        return axios.post(envVariables.endpoint + 'messages', body, header)
    }
}