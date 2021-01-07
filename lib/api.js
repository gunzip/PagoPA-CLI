const axios = require('axios');
const envVariables = require('../config');

module.exports = {

    checkUser: cf => {
        let header = {
                headers: {
                'Content-Type': 'application/json',
                'Ocp-Apim-Subscription-Key': envVariables.masterKey           
                }
        }
        return axios.get(envVariables.endpoint + 'profiles/' + cf, header)
    },

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