const { Given, When, Then, After, AfterAll } = require('@cucumber/cucumber');
const EnvironmentHelper = require('../../helpers/environment_helper')
Hcp = require('../../helpers/hcp')

const Helper = new EnvironmentHelper();
const envs = Helper.getEnvs();

Given('I am logged as a hcp', { timeout: 120000 }, async () => {
  hcp = new Hcp(envs.HCP.EMAIL, envs.HCP.PASSWORD);
  const login_url = envs.WEBSITE_URLS.DEFAULT;
  await hcp.login(login_url);
});

When('I open notifications for accepting patient', { timeout: 50000 }, async () => {
  await hcp.click_on_notification_icon();
});

When('I click on confirmation for adding patient to clinic', { timeout: 30000 }, async () => {
  await hcp.confirm_patient_clinic_subscription_request();
});

When('I enter patient id,role and saved the entry', { timeout: 70000 }, async () => {
  await hcp.adding_patient_id_and_role();
  await hcp.saving_patient_role_and_id();
});

Then('successfully saved the patient', { timeout: 30000 }, async () => {
  await hcp.validating_patient_added_to_clinic();
  await hcp.close_browser();
 });