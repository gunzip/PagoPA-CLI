const api = require('../lib/api')
const axios = require('axios');
const envVariables = require('../config');
const utils = require('../lib/utils')
const controller = require('../lib/controller')

jest.mock('axios');

let valid_cf = 'AAAAAA00A00A000A'
let invalid_cf = 'AAAAAA00A00A0002'

let valid_message = 'Please enter a valid message. A valid message must have a minimum of 80 characters and a maximum of 10,000 characters'
let invalid_message = 'Invaid mess'

let valid_subject = "Valid subject"
let invalid_subject = "Inv sub"

axios.get.mockImplementation((url) => {
    switch (url) {
        case envVariables.endpoint + 'profiles/' + valid_cf:
            return Promise.resolve({ data: { sender_allowed: true }})

        default:
            return Promise.reject({
                response: {
                    data: {
                        "detail": "value [" + invalid_cf + "] at [root] is not a valid [string that matches the pattern \"^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]$\"]",
                        "status": 400,
                        "title": "Invalid string that matches the pattern \"^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]$\""
                    }
                }
            })
    }
})



axios.post.mockImplementation((url, body) => {
    switch (url) {
        case envVariables.endpoint + 'messages':
            if (utils.validateFiscalCode(body.fiscal_code) && utils.validateSubject(body.content.subject) && utils.validateMessage(body.content.markdown) )
            {
                return Promise.resolve({
                    data: {
                        id: "01BX9NSMKVXXS5PSP2FATZMYYY"
                    }
                })
            }

            if (utils.validateFiscalCode(body.fiscal_code) && !utils.validateSubject(body.content.subject) && utils.validateMessage(body.content.markdown)) {
                return Promise.reject({
                    response: {
                        data: {
                            "detail": "value [" + body.content.subject + "] at [root.0.0.content.0.subject] is not a valid [string of length >= 10 and < 121]",
                            "status": 400,
                            "title": "Invalid (Exact<NewMessage> & { time_to_live: (integer >= 3600 and < 604800 | 604800) })"
                        }
                    }
                })
            }

            if (utils.validateFiscalCode(body.fiscal_code) && utils.validateSubject(body.content.subject) && !utils.validateMessage(body.content.markdown) )
            {
                return Promise.reject({
                    response: {
                        data: {
                            "detail": "value [" + body.content.markdown + "] at [root.0.0.content.0.markdown] is not a valid [string of length >= 80 and < 10001]",
                            "status": 400,
                            "title": "Invalid (Exact<NewMessage> & { time_to_live: (integer >= 3600 and < 604800 | 604800) })"
                        }
                    }
                })
            }
            else{
                return Promise.reject({
                    response: {
                        data: {
                            "detail": "You are not allowed to issue requests for the recipient.",
                            "status": 403,
                            "title": "Recipient forbidden"
                        }
                    }
                })
            }
    }
})


test('Test checkUser with success', () => {
    return api.checkUser(valid_cf).then(response => {
        expect(response.data.sender_allowed).toBeTruthy()
    })
})

test('Test checkUser with fail', () => {
    return api.checkUser(invalid_cf).catch(error => {
        expect(error.response.data.status).toBe(400)
    })
})

test('Test api sendMessage with success', () => {
    return api.sendMessage(valid_cf, valid_subject, valid_message).then(response => {
        expect(response.data.id).toBeDefined()
    })
})

test('Test api sendMessage with fail (invalid message)', () => {
    return api.sendMessage(valid_cf, valid_subject, invalid_message).catch(error => {
        expect(error.response.data.status).toBe(400)
    })
})

test('Test api sendMessage with fail (invalid subject)', () => {
    return api.sendMessage(valid_cf, invalid_subject, valid_message).catch(error => {
        expect(error.response.data.status).toBe(400)
    })
})


test("Test sendMessage controller with success", () => {
    return controller.sendMessage(valid_cf, valid_subject, valid_message).then(response => {
        expect(response).toBe("Message sent correctly")
    })
})

test("Test sendMessage controller with fail (invalid fiscal code)", () => {
    return controller.sendMessage(invalid_cf, valid_subject, valid_message).catch(response => {
        expect(response).toBe('value ['+ invalid_cf +'] at [root] is not a valid [string that matches the pattern "^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]$"]')
    })
})

test("Test sendMessage controller with fail (invalid subject)", () => {
    return controller.sendMessage(valid_cf, invalid_subject, valid_message).catch(response => {
        expect(response).toBe('value [' + invalid_subject + '] at [root.0.0.content.0.subject] is not a valid [string of length >= 10 and < 121]')
    })
})

test("Test sendMessage controller with fail (invalid message)", () => {
    return controller.sendMessage(valid_cf, valid_subject, invalid_message).catch(response => {
        expect(response).toBe('value [' + invalid_message + '] at [root.0.0.content.0.markdown] is not a valid [string of length >= 80 and < 10001]')
    })
})
