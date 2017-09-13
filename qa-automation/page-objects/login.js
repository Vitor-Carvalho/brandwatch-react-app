module.exports = {

  url: 'http://audiences-client.master:3000/login',

  elements: {
    usernameInput: 'input[placeholder="Username"]',
    passwordInput: 'input[placeholder="Password"]',
    loginButton:   'button[type="submit"]',
  },

  insertCredentials: function (username, password) {

    driver.findElement(by.css(this.elements.usernameInput)).sendKeys(username);
    driver.findElement(by.css(this.elements.passwordInput)).sendKeys(password);
    return driver.findElement(by.css(this.elements.loginButton)).click();
  },
};
