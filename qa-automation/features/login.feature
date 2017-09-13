@login
Feature: Logging into Audiences
  Valid user should be able to log in

  Scenario: Users can log into Audiences
    Given the user is on the login page
    When the user inserts valid credentials
    Then the home page is shown