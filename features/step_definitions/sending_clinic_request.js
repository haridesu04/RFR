const { Given, When, Then, After, AfterAll } = require('@cucumber/cucumber');
const EnvironmentHelper = require('../../helpers/environment_helper')
const Patient = require('../../helpers/patient')

const Helper = new EnvironmentHelper();
const envs = Helper.getEnvs();

Given('I am logged as a patient', { timeout: 60000 }, async () => {
  patient = new Patient(envs.PATIENT.EMAIL, envs.PATIENT.PASSWORD);
  const login_url = envs.WEBSITE_URLS.DEFAULT;
  await patient.login(login_url);
});

When('I am navigating to Settings page', { timeout: 40000 }, async () => {
  await patient.redirect_to_Settings_page();
});
 
When('I am opening add-clinic on connections', { timeout: 30000 }, async () => {
  await patient.click_on_add_clinic_info();
});

When('I entered clinic code and click on Search button', { timeout: 60000 }, async () => {
  await patient.fill_clinic_code(envs.CLINICCODE);
  await patient.look_for_clinic_with_entered_clinic_code();
});

Then('I successfully saved clinic', { timeout: 30000 }, async () => {
  await patient.confirm_clinic();
});

When('I acknowledge the confirmation popup', { timeout: 50000 }, async () => {
  await patient.confirm_clinic_checkbox(); 
});

Then('I validated the request successfully', { timeout: 30000 }, async () => {
  await patient.validating_clinic_request(); 
  await patient.close_browser();
});