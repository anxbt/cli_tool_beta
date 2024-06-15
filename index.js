
import inquirer from "inquirer";
import fs from "fs"
import { ChildProcess } from "child_process";

const dependencies = {
  nodemon: true,
  mongoose: false,
  mongodb: false,
};

async function promptUser() {
  const answers = await inquirer.prompt([
    {
    type: "input",
    name: "name",
    message: "Enter your project name:",
    default: "myapp",
    },
    { type: 'confirm',
      name: 'installNodemon',
      message: 'Install Nodemon?',
      default: true,
    },
  
    
  ]);

  dependencies.name=answers.name

  dependencies.nodemon = answers.installNodemon;
  
  return dependencies;
 }

async function createPackageJson() {
  const content = JSON.stringify({
    name: "my 65", 
    version: '1.0.0',
    description: 'Your package description',
    scripts: {
      start: 'node server.js', 
    },
    "dependencies":{
      "chalk": "^5.3.0",
      "inquirer": "^9.2.23"
    
    },
  });

  try {
    await fs.promises.writeFile('packag.json', content);
  } catch (err) {
    console.error('Error creating package.json:', err);
  }
}



async function createServerFile() {
  
  const serverContent = `
const express = require('express');

const app = express();

// Your custom app logic here (routes, middleware, etc.)

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
`

  try {
    await fs.promises.writeFile('server.js', serverContent);
    console.log('Server file created successfully!');
  } catch (err) {
    console.error('Error creating server file:', err);
  }
}

async function main() {

  promptUser();
 createServerFile();
  createPackageJson();

  console.log(
    chalk.bgWhite(
      chalk.black(` 🎉 Project '${projectName}' created successfully! 🎉 `)
    )
  );
  
}

main();
