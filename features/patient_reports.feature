Feature: Patient reports
  As a patient I need to be to download all my reports

  Scenario Outline: "<report_id>" Download
    Given I am a logged patient
    And I select the "<report_id>" in the Reports dropdown
    When I click on the download button
    Then the pdf should be successfully downloaded

   Examples:
    | report_id |
    | PATIENT_SUMMARY_REPORT |
    | PATIENT_PROGRESS_REPORT |
    | EXCURSION_ANALYSIS |
    | ADHERENCE |
    | INTEGRATED_DAILY_VIEW |
    | LOGBOOK |
    | DETAILS_BY_TOD |
    | DETAILS_BY_DOW |
    | DATA_LIST |