const { Given, When, Then, After, AfterAll } = require('@cucumber/cucumber');
const EnvironmentHelper = require('../../helpers/environment_helper')
const Patient = require('../../helpers/patient')

const Helper = new EnvironmentHelper();
const envs = Helper.getEnvs();

Given('I am logged as a patient to read download manual reports', { timeout: 60000 }, async () => {
  patient = new Patient(envs.PATIENT.EMAIL, envs.PATIENT.PASSWORD);
  const login_url = envs.WEBSITE_URLS.DEFAULT;
  await patient.login(login_url);
});

When('I am navigating to help page', { timeout: 30000 }, async () => {
  await patient.redirect_to_Help_page();
});

When('I click on the download manual button', { timeout: 30000 }, async () => {
  await patient.manual_download();
});

Then('the manual pdf should be successfully opened in different page', { timeout: 30000 }, async () => {
  await patient.verify_manual_status();
  await patient.close_browser();
});
