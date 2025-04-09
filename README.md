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
```

📝 Test Scope
This test suite covers the following core functionalities:
Launching the application
UI verification of currency exchange screen
Validating "Sell" and "Receive" sections
Performing currency exchange
Handling and verifying popup confirmation
Asserting balance deduction and conversion results

---

# 🧪 Test Strategy
✅ Test Scenarios from test.e2e.ts
- 🔹 General App Launch
App launches and page title is displayed
Verifies that the main screen is successfully loaded and Currency converter title is visible.

- 🔹 UI Elements & Labels
Currency exchange title is visible
Sell image is displayed
Receive image is displayed
Sell label displays correct text (Sell)
Receive label displays correct text (Receive)
From and To currency dropdowns are visible
Dropdown values show correct currencies (EUR and USD)
Submit button is visible and labeled SUBMIT

- 🔹 Balance Section
MY BALANCES title is displayed
Initial balance equals 1000 EUR
Random amount is entered in amountInput field
Entered amount matches input field value
New amount is different from initial balance

- 🔹 Balance Conversion Flow
Submit button is clicked with entered amount
Verifies popup appears after submit.
Popup displays message and OK button
Clicking OK on popup closes it and triggers balance update
EUR balance is deducted correctly (1000 - entered amount)
USD balance is updated within expected conversion range
e.g., if entered 64 EUR → check USD >= 63, USD <= 64


🧩 Key Functional Areas Covered
- ✅ Main screen verification
- ✅ Submit button action
- ✅ Form input (amount entry)
- ✅ Confirmation popup & interaction
- ✅ Balance calculation logic
- ✅ Support for local emulator and Sauce Labs

```bash
  🐞 Bug Found:
Currency Exchange: Balance is in EUR deducted, but not updated accordingly

📋 Description:
After submitting a currency exchange, the EUR balance is not correctly updated.

📌 Steps to Reproduce:
Launch the Currency Converter application
Verify the initial EUR balance is 1000 EUR
Enter a random valid value (e.g., 64) in the amountInput field
Tap the Submit button
In the confirmation popup, tap OK
Observe the updated EUR and USD balances on the main screen

✅ Expected Result:
EUR balance should be reduced by the entered amount:
1000 - 64 = 936 EUR

❌ Actual Result:
❌ EUR balance remains shows an incorrect value - eg. deducted by 63,22 instead of 64
```
