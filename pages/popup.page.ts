import type { ChainablePromiseElement } from 'webdriverio';

class Popup {
  get message(): ChainablePromiseElement {
    return $('id:android:id/message');
  }

  get okButton() {
    return $('//android.widget.Button[@resource-id="android:id/button1" and @text="OK"]');
  }

  async isVisible(): Promise<boolean> {
    return await this.message.isDisplayed();
  }

  async getMessageText(): Promise<string> {
    return this.message.getText();
  }

  async getOkButtonText(): Promise<string> {
    return this.okButton.getText();
  }

  async confirm() {
    await this.okButton.waitForDisplayed({ timeout: 5000 });
    await this.okButton.click();
    await driver.pause(1000);
  }
}

export default new Popup();