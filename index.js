// import inquirer/fs
const inquirer = require('inquirer');
const fs = require('fs');

// import the function which generates the HTML Template
const htmlTemplate = require("./src/templateHelper");


// questions array
const questions = [
  {
    type: "input",
    name: "mName",
    message: "What is the manager's name?",
    validate: (enteredN) => {
      if (!enteredN) {
        console.log("Please enter a name");
        return false;
      } else {
        return true;
      }
    },
  },
  {
    type: "input",
    name: "mID",
    message: "What is the manager's ID?",
    validate: (enteredID) => {
      if (!enteredID) {
        console.log("Please enter an ID");
        return false;
      } else {
        return true;
      }
    },
  },
  {
    type: "input",
    name: "mEmail",
    message: "What is the manager's Email?",
    validate: (enteredE) => {
      if (!enteredE) {
        console.log("Please enter an Email");
        return false;
      } else {
        return true;
      }
    },
  },
  {
    type: "input",
    name: "managerON",
    message: "What is the manager's office number?",
    validate: (enteredON) => {
      if (!enteredON) {
        console.log("Please enter an office number");
        return false;
      } else {
        return true;
      }
    },
  },
];

const employeeQuestions = [
  {
    type: "list",
    name: "userAnswers",
    message: "What would you like to do next?",
    choices: [
      "I want to add an engineer",
      "I want to add an intern",
      "I am finished building my team",
    ],
    default: "I am finished building my team",
  },
  {
    type: "input",
    name: "eName",
    message: "What is the name of the engineer?",
    validate: (enteredN) => {
      if (!enteredN) {
        console.log("Please enter a name");
        return false;
      } else {
        return true;
      }
    },
    when: ({ userChoice }) => {
      if (userChoice === "I want to add an engineer") {
        return true;
      } else {
        false;
      }
    },
  },
  {
    type: "input",
    name: "eID",
    message: "What is the engineer's ID?",
    validate: (enteredID) => {
      if (!enteredID) {
        console.log("Please enter an ID");
        return false;
      } else {
        return true;
      }
    },
    when: ({ userChoice }) => {
      if (userChoice === "I want to add an engineer") {
        return true;
      } else {
        false;
      }
    },
  },
  {
    type: "input",
    name: "eEmail",
    message: "What is the engineer's Email?",
    validate: (enteredE) => {
      if (!enteredE) {
        console.log("Please enter an Email");
        return false;
      } else {
        return true;
      }
    },
    when: ({ userChoice }) => {
      if (userChoice === "I want to add an engineer") {
        return true;
      } else {
        false;
      }
    },
  },
  {
    type: "input",
    name: "eGithub",
    message: "What is the engineer's GitHub username?",
    validate: (enteredGithub) => {
      if (!enteredGithub) {
        console.log("Please enter a GitHub username");
        return false;
      } else {
        return true;
      }
    },
    when: ({ userSelection }) => {
      if (userSelection === "I want to add an engineer") {
        return true;
      } else {
        false;
      }
    },
  },
  {
    type: "input",
    name: "iName",
    message: "What is the name of the intern?",
    validate: (enteredN) => {
      if (!enteredN) {
        console.log("Please enter a name");
        return false;
      } else {
        return true;
      }
    },
    when: ({ userChoice }) => {
      if (userChoice === "I want to add an intern") {
        return true;
      } else {
        false;
      }
    },
  },
  {
    type: "input",
    name: "iID",
    message: "What is the intern's ID?",
    validate: (enteredID) => {
      if (!enteredID) {
        console.log("Please enter an ID");
        return false;
      } else {
        return true;
      }
    },
    when: ({ userChoice }) => {
      if (userChoice === "I want to add an intern") {
        return true;
      } else {
        false;
      }
    },
  },
  {
    type: "input",
    name: "iEmail",
    message: "What is the intern's Email?",
    validate: (enteredE) => {
      if (!enteredE) {
        console.log("Please enter an Email");
        return false;
      } else {
        return true;
      }
    },
    when: ({ userChoice }) => {
      if (userChoice === "I want to add an intern") {
        return true;
      } else {
        false;
      }
    },
  },
  {
    type: "input",
    name: "iSchool",
    message: "What is the intern's School?",
    validate: (enteredS) => {
      if (!enteredS) {
        console.log("Please enter a School");
        return false;
      } else {
        return true;
      }
    },
    when: ({ userChoice }) => {
      if (userChoice === "I want to add an intern") {
        return true;
      } else {
        false;
      }
    },
  },
];

// Question array end

//inquirer functions

function beginPrompts() {
    return inquirer.prompt(questions);
}

function promptMoreTeamMembers(team){

  if(!team.restOfTeam) {
    team.restOfTeam = [];
  }
  console.log(

    `Add a new team member`
  
  )
  // pass the inquirer for emplyee questions
  return inquirer
  .prompt(employeeQuestions)
  .then( (newTeamMember) => {
    if(newTeamMember.userSelection === 'I am finished adding team members') {
      console.log(team.restOfTeam)
      return htmlTemplate(team);
    }
    team.restOfTeam.push(newTeamMember);
    return promptMoreTeamMembers(team);
  })
  ;
}

beginPrompts()
.then(promptMoreTeamMembers)
.then((generatedHtml) => {
    // use writeFile from fs
    fs.writeFile("./dist/index.html", generatedHtml, err => {
        if(err) throw err;
        console.log('The file has been successfully written.');
    })
})