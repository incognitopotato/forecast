# Forecast
=======================

In this document you will find the project's start-up guide along with a short and simple explaination of technologies used.

## JavaScript

The application uses React, Redux, Babel, and ES6.

## Styles

The styles are written in SCSS.

## Bundling

This project uses Webpack for bundling during production and as a server for development.  Find the webpack configs in the webpack folder.  I've included the dist directory in the repo so you can just run the server.

## Testing

Testing is handled using Jasmine, Karma, Sinon, and Enzyme.  I've provided example tests for a component, for actions, for reducers, and for the ajax utility.  The app got rather ambitious and I realized that I wouldn't be able to provide full coverage in a reasonable amount of time.  Tests are located in the test folder.

## Linting

Linting is handled by ESLint and Stylelint.

## DO THIS FIRST
```
npm install
```

## To Run in Dev Mode
```
npm run start
```
## To Build SCSS and JS
```
npm run build
```
## To Run Prod Server
```
npm run server
```
## To Build and Run On Prod Server
```
npm run prod
```
## To Run Tests
```
npm run test
```
## To Run Linter
```
# for JS
npm run eslint

# for styles
npm run stylelint
```