/**
 * Utils module
 * @module utils
 */
module.exports = {

  /**
   * Validates an input. Checks if the input is a valid fiscal code.
   * @param {String} cf fiscal code
   */
  validateFiscalCode: cf => {
    let regex = /^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/;
    return regex.test(cf);  
  },

  /**
   * Validates an input. Checks if the input is a valid subject message.
   * @param {String} sub message subject
   */
  validateSubject: sub => {
    return sub.length >= 10 && sub.length < 121
  },

  /**
   * Validates an input. Checks if the input is a valid message content.
   * @param {String} mess message content
   */
  validateMessage: mess => {
    return mess.length >= 80 && mess.length < 10001
  },

  /**
   * Handles an error response and returns the related information.
   * 
   * @param {data} errorData error data
   * @returns {String}
   */
  handleError: (errorData) => {
    if("statusCode" in errorData)
    {
      return errorData.message;
    }

    let code = errorData.status;
    switch(code)
    {
      case 400:
      case 404:
      case 500:
      case 403:
        return errorData.detail
      case 401:
        return "Unauthorized"
      case 429:
        return "Too many requests"
      default:
        return "Invalid request"
    }
  }

}