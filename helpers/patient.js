const EnvironmentHelper = require('./environment_helper')
const Page = require('./page')
const fs = require('fs');
const { assert } = require('chai');

const Helper = new EnvironmentHelper();
const envs = Helper.getEnvs();
var random = Math.floor(Math.random() * 20) + 1;
var random2 = Math.floor(Math.random() * 200000) + 1;

module.exports = class Patient {

  constructor(Email, Password){
    this.page = new Page();
    this.email = Email
    this.password = Password
  }

  async check_if_patient_is_logged(){
    try{
      await this.page.wait_for_element_to_be_loaded('logout');
    } catch{
      return false
    }
    return true
  }

  async login(login_url){
    await this.page.open_new_url(login_url);
    if (!await this.check_if_patient_is_logged()){
      await this.page.wait_for_element_to_be_loaded('btnLogin');
      await this.page.input_text('email', this.email);
      await this.page.input_text('password', this.password);
      await this.page.click_on_element_by_id('btnLogin');
      await this.page.wait_for_element_to_be_loaded('logout');
      await Helper.sleep(envs.LOADING_LIMIT_MS);
      try {
        await this.page.click_on_element_by_xpath('/html/body/ngb-modal-window/div/div/app-patient-dashboard-modal/div/div/button');
      } catch {
        //No First Access confirmation message - Skipping step
      }
    }
    await Helper.sleep(envs.LOADING_LIMIT_MS)
  }

  async navigate_to_page(page_url){
    await this.page.open_new_url(page_url);
    await Helper.sleep(envs.LOADING_LIMIT_MS)
  }

  async select_report(report_id){
    await this.page.click_on_element_in_dropdown_by_id("reportId", report_id);
    await Helper.sleep(envs.LOADING_LIMIT_MS)
  }

  async check_number_of_files_on_dowloads_folder(){
    const nfiles = fs.readdirSync(envs.DOWNLOADPATH).length;
    return nfiles;
  }

  async download_report(){
    await this.page.click_on_element_by_id("printButton");
    await Helper.sleep(envs.LOADING_LIMIT_MS)
  }

  async logout(){
    await this.page.click_on_element_by_xpath('//*[@id="logout"]/a');
    await this.page.wait_for_element_to_be_loaded('btnLogin');
  }

  async close_browser(page){
    await this.page.close_browser();
  }

  async redirect_to_Help_page(){
    await this.page.click_on_element_by_xpath('//*[@id="welcomeMessage"]/p[2]/small/span[2]/a');
    await this.page.wait_for_element_to_be_loaded('downloadUploader');
  }

  async redirect_to_Settings_page(){
    await this.page.click_on_element_by_xpath('//*[@id="welcomeMessage"]/p[2]/small/span[1]/a');
    await this.page.wait_for_element_to_be_loaded('editContactInfo');
    await Helper.sleep(envs.LOADING_LIMIT_MS)
  }

  async click_on_add_clinic_info(){
    await this.page.click_on_element_by_id("showFindDoctorOffice");
    await this.page.wait_for_element_to_be_loaded("getDoctorOffice");
    await Helper.sleep(envs.LOADING_LIMIT_MS)
  }

  async manual_download(){
    await this.page.click_on_element_by_id("downloadManual");
  }

  async look_for_clinic_with_entered_clinic_code(){
    await this.page.click_on_element_by_id("getDoctorOffice");
    await Helper.sleep(envs.LOADING_LIMIT_MS)
  }

  async fill_clinic_code(clinic_code){
    await this.page.input_text('findOfficeCode', clinic_code);
    await Helper.sleep(envs.LOADING_LIMIT_MS);
  }

  async DTT_Download(){
    await this.page.click_on_element_by_id('downloadUploader');
    await Helper.sleep(envs.LOADING_LIMIT_MS)
  }

  async confirm_clinic(){
    await this.page.click_on_element_by_id("confirmDoctorOffice");
    await Helper.sleep(envs.LOADING_LIMIT_MS)
  }

  async fill_contact_details(homeaddress2, cityname, streetname){
    await this.page.input_text('homeAddress1', random + streetname);
    await this.page.input_text('homeAddress2', homeaddress2 + random);
    await this.page.input_text('profCity', cityname);
    await this.page.input_text('phone', random2 + random2);
    await this.page.input_text('profZipPostal', random2);
    await Helper.sleep(envs.LOADING_LIMIT_MS)
  }

  async click_on_edit_contact_info_button(){
    await this.page.click_on_element_by_id("editContactInfo");
    await this.page.wait_for_element_to_be_loaded("cancelEditContactInfo");
    await Helper.sleep(envs.LOADING_LIMIT_MS)
  }

  async save_contact_info(){
    await this.page.click_on_element_by_xpath('//*[@id="saveContactInfo"]/span');
    await Helper.sleep(envs.LOADING_LIMIT_MS)
  }

  async validating_clinic_request(){
    await this.page.wait_for_element_to_be_loaded('withdrawRequest');
    await Helper.sleep(envs.LOADING_LIMIT_MS)
  }

  async confirm_clinic_checkbox(){
    await this.page.click_on_element_by_id("confimShareCheckbox");
    await Helper.sleep(envs.LOADING_LIMIT_MS)
    await this.page.click_on_element_by_id("okBtn");
  }

  async verify_manual_status() {
    await this.page.validate_if_the_current_url_is_usermanual();
    await Helper.sleep(envs.LOADING_LIMIT_MS)
  }

  async validating_edit_address_info(streetname, homeaddress2){
    var addr1 = await this.page.driver.findElement({id: 'userAddress1'}).getText()
    assert.equal(random + streetname, addr1);

    var addr2 = await this.page.driver.findElement({id: 'userAddress2'}).getText()
    assert.equal(homeaddress2 + random, addr2);
  }
}