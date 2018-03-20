# Mock the Back-End with Node.js

This is the companion project for the [Blog Article](http://blog.scottlogic.com/2018/03/20/mock-the-backend-with-node.html).

## Run the demo application

    npm start

## Run the end-to-end tests

First, prepare Selenium Webdriver:

    npm run e2e:clean
    npm run e2e:update

Then, run the Selenium server and UI in two separate console windows:

    npm run start:ui

    npm run e2e:start

Finally, in a third console window, run the tests:

    npm run e2e
