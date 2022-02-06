const { Given, When, Then, After, AfterAll } = require('@cucumber/cucumber');
const assert = require('assert');
const EnvironmentHelper = require('../../helpers/environment_helper')
const Patient = require('../../helpers/patient')

const Helper = new EnvironmentHelper();
const envs = Helper.getEnvs();

var nfiles_before_download = 0;
var nfiles_after_download = 0;
var patient;

Given('I am a logged patient', { timeout: 90000 }, async () => {
  patient = new Patient(envs.PATIENT.EMAIL, envs.PATIENT.PASSWORD);
  const login_url = envs.WEBSITE_URLS.DEFAULT;
  await patient.login(login_url);
});

Given('I select the {string} in the Reports dropdown', { timeout: 30000 }, async (report_id) => {
  await patient.select_report(report_id);
});

When('I click on the download button', { timeout: 30000 }, async () => {
  nfiles_before_download = await patient.check_number_of_files_on_dowloads_folder()
  await patient.download_report();
});

Then('the pdf should be successfully downloaded', async () => {
  nfiles_after_download = await patient.check_number_of_files_on_dowloads_folder()
  assert (nfiles_before_download + 1 == nfiles_after_download);
  await patient.close_browser();
});