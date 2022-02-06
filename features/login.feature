Feature: Login
  I need to be able to login as any role in the  Lifescan Websites

  Scenario Outline: "<role>" Sign In
    Given I am in the initial page in the "<urltype>" website
    When I enter a valid "<role>"'s email and password and click on Sign In button
    Then I should be able to Sign In successfuly
    Then I should be able to Log out successfuly

    Examples:
    | urltype | role |
    | DEFAULT | PATIENT|
    | OLD | PATIENT |
    | DEFAULT | HCP |
    | DEFAULT | CLINICMANAGER |