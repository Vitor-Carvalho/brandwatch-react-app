module.exports = function () {

  this.Given(/^the user is on the login page$/, function () {
    return helpers.loadPage(page.login.url);
  });

  this.When(/^the user inserts valid credentials$/, function () {
    return page.login.insertCredentials(global.shared.credentials.username, global.shared.credentials.password);
  });

  this.Then(/^the home page is shown$/, function () {
    driver.wait(until.elementsLocated(by.css('.ax-space--x0')), 2000);
    elem = driver.findElement(by.css('.ax-space--x0'));
    return elem.getText().then(s => assert.equal(s, 'Brandwatch Audiences'));
  });

};
