# Lifescan Website Validation Tool

## Pupose

 This repo contains code developed to make general validation in a Lifescan website.
 It uses NodeJS + Cumcumber + Selenium to create a browser automation tool.

## Requirements

Verify that Node.js is installed properly:

```
node -v
npm -v
```

Check that you have Chrome installed with an updated version (96.0 -> used here).

## Preparing the env-config.json

Create an `env-config.json` file in the root directory using the `env-config.json.example` file as a reference.

## Installation

```
sudo npm install
```

## Running the tests

```
# Run via NPM
npm test

# Run standalone
npx cucumber-js
```
