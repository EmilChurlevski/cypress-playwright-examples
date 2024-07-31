# Cypress and Playwright Examples

A project demonstrating the usage of both Cypress and Playwright for end-to-end testing.
This repository provides various examples and best practices for setting up and running tests using these powerful testing frameworks.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)

## Features

- Examples of Cypress and Playwright tests.
- Setup instructions for both frameworks.
- Configuration files for easy integration.
- Sample tests to help you get started quickly.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above)
- [npm](https://www.npmjs.com/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/EmilChurlevski/cypress-playwright-examples.git
   cd cypress-playwright-examples/project
   ```
2. Install dependencies:
   ```bash
     npm install
     // to install the playwright browsers
     npx playwright install
   ```

## Usage

### Running Cypress Tests

To run the Cypress tests, use the following command:
   ```bash
       npx cypress open
   ```
This will open the Cypress Test Runner where you can select and run the tests.

### Running Playwright Tests

To execute the Playwright tests, use:
   ```bash
       npx playwright test --ui
   ```
This will open the Playwright Test Runner where you can select and run the tests.

## Project Structure
   ```bash
      cypress-playwright-examples/
      ├── project/
      ├──── cy-helpers/               # Classes meant to use in Cypress tests
      ├──── cypress/                  # Cypress main folder
      │   ├──── e2e/                  # Directory for end-to-end tests
      │   │     ├── cy-tests/         # Cypress-specific tests
      │   │     └── pw-tests/         # Playwright-specific tests
      │   ├──── fixtures/             # Fixtures for Cypress and Playwright
      │   └──── support/              # Main support folder for Cypress
      ├──── helpers/                  # TypeScript functions, selectors, and models
      ├──── pw-helpers/               # Playwright classes for Playwright tests
      ├──── .gitignore
      ├──── cypress.config.ts         # Cypress config file
      ├──── package.json 
      ├──── package-lock.json
      ├──── playwright.config.ts      # Playwright config file   
      ├──── tsconfig.json
      ├── .gitignore
      ├── package.json
      ├── README.md
      └── cypress-playwright-examples.iml

   ```

## Contributing

Contributions are welcome! If you have suggestions or improvements, please feel free to create an issue or submit a pull request.

### Steps to Contribute
1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Open a pull request.

## License

This project is licensed under the ISC License. 

## Authors

Emil Churlevski - Initial work - EmilChurlevski

## Acknowledgments

Thanks to the Cypress and Playwright communities for their excellent documentation and support.
And special thanks to the creator of the demoqa webpage.
