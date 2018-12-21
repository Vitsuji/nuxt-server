#!/usr/bin/env node

const inquirer = require("inquirer")
const chalk = require("chalk")
const figlet = require("figlet")
const shell = require("shelljs")
const spcommands = require('./spice-commands')

const init = () => {
  console.log(
    chalk.red(
      figlet.textSync("Spicy!", {
        font: "Doom",
        horizontalLayout: "default",
        verticalLayout: "default"
      }),
			chalk.white('\nCLI that generates Models or Routes for your project!\n')
    )
  )
}

const askQuestions = () => {
  const questions = [
    {
      type: "list",
      name: "type",
      message: "What would you like to generate?",
      choices: ["0) Default Model","1) Default Routes", "2) Default Model and Routes", "3) Just CRUD Routes", "4) Complete set: Model and CRUD route"],
      filter: function(val) {
        return val.split(")")[0];
      }
    },
		{
      name: "name",
      type: "input",
      message: "What is the name of the file without extension? \n (Please do not use whitespaces or other special characters):"
		}
  ];
  return inquirer.prompt(questions);
};

const createFile = (filename, extension) => {
  const filePath = `${process.cwd()}/${filename}.${extension}`
  shell.touch(filePath);
  return filePath;
};

const success = filepath => {
  console.log(
    chalk.white.bgGreen.bold(`Done! File created at ${filepath}`)
  );
};

const run = async () => {
  // show script introduction
  init();

  // ask questions
  const answers = await askQuestions();
  const NAME =  answers.name;
  const TYPE =  answers.type;

	if (TYPE == '0') {
		spcommands.create_model(NAME)
	}
	if (TYPE == '1') {
		spcommands.create_route(NAME)
	}
	if (TYPE == '2') {
		spcommands.create_model_and_routes(NAME)
	}
	if (TYPE == '3') {
		spcommands.create_crud_no_model(NAME)
	}
	if (TYPE == '4') {
		spcommands.create_crud(NAME)
	}
  // create the file
  //const filePath = createFile(FILENAME, EXTENSION);

  // show success message
  //success(filePath);
};

run();
