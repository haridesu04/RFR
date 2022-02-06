const config = require('../env-config.json')

const hardCodedEnvs = config;

module.exports = class EnvironmentHelper {

  getEnvs() {
    return hardCodedEnvs
  }

  async sleep(time_ms) {
    return new Promise(resolve => setTimeout(resolve, time_ms));
  }

}