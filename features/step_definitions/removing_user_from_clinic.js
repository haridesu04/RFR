const { Given, When, Then, After, AfterAll } = require('@cucumber/cucumber');
const EnvironmentHelper = require('../../helpers/environment_helper')
Hcp = require('../../helpers/hcp')

const Helper = new EnvironmentHelper();
const envs = Helper.getEnvs();

Given('I am logged as a HCP to remove patient', { timeout: 120000 }, async () => {
  hcp = new Hcp(envs.HCP.EMAIL, envs.HCP.PASSWORD);
  const login_url = envs.WEBSITE_URLS.DEFAULT;
  await hcp.login(login_url);
});

When('I open patient profile and removed account', { timeout: 50000 }, async () => {
  await hcp.opening_patient_profile_from_patients_tab();
  await hcp.removing_patient_from_clinic();
});

Then('I removed patient successfully', { timeout: 30000 }, async () => {
  await hcp.confirming_deletion_of_patient_from_clinic();
  await hcp.close_browser();
});