const { assert } = require('chai');
const { Builder, Capabilities, By, DirectoryInfo, until, WebElement, WebDriver } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const EnvironmentHelper = require('./environment_helper')
require("chromedriver");
const chrome = require('selenium-webdriver/chrome')

const Helper = new EnvironmentHelper();
const envs = Helper.getEnvs();

module.exports = class Page {

  constructor(){
    const capabilities = Capabilities.chrome();
    capabilities.set('chromeOptions', { "w3c": false });
    this.driver = new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options().headless()).withCapabilities(capabilities).build();
  }

  async input_text(element_id, text){
    const input = await this.driver.findElement(By.id(element_id));
    input.clear()
    await input.sendKeys(text);
  }

  async input_text_by_xpath(element_xpath, text){
    const input = await this.driver.findElement(By.xpath(element_xpath));
    await input.sendKeys(text);
  }

  async input_by_text_find_by_name(element_name, text){
    const input = await this.driver.findElement(By.name(element_name));
    await input.sendKeys(text);
  }

  async find_element_by_text(text){
    const x_path = `//*[text()=\'${text}\']`;
    const element = await this.driver.findElement(By.xpath(x_path));
    return element;
  }

  async find_element_by_id(element_id){
    const element = await this.driver.findElement(By.id(element_id));
    return element;
  }

  async click_on_element_by_id(element_id){
    const element = await this.find_element_by_id(element_id);
    await element.click();
  }

  async validate_if_the_current_url_is_usermanual(){
    const element = await this.driver.getCurrentUrl();
    const file = element.split("pdf/")[1].split("_")[0]
    assert.equal("UserManualConsumer", file);
  }

  async find_element_by_class(class_name){
    const element = await this.driver.findElement(By.className(class_name));
    return element;
  }

  async click_on_element_by_class(class_name){
    const element = await this.find_element_by_class(class_name);
    await element.click();
  }
  
  async click_on_element_by_text(text){
    const element = await this.find_element_by_text(text);
    await element.click();
  }

  async click_on_element_in_dropdown_by_id(dropdown_id, element_id){
    await this.click_on_element_by_id(dropdown_id);
    await this.click_on_element_by_id(element_id);
  }
  
  async open_new_url(url){
    await this.driver.get(url);
  }

  async wait_for_element_to_be_loaded(element_id, time_to_wait=envs.LOADING_LIMIT_MS){
    await this.driver.wait(until.elementLocated(By.id(element_id)), time_to_wait);
  }

  async close_browser(){
    await this.driver.quit();
  }

  async click_on_element_by_xpath(element_xpath_value){
    await this.driver.findElement(By.xpath(element_xpath_value)).click();
  }
}     