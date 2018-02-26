import { Builder, until, By } from 'selenium-webdriver';
import server from '../server/server';

export const driver = new Builder()
    .forBrowser('chrome')
    .usingServer('http://localhost:4444/wd/hub')
    .build();

export const loadPage = async (path = '', waitFor = By.css('.App')) => {
  await driver.get(`http://localhost:3000/${path}`);
  await driver.wait(until.elementLocated(waitFor));
};

export const getElementText = async selector => {
  const element = await driver.findElement(selector);
  return await element.getText();
};

export const setInputValue = async (selector, value) => {
  const element = await driver.findElement(selector);
  await element.click();
  await element.clear();
  await element.sendKeys(value);
};

export const clickElement = async (selector) => {
  const element = await driver.findElement(selector);
  await element.click();
};

afterAll(async () => {
  server.close();
  await driver.quit();
});
