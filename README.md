# PagoPA CLI

This repo was created as a proposal for a job interview.

The implemented solution is a simple CLI developed through **NodeJS**.

## Requirement

The goal is the development of an API client that can be used to send a “message” to a citizen using the [**“IO” REST API**](https://developer.io.italia.it/openapi.html).

The documentation is available here: [https://developer.io.italia.it/openapi.html](https://developer.io.italia.it/openapi.html)

## Prerequisites

The main prerequisites to use, run and test the **PagoPA CLI** are:

-  **NodeJS >= 10.18.1** installed. For more details, visit the [official NodeJS web site](https://nodejs.org/it/)
	> The application has been developed using the version **15.5.0** of **NodeJS**.

-  **NPM >= 6.13.4** installed. For more details visit the [official NPM web site](https://www.npmjs.com/)

-  `Authorization key` for using the **"IO" REST API**. To get access to the **“IO” REST API**, you can visit the [IO Developer Portal](https://developer.io.italia.it/)

## Install

To use **PagoPA CLI** is necessary clone the repo or download the project.

Once you get the source code, you need to navigate in the folder and execute the following command:

```bash
npm install
```

From the `package.json` file, the `node_modules` folder will be created. The `node_modules` folder contains the necessary dependencies for running the application.

## Environment KEYs

**PagoPA CLI** is an API client which communicates with **“IO” REST API**.

For using the **“IO” REST API** is necessary an `Authorization key` which is used to authorized any client to use the APIs available.

To get access to the **“IO” REST API**, you need to register on the [IO Developer Portal](https://developer.io.italia.it/)

When you have a valid `Authorization key` to use the **“IO” REST API**, you need to create a `.env` file on the main folder with the following content:

```
API_KEY = ********************************
API_URL = "https://api.io.italia.it/api/v1/"
```

Replace the value of `API_KEY` variable with your own `Authorization key`.

**PagoPA CLI** will not start if the .env file not exists or it is not configured correctly.

## Run

After installing the dependencies required and setting the environment, you can run the application by launching the following command from a terminal:

```bash
npm start
```

The **PagoPA CLI** will be executed and a prompt message will be displayed on the terminal.

## Test

The [Jest framework](https://jestjs.io/) has been used for testing **PagoPA CLI**.

To launch the implemented tests, just execute the following command:

```bash
npm test
```

Every test will be executed and a `coverage` folder will be created. If each test will have a successful result, a similar output will be displayed.

Otherwise, an error output will be shown.

## Docs

The documentation is written through [jsdoc](https://www.npmjs.com/package/jsdoc).

To generate the documentation you need to execute the following command:

```bash
npm run generate-docs
```

## How use the PagoPA CLI

The main inputs required to send a message to a citizen are:

-  **Fiscal code** of the addresses
-  **Subject** of the message
-  **Content** of the message

After running the application, **PagoPA CLI** will ask you to insert a valid fiscal code of the addresses who want to deliver a message and the information related to the message (subject, content).

Each input must be valid before to send a message. Every time you insert an invalid input (fiscal code, subject or message content), the console will show you a warning message. As long as an input is not valid, you can not move on. Until you don't insert a valid value for every input, a warning message will be shown and you are not able to send any message.

If the message is sent correctly, you will receive a positive feedback from the console.

## File structure

Besides the configuration files, the project is structured as following:

-  **`index.js`** file
	> Main file which handles the main loop to run the CLI
-  **`lib`** folder
	> Folder which contains the source code used to handle each part of the CLI
	-  **`ui.js`**
		> File that handles the user interface
	-  **`controller.js`**
		> File that handles the logic
	-  **`api.js`**
		> File that handles the API calls
	-  **`utils.js`**
		> File that contains utility and support functions
-  **`test`** folder
	> Folder that contains the code to test the CLI
	-  **`api.test.js`**
		> File that contains functions to test the `api.js`
	-  **`controller.test.js`**
		> File that contains functions to test the `controller.js`

## Architecture

Despite the project is a basic **CLI** implemented through **NodeJS**, the application has been designed by using a **layered architecture**.

The architecture is composed by 3 layers:
-  **View**
	> This layer handles the **user interface** aspects of the application. The related implementation is in the `ui.js` file.
	
-  **Controller**
	> This layer handles the **logic** aspects of the application. The related implementation is in the `controller.js` file.
	
-  **API**
	> This layer handles the **API client** requests for communicate with the **"IO" REST API**. The related implementation is in the `api.js` file.

The `index.js` is the main file and the core of the application. In the `index.js` file there is the `run` function which handles the execution of the program.

## Main dependencies

The main developer dependencies are the following:

-  [axios](https://www.npmjs.com/package/axios)

-  [chalk](https://www.npmjs.com/package/chalk)

-  [inquirer](https://www.npmjs.com/package/inquirer)

-  [ora](https://www.npmjs.com/package/ora)

-  [nodemod](https://www.npmjs.com/package/nodemod)

-  [jsdoc](https://www.npmjs.com/package/jsdoc)

-  [jest](https://jestjs.io/)

