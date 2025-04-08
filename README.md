# 📱 Currency Converter E2E Automation

Automated mobile tests for the Currency Converter application using:
- [WebdriverIO](https://webdriver.io/)
- [Appium](https://appium.io/)
- TypeScript
- Mocha
- Sauce Labs (Cloud Testing)

---

## 🚀 Features

- Launch & validate mobile UI components
- Run tests locally on emulator or on Sauce Labs
- Page Object Model (POM) structure
- Dynamic balance validation
- Popup interaction and balance verification

---

## 🔧 Requirements

### Local Machine
- Node.js (v18+)
- Appium (`npm install -g appium`)
- Android Studio
- Java JDK 11+
- ANDROID_HOME environment variable
- Physical or virtual Android device (Emulator)

### Sauce Labs
- Sauce Labs account
- Access key and username from [Sauce Labs](https://app.saucelabs.com/)
- Provide credentials in .env file:
export SAUCE_USERNAME=your-username
export SAUCE_ACCESS_KEY=your-access-key
- Run tests against virtual devices in SauceLabs -> npx wdio run wdio.sauce.conf.ts
- Run tests locally -> npx wdio run wdio.conf.ts


---

## 📦 Install Dependencies

```bash
npm install

---

### Project Structure 
.
├── e2e/                       # Test specs
├── pages/                     # Page Object Model
│   ├── home.page.ts
│   └── popup.page.ts
├── helpers/                   # Utilities & constants
│   ├── installApp.ts
│   ├── dataGenerator.ts
│   └── constants.ts
├── app/                       # .apk file for testing
├── wdio.conf.ts               # Local test config
├── wdio.sauce.conf.ts         # Sauce Labs config
├── tsconfig.json              # TypeScript config
└── README.md