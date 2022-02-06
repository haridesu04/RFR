const { Inbox } = require('mailinator-inbox');
const EnvironmentHelper = require('./environment_helper')
const Page = require('./page')
const fs = require('fs');

const Helper = new EnvironmentHelper();
const envs = Helper.getEnvs();
var random = Math.floor(Math.random() * 20) + 1;

module.exports = class hcp {

  constructor(email, password){
    this.page = new Page();
    this.email =  email
    this.password = password
  }

  async check_if_HCP_is_logged(){
    try{
      await this.page.wait_for_element_to_be_loaded('logout');
    } catch{
      return false
    }
    return true
  }

  async login(login_url){
    await this.page.open_new_url(login_url);
    if (!await this.check_if_HCP_is_logged()){
      await this.page.wait_for_element_to_be_loaded('btnLogin');
      await this.page.input_text('email', this.email);
      await this.page.input_text('password', this.password);
      await this.page.click_on_element_by_id('btnLogin');

      if (login_url === "https://onetouchreveal.fr") {
        //Access the inbox
        const inbox = new Inbox(this.email.split("@")[0]);
        //Load emails
        await inbox.refresh();
        //Wait for new emails from contact.fr@onetouch.com
        const futureEmails = await inbox.waitForEmailsFrom("contact.fr@onetouch.com", 60000);
        //Iterate over the headers of the new emails 
        var mfa = null;
        Array.prototype.forEach.call(futureEmails, async (emailInfo) => {
          const email = await inbox.getEmail(emailInfo.id); 
          mfa = email.htmlBody.substring(email.htmlBody.lastIndexOf("otpCode=") + 8, email.htmlBody.lastIndexOf("&loginId="));
          await Helper.sleep(2000);
          await this.page.input_text_by_xpath('/html/body/app-root/app-login-layout/div/app-login-mfa-verify/div/div[1]/form/div[1]/input', mfa);  
          await this.page.click_on_element_by_id('saveMfaAuthMethod');
        })
      }

      await this.page.wait_for_element_to_be_loaded('logout');
      await Helper.sleep(envs.LOADING_LIMIT_MS);
      try {
        await this.page.click_on_element_by_text('/html/body/ngb-modal-window/div/div/app-patient-dashboard-modal/div/div/button');
      } catch {
        //No First Access confirmation message - Skipping step
      }
    }
  }

  async check_number_of_files_on_dowloads_folder(){
    const nfiles = fs.readdirSync(envs.DOWNLOADPATH).length;
    return nfiles;
  }

  async close_browser(page){
    await this.page.close_browser();
  }

  async click_on_notification_icon(){
    await this.page.click_on_element_by_class('user-image ng-star-inserted');
    await Helper.sleep(envs.LOADING_LIMIT_MS);
  }

  async confirm_patient_clinic_subscription_request(){
    await this.page.click_on_element_by_id('confirmPatient');
    await Helper.sleep(envs.LOADING_LIMIT_MS);
  }

  async adding_patient_id_and_role(){
    await this.page.input_by_text_find_by_name('patientID', random);
    await Helper.sleep(envs.LOADING_LIMIT_MS);

    await this.page.input_by_text_find_by_name('clinic',' ');
    await this.page.click_on_element_by_xpath('//*[@id="patientQueueList"]/li/div/form/select/option[2]');
    await Helper.sleep(envs.LOADING_LIMIT_MS);
  }

  async saving_patient_role_and_id(){
    await this.page.click_on_element_by_id('submitPatientRequest');
    await Helper.sleep(envs.LOADING_LIMIT_MS);
  }

  async click_on_patient_reports_icon(){
    await this.page.click_on_element_by_class('reportIcon tool-tip ng-star-inserted');
    await Helper.sleep(envs.LOADING_LIMIT_MS);
  }
    
  async validating_patient_added_to_clinic(){
    await this.page.find_element_by_class('reportIcon tool-tip ng-star-inserted');
  }

  async download_patient_reports_from_hcp(){
    await this.page.click_on_element_by_id('printButton');
    await Helper.sleep(envs.LOADING_LIMIT_MS);
    await this.page.click_on_element_by_id('downloadReport');
    await Helper.sleep(envs.LOADING_LIMIT_MS);
    await this.page.click_on_element_by_class('btn-common hot btn-primary-popup ng-star-inserted');
  }

  async removing_patient_from_clinic(){ 
    await this.page.click_on_element_by_xpath('//*[@id="mainWrap"]/app-patients/app-profile/div/div/div[3]/div/div/div/app-remove-patient/div/div/div/a/span');
    await Helper.sleep(envs.LOADING_LIMIT_MS);
  }

  async opening_patient_profile_from_patients_tab(){
    await this.page.click_on_element_by_xpath('//*[@id="patient_list_table"]/table/tbody/tr/td[1]/a/span');
    await Helper.sleep(envs.LOADING_LIMIT_MS);
  }
    
  async confirming_deletion_of_patient_from_clinic(){
    await this.page.click_on_element_by_class('btn-common hot btn-primary-popup');
    await Helper.sleep(envs.LOADING_LIMIT_MS);
  }
}