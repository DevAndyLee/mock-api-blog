import { until, By } from 'selenium-webdriver';
import { driver, loadPage, getElementText, setInputValue, clickElement } from './driver';
import * as sinon from 'sinon';

import { Api } from '../server/api';
import { send, error } from '../server/helpers';

describe('maths', () => {
  // Spy on the POST request
  let postStub = sinon.spy((req, res) => send(req, res, { value: 13 }));

  beforeEach(async () => {
    new Api()
      .get('/domaths', (req, res) => send(req, res, { value: 10 }))
      .post('/domaths', postStub)
      .start();

    await loadPage('', By.css('.App-maths'));
  });

  it('should render app title', async () => {
    expect(await getElementText(By.css('.App-title'))).toBe('Mock API Example');
  });

  it('should do maths', async () => {
    // Initial value should be displayed
    expect(await getElementText(By.css('.App-value'))).toBe('10');

    // Input a number and submit
    await setInputValue(By.css('.App-input'), '3');
    clickElement(By.css('.App-submit'));
    await driver.wait(until.elementLocated(By.css('.App-maths.calculated')));

    // Result should be displayed
    expect(await getElementText(By.css('.App-value'))).toBe('13');

    // Verify the correct information was in the POST request
    expect(postStub.called).toBe(true);
    const postBody = postStub.firstCall.args[0].body;
    expect(postBody.operator).toBe('+');
    expect(postBody.input).toBe('3');
  });
});

describe('error handling', () => {
  beforeEach(async () => {
    new Api()
      .post('/domaths', (req, res) => error(req, res, 500, 'My Test Error'))
      .start();

    await loadPage('', By.css('.App-maths'));
  });

  it('should display an error message', async () => {
    // Input a number and submit
    await setInputValue(By.css('.App-input'), '3');
    clickElement(By.css('.App-submit'));
    await driver.wait(until.elementLocated(By.css('.App-error')));

    // Error should be displayed
    expect(await getElementText(By.css('.App-error'))).toBe('My Test Error');
  });
});
