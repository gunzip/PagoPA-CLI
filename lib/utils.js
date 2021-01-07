module.exports = {

  validateFiscalCode: cf => {
    let regex = /^[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}$/;
    return regex.test(cf);  
  },

  validateSubject: sub => {
    return sub.length >= 10 && sub.length < 121
  },

  validateMessage: mess => {
    return mess.length >= 80 && mess.length < 10001
  },

  handleError: (errorData) => {
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