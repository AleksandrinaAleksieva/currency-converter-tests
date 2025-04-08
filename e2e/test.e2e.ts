import { expect } from '@wdio/globals';
import { installApp } from '../helpers/installApp';
import { generateRandomBalance } from '../helpers/dataGenerator';
import { APP_PACKAGE_ID, LABELS, CURRENCIES, BALANCES } from '../helpers/constants';
import Popup from '../pages/popup.page';

import HomePage from '../pages/home.page'

describe('Currency convertor', () => {
  let randomAmount:any;

  before(async () => {
    if (!process.env.SAUCE_USERNAME && !process.env.SAUCE_ACCESS_KEY) {
      console.log('📦 Installing app locally...');
      await installApp();
    } else {
      console.log('☁️ Running on Sauce Labs — skipping app install');
    }

    console.log('🚀 Launching the app...');
    await driver.activateApp(APP_PACKAGE_ID);
    await HomePage.pageTitle.waitForDisplayed({ timeout: 10000 });
  });

  it('should display the correct page title', async () => {
    const isTitleVisible = await HomePage.isPageTitlePresent();
    expect(isTitleVisible).toBe(true);
  });

  it('should show the currency exchange title', async () => {
    const isVisible = await HomePage.isCurrencyExchangeTitlePresent();
    expect(isVisible).toBe(true);
  });

  it('should display the Sell image', async () => {
    const sellVisible = await HomePage.isSellImagePresent();
    expect(sellVisible).toBe(true);
  });

  it('should display the Receive image', async () => {
    const receiveVisible = await HomePage.isDepositImagePresent();
    expect(receiveVisible).toBe(true);
  });

  it('should verify the Sell label text', async () => {
    const sellText = await HomePage.getSellLabelText();
    expect(sellText).toBe(LABELS.sell);
  });

  it('should verify the Receive label text', async () => {
    const receiveText = await HomePage.getReceiveLabelText();
    expect(receiveText).toBe(LABELS.receive);
  });

  it('should display From and To currency dropdowns', async () => {
    const fromVisible = await HomePage.isFromCurrencyPresent();
    const toVisible = await HomePage.isToCurrencyPresent();
    expect(fromVisible).toBe(true);
    expect(toVisible).toBe(true);
  });

  it('should display correct currency values in dropdowns', async () => {
    const fromCurrency = await HomePage.getFromCurrencyText();
    const toCurrency = await HomePage.getToCurrencyText();
    expect(fromCurrency).toBe(CURRENCIES.eur);
    expect(toCurrency).toBe(CURRENCIES.usd);
  });

  it('should display the Submit button with correct label', async () => {
    const isVisible = await HomePage.isSubmitButtonPresent();
    const buttonText = await HomePage.getSubmitButtonText();
    expect(isVisible).toBe(true);
    expect(buttonText?.toUpperCase()).toBe(LABELS.submitButton);
  });

  describe('Balance', () => {
    let initialBalance: any
    let formattedAmount: any

    it('should show MY BALANCES title', async () => {
      const isVisible = await HomePage.isBalanceTitlePresent();
      expect(isVisible).toBe(true);
    });

    it('should verify the initial balance value', async () => {
      initialBalance = await HomePage.getBalance();
      expect(initialBalance).toMatch(BALANCES.initial);
    });

    it('should update the amountInput with a random value and verify', async () => {
      randomAmount = generateRandomBalance();
      formattedAmount = randomAmount.toString();

      await HomePage.setAmountInput(formattedAmount);

      const balance = await HomePage.amountInput.getText();
      expect(balance).toBe(formattedAmount);
    });

    it('should verify that the new amount is different than the initial one', async () => {
      expect(initialBalance).not.toBe(formattedAmount);
    });
  });

  describe('Balance conversion flow', () => {
    let expectedEUR: number;
    let randomAmount: number;
  
    before(async () => {
      randomAmount = generateRandomBalance();

      const balances = await HomePage.balanceItems;
      const eurText = await balances[0].getText();
      const initialBalance = parseFloat(eurText);
      expectedEUR = initialBalance - randomAmount;
  
      console.log(`Initial EUR: ${initialBalance} | Sending: ${randomAmount} | Expected: ${expectedEUR}`);
    });
  
    it('should enter the amount and submit', async () => {
      await HomePage.setAmountInput(randomAmount.toString());
      await HomePage.submitButton.click();
      await Popup.message.waitForDisplayed({ timeout: 5000 });
    });
  
    it('should confirm the popup and verify updated balances', async () => {
      await Popup.okButton.waitForDisplayed({ timeout: 5000 });
      await Popup.confirm();
  
      const balances = await HomePage.balanceItems;
      console.log(`Balance ${balances}`)
      const eurText = await balances[0].getText();
      console.log(`EUR balance ${eurText}`)
      const usdText = await balances[1].getText();
      console.log(`USD balances ${usdText}`)
  
      const actualUSD = parseFloat(usdText);
      const expectedMaxUSD = randomAmount;
      const expectedMinUSD = expectedMaxUSD - 1;
  
      console.log(`💶 EUR after: ${eurText} | 💵 USD after: ${actualUSD}`);
  
      expect(eurText).toBe(`${expectedEUR} EUR`);
      expect(actualUSD).toBeGreaterThanOrEqual(expectedMinUSD);
      expect(actualUSD).toBeLessThanOrEqual(expectedMaxUSD);
    });
  });
});