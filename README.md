# ANNEA UI 📃
The following project allows to interact with indicator from back-office and manage all the operation in relation to it.
This platform is the frontend project and it's build via the library react js, please take a look at the section stack below 👇 to know how to run it.

## Project stack information
The project is built with CRA (create react app) which is just an boilerplate for react project.
The porject main language is Typescript (Javascript + Types) for all the patterns and logic, React component for the views and UI interaction with JSX syntax and graphql for interacting with backend data.
To feel more familiar with these technology and stack please find below all relevant :
- ReactJs (The library of view components) -> [RECT DOCS](https://react.dev/) 👩‍💻🧑‍💻
- CRA (CLI and package to generate fresh boilerplate of react project) -> [RECT DOCS](https://create-react-app.dev/docs/getting-started/) 💫
- Typescript (Javascript with types) -> [Typescript DOCS](https://www.typescriptlang.org/) 🧠
- GraphQL (Javascript with types) -> [GraphQL DOCS](https://graphql.org/) 🧠

## Setup ⏳
Please make sure you have the minimum requirements to be able to run the project. This means you already installed Node latest stable version.
Optional: You could also install Docker in case you would like to create portable image and test it in different machine.
- You can install node from here: [Download](https://nodejs.org/en) 🏗️
- You can install docker from here: [Download](https://nodejs.org/en) **(keep in mind this step is optional and no need for it for app development)**

## How to run the project ⏲
This a simple NPM project, this mean you just need to install the package used first, then project will be able to be started:
1. Open a new terminal.
2. Cd (ie: locate) to the path of the project root.
3. Run the following command ``npm i``. The previous command will take a bit of time to install all the packages.
4. After that , run the command ``npm start``.
If everything is fine, then a new tab will open automatically in your default browser otherwise please go to this page `http://localhost:3000`.

## Test the project 🧨
The project conatain different test case of functionality and components:\
1. run the command ``npm test``
This is a test in watch mode, mean you need to interact with it in order to go to the next step. (Take a look below, please):
```
Press `a` to run all tests, or run Jest with `--watchAll`.

Watch Usage
 › Press a to run all tests.
 › Press f to run only failed tests.
 › Press q to quit watch mode.
 › Press p to filter by a filename regex pattern.
 › Press t to filter by a test name regex pattern.
 › Press Enter to trigger a test run.
```
- Click **a** to run all the test for example.

## Developer important note 🎯
- Please keep in your mind that this project use huskies which is a pre-check before you commit and push.\
    - This is a safety to keep always the project build successful and the code style unique cross all the developers. So always keep in your mind to run the formatter before pushing.
- If you need to use a new Query or Mutation for your backend system, please do **NOT** add new api by hand, you should rather generate the schema via the command line ``npm run generateSchema``.     