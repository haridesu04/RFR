Feature: manual download
  As a patient I need to be able to open download manual reports

  Scenario: Opening Download Manual reports
    Given I am logged as a patient to read download manual reports
    When I am navigating to help page
    And I click on the download manual button
    Then the manual pdf should be successfully opened in different page