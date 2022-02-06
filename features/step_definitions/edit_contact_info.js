const { Given, When, Then, After, AfterAll } = require('@cucumber/cucumber');
const EnvironmentHelper = require('../../helpers/environment_helper')
const Patient = require('../../helpers/patient')
const Helper = new EnvironmentHelper();
const envs = Helper.getEnvs();

Given('I am logged as a patient to edit contact information', { timeout: 60000 }, async () => {
  patient = new Patient(envs.PATIENT.EMAIL, envs.PATIENT.PASSWORD);
  const login_url = envs.WEBSITE_URLS.DEFAULT;
  await patient.login(login_url);
});

When('I am navigating to settings page', { timeout: 50000 }, async () => {
  await patient.redirect_to_Settings_page();
});
 
When('from there i navigate to edit address info', { timeout: 50000 }, async () => {
  await patient.click_on_edit_contact_info_button();
});
 
When('there I will fill address details', { timeout: 70000 }, async () => {
  await patient.fill_contact_details("APT - ", "Riverside", " mainstreet");
});

Then('I saved the changes successfully', { timeout: 30000 }, async () => {
  await patient.save_contact_info();
});

Then('validated address change successfully', { timeout: 30000 }, async () => {
  await patient.validating_edit_address_info(" mainstreet", "APT - ");
  await patient.close_browser();
});