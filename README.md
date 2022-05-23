# Lute

[![Maintainability](https://api.codeclimate.com/v1/badges/41def6e3e1c69374302d/maintainability)](https://codeclimate.com/github/Phunmbi/Lute/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/41def6e3e1c69374302d/test_coverage)](https://codeclimate.com/github/Phunmbi/Lute/test_coverage)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)

## Description

Lute is an order management assistant here to help you manage your orders. Check Lute out
live [here](https://lute-client.onrender.com)

## Features

With Lute, you are able to

- Create an order
- Update an order
- View the details of an order
- View list of all orders.

## Development

The Lute codebase is a monorepo managed with Yarn workspaces. The 2 workspaces being `client` and `server`.

To run the codebase locally, you'll need

- A firebase project created and set up. Then provide the `serviceAccountKey.json` in the root of the project directory,
  This enables the server initialize the firebase project.
- An `.env` file in the root of the project directory. The variables to be filled in are shown in the `.env.example`
  file.
- run `yarn install` from the root of the folder directory for yarn to set up dependencies for both workspaces
- run `yarn dev` to start both servers and access
    - the client: `http://localhost:1234`
    - the graphql playground: `http://localhost:4000/graphql`

NB:

- Both workspaces share the same `schema.graphql` file. separate Codegen commands generates types for each workspace.
  Should the `schema.graphql` be updated, Codegen will need to be run for both workspaces
  From the root of the project
    - for server: `yarn run codegen-server`
    - for client: `yarn run codegen-client`

## API Documentation

Lute's Graphql API Documentation can be found [here](https://)

## Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Firebase](https://firebase.google.com/) Firestore and Firebase auth
- [Apollo GraphQL](https://www.apollographql.com/)
- [Codegen](https://www.graphql-code-generator.com/docs/getting-started/installation) For graphql types and hooks
  generation
- [Node](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [Bulma](https://bulma.io/) UI Kit
- [Cypress](https://www.cypress.io/)
- [Parcel](https://parceljs.org/)
- [Github Actions](https://github.com/features/actions) for CI/CD, integrated with code climate for test reporting
- [Code Climate](https://codeclimate.com/) for maintainability and code coverage reporting
- [Spectl](https://github.com/anvilco/spectaql) for documentation

## Testing

Testing is configured for both client and server however the code coverage displayed on the repo is from the client's
cypress based end-to-end tests, which is where most of the testing efforts were directed.

To run tests locally, from the root of the project, run `yarn run cypress:test-dev`.

## License & Copyright

MIT © 