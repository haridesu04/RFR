Feature: patient clinic link functions
  here from one place we run different senarios related to patient and clinic, at first patient send request to clinic and then hcp accepts the request and prints patient reports from there removing paitent from clinic for further automation to run with same details  

  Scenario: Adding new clinic with clinic code from patient
    Given I am logged as a patient
    When I am navigating to Settings page
    And I am opening add-clinic on connections 
    And I entered clinic code and click on Search button
    Then I successfully saved clinic
    When I acknowledge the confirmation popup
    Then I validated the request successfully

  Scenario: As a HCP, I am accepting patient request to join clinic
    Given I am logged as a hcp
    When I open notifications for accepting patient
    And I click on confirmation for adding patient to clinic
    When I enter patient id,role and saved the entry
    Then successfully saved the patient 

  Scenario: printing patient-report from hcp 
    Given I am logged as a HCP to download patient reports
    When I open patient reports
    And I click on download patient-report
    Then I successfully downloaded the reports

  Scenario: removing patient from clinic
    Given I am logged as a HCP to remove patient
    When I open patient profile and removed account
    Then I removed patient successfully