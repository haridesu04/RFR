const { Inbox } = require('mailinator-inbox');
const { Given, When, Then, After, AfterAll } = require('@cucumber/cucumber');
const EnvironmentHelper = require('../../helpers/environment_helper')
const Page = require('../../helpers/page')
const Helper = new EnvironmentHelper();
const envs = Helper.getEnvs();

var page;
var urlType;
var login_url

Given('I am in the initial page in the {string} website', { timeout: 30000 } , async (urltype) => {
  page = new Page();
  urlType = urltype;
  login_url = envs.WEBSITE_URLS[urltype];
  await page.open_new_url(login_url);
  await page.wait_for_element_to_be_loaded('btnLogin');
});

When('I enter a valid {string}\'s email and password and click on Sign In button', { timeout: 120000 }, async (role) => {
  await page.input_text('email', envs[role].EMAIL);
  await page.input_text('password', envs[role].PASSWORD);
  await page.click_on_element_by_id('btnLogin');

  if (login_url === "https://onetouchreveal.fr" && (role === "HCP" || role === "CLINICMANAGER")) {
    //Access the inbox
    const inbox = new Inbox(envs[role].EMAIL.split("@")[0]);
    await inbox.refresh();
    const futureEmails = await inbox.waitForEmailsFrom("contact.fr@onetouch.com", 60000);
    var mfa = null;
    Array.prototype.forEach.call(futureEmails, async (emailInfo) => {
      const email = await inbox.getEmail(emailInfo.id);
      mfa = email.htmlBody.substring(email.htmlBody.lastIndexOf("otpCode=") + 8, email.htmlBody.lastIndexOf("&loginId="));
      await Helper.sleep(2000);
      await page.input_text('code', mfa);
      await page.click_on_element_by_id('saveMfaAuthMethod');
    })
  }
  
});

Then('I should be able to Sign In successfuly', { timeout: 30000 }, async () => {
  await page.wait_for_element_to_be_loaded('logout');
  // Waiting for page to be fully loaded
  await Helper.sleep(envs.LOADING_LIMIT_MS);
});

Then('I should be able to Log out successfuly', { timeout: 50000 }, async () => {
  try {
    await page.click_on_element_by_xpath('/html/body/ngb-modal-window/div/div/app-patient-dashboard-modal/div/div/button');
  } catch {
    //No First Access confirmation message - Skipping step
  }
  await page.click_on_element_by_xpath('//*[@id="logout"]/a');
  await page.wait_for_element_to_be_loaded('btnLogin');
  await page.close_browser();
});