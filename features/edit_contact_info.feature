Feature: edit Contact info
  As a patient I need to be able to change my address information

  Scenario: edit contact info
    Given I am logged as a patient to edit contact information
    When I am navigating to settings page
    And from there i navigate to edit address info
    And there I will fill address details
    Then I saved the changes successfully
    And validated address change successfully