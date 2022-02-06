const { Given, When, Then, After, AfterAll } = require('@cucumber/cucumber');
const assert = require('assert');
const EnvironmentHelper = require('../../helpers/environment_helper')
const Patient = require('../../helpers/patient')
const Helper = new EnvironmentHelper();
const envs = Helper.getEnvs();

var nfiles_before_download = 0;
var nfiles_after_download = 0;

Given('I am logged as a patient, to download DTT', { timeout: 60000 }, async () => {
  patient = new Patient(envs.PATIENT.EMAIL, envs.PATIENT.PASSWORD);
  const login_url = envs.WEBSITE_URLS.DEFAULT;
  await patient.login(login_url);
});

When('I am navigating to Help page', { timeout: 30000 }, async () => {
  await patient.redirect_to_Help_page();
});

When('I click on download DTT', { timeout: 30000 }, async () => {
  nfiles_before_download = await patient.check_number_of_files_on_dowloads_folder()
  await patient.DTT_Download();
});

Then('The DTT should be downloaded successfully', async () => {
  nfiles_after_download = await patient.check_number_of_files_on_dowloads_folder()
  assert (nfiles_before_download + 1 == nfiles_after_download);
  await patient.close_browser();
});
