import type { ChainablePromiseElement } from 'webdriverio';

class HomePage {
  // Elements
  get pageTitle(): ChainablePromiseElement {
    return $('android=new UiSelector().text("Currency conerter")');
  }

  get balanceTitle(): ChainablePromiseElement {
    return $('android=new UiSelector().text("MY BALANCES")');
  }

  get balanceValue(): ChainablePromiseElement {
    return $('id:com.serheniuk.currencyconversion:id/balance');
  }

  get currencyExchangeTitle(): ChainablePromiseElement {
    return $('android=new UiSelector().text("CURRENCY EXCHANGE")');
  }

  get withdrawalImage(): ChainablePromiseElement {
    return $('id:com.serheniuk.currencyconversion:id/withdrawalImage');
  }

  get depositImage(): ChainablePromiseElement {
    return $('id:com.serheniuk.currencyconversion:id/depositImage');
  }

  get sellLabel(): ChainablePromiseElement {
    return $('id:com.serheniuk.currencyconversion:id/sellLabel');
  }

  get receiveLabel(): ChainablePromiseElement {
    return $('id:com.serheniuk.currencyconversion:id/receiveLabel');
  }

  get fromCurrencyDropdown(): ChainablePromiseElement {
    return $('id:com.serheniuk.currencyconversion:id/fromCurrency');
  }

  get toCurrencyDropdown(): ChainablePromiseElement {
    return $('id:com.serheniuk.currencyconversion:id/toCurrency');
  }

  get submitButton(): ChainablePromiseElement {
    return $('id:com.serheniuk.currencyconversion:id/submitButton');
  }

  get amountInput(): ChainablePromiseElement {
    return $('id:com.serheniuk.currencyconversion:id/amountInput');
  }

  get balanceItems() {
    return $$('id:com.serheniuk.currencyconversion:id/balance');
  }

  // Utility display checks
  async isDisplayed(element: ChainablePromiseElement) {
    return element.isDisplayed();
  }

  async getTextIfDisplayed(element: ChainablePromiseElement): Promise<string | undefined> {
    return (await element.isDisplayed()) ? element.getText() : undefined;
  }

  // Functions
  async isPageTitlePresent() {
    return this.isDisplayed(this.pageTitle);
  }

  async isBalanceTitlePresent() {
    return this.isDisplayed(this.balanceTitle);
  }

  async getBalance() {
    return this.getTextIfDisplayed(this.balanceValue);
  }

  async isCurrencyExchangeTitlePresent() {
    return this.isDisplayed(this.currencyExchangeTitle);
  }

  async isSellImagePresent() {
    return this.isDisplayed(this.withdrawalImage);
  }

  async isDepositImagePresent() {
    return this.isDisplayed(this.depositImage);
  }

  async isSellLabelPresent() {
    return this.isDisplayed(this.sellLabel);
  }

  async isReceiveLabelPresent() {
    return this.isDisplayed(this.receiveLabel);
  }

  async getSellLabelText() {
    return this.getTextIfDisplayed(this.sellLabel);
  }

  async getReceiveLabelText() {
    return this.getTextIfDisplayed(this.receiveLabel);
  }

  async isFromCurrencyPresent() {
    return this.isDisplayed(this.fromCurrencyDropdown);
  }

  async isToCurrencyPresent() {
    return this.isDisplayed(this.toCurrencyDropdown);
  }

  async getFromCurrencyText() {
    return this.getTextIfDisplayed(this.fromCurrencyDropdown);
  }

  async getToCurrencyText() {
    return this.getTextIfDisplayed(this.toCurrencyDropdown);
  }

  async isSubmitButtonPresent() {
    return this.isDisplayed(this.submitButton);
  }

  async getSubmitButtonText() {
    return this.getTextIfDisplayed(this.submitButton);
  }

  async setAmountInput(value: string) {
    await this.amountInput.clearValue();
    await this.amountInput.setValue(value);
    await driver.pause(500);
  }
}

export default new HomePage();
