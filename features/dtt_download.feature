Feature: dtt download
  As a patient I need to download DTT

  Scenario: DTT Download
    Given I am logged as a patient, to download DTT
    When I am navigating to Help page 
    And I click on download DTT
    Then The DTT should be downloaded successfully