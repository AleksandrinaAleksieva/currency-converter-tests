console.log('[SAUCE CONFIG]');
console.log('Username:', process.env.SAUCE_USERNAME || '<missing>');
console.log('Access Key:', process.env.SAUCE_ACCESS_KEY ? '✅ Provided' : '❌ Missing');

export const config: WebdriverIO.Config = {
    runner: 'local',
  
    specs: ['./e2e/**/*.ts'],
    maxInstances: 1,
    reporters: ['spec'],
  
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,

    hostname: 'ondemand.eu-central-1.saucelabs.com',
    port: 443,
    path: '/wd/hub',
  
    logLevel: 'info',
    framework: 'mocha',
    services: ['sauce'],
  
    capabilities: [{
      platformName: 'Android',
      'appium:deviceName': 'Android GoogleAPI Emulator',
      'appium:platformVersion': '12.0',
      'appium:automationName': 'UiAutomator2',
      'appium:app': 'storage:filename=Currency-converter-MQA.apk',
      'sauce:options': {
        build: 'CurrencyConverter-Build-1',
        name: 'Launch App Test',
       // deviceOrientation: 'PORTRAIT'
      }
    }],
  
    mochaOpts: {
      timeout: 60000
    }
  };
  