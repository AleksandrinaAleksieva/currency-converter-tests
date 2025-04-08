import path from 'path';
import { APP_PACKAGE_ID, APP_PATH } from '../helpers/constants';

export async function installApp() {
    const appPath = path.resolve(APP_PATH);
    const isInstalled = await driver.isAppInstalled(APP_PACKAGE_ID);
  
    if (!isInstalled) {
      console.log('📦 Installing the app...');
      await driver.installApp(appPath);
    } else {
      console.log('✅ App is already installed.');
    }
  }