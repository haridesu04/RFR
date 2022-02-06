const { Given, When, Then, After, AfterAll } = require('@cucumber/cucumber');
const EnvironmentHelper = require('../../helpers/environment_helper')
const assert = require('assert');
Hcp = require('../../helpers/hcp')

const Helper = new EnvironmentHelper();
const envs = Helper.getEnvs();
var nfiles_before_download = 0;
var nfiles_after_download = 0;


Given('I am logged as a HCP to download patient reports', { timeout: 120000 }, async () => {
  hcp = new Hcp(envs.HCP.EMAIL, envs.HCP.PASSWORD);
  const login_url = envs.WEBSITE_URLS.DEFAULT;
  await hcp.login(login_url);
});

When('I open patient reports', { timeout: 50000 }, async () => {
  await hcp.click_on_patient_reports_icon();
});

When('I click on download patient-report', { timeout: 50000 }, async () => {
  nfiles_before_download = await hcp.check_number_of_files_on_dowloads_folder()
  await hcp.download_patient_reports_from_hcp();
});

Then('I successfully downloaded the reports', { timeout: 30000 }, async () => {
  nfiles_after_download = await hcp.check_number_of_files_on_dowloads_folder()
  assert (nfiles_before_download + 1 == nfiles_after_download);
  await hcp.close_browser();
});