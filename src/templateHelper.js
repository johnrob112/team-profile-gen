// import classes
const Manager = require("../lib/Manager");
const Engineer = require("../lib/Engineer");
const Intern = require("../lib/Intern");



// in this file you're going to have a (some?) functions
function generateManagerHtmlCard(manager) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" crossorigin="anonymous">
        <script src="https://kit.fontawesome.com/9f86b37536.js" crossorigin="anonymous"></script>
        <title>Team Profile Generator</title>
    </head>
    <body>
        <header>
        
            <div class="card text-center text-bg-danger mb-3">
                <div class="card-header">
                <h1>My Team</h1>
            </div>
            </div>
        </header>
    <div class="card text-bg-primary mb-3" style="width: 18rem">
        <div class="card-header">
        <i class="fas fa-mug-hot" aria-hidden="true">Manager ${manager.getName()}</i>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID ${manager.getID()}</li>
            <li class="list-group-item">Email ${manager.getEmail()}</li>
            <li class="list-group-item">Office Number ${manager.getOfficeNumber()} </li>
        </ul></div>
    `;
}

function generateRestOfTeamCards({ restOfTeam }) {
  let masterString = "";

  restOfTeam.forEach((employee) => {
    if (employee.userChoice === "I want to add an engineer") {
      const myEngineer = new Engineer(
        employee.eName,
        employee.eID,
        employee.eEmail,
        employee.eGithub
      );
      let engineerString = `
        <div class="card text-bg-primary mb-3" style="width: 18rem">
            <div class="card-header">
            <i class="fa-solid fa-laptop-code" aria-hidden="true">Engineer ${myEngineer.engineerName}</i>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID ${myEngineer.eID}</li>
            <li class="list-group-item">Email ${myEngineer.eEmail} </li>
            <li class="list-group-item">GitHub ${myEngineer.eGithub}</li>
        </ul>
        </div>
            `;
        masterString += engineerString // masterString = masterString + engineerString
    } else   {(employee.userChoice === "I want to add an Intern")
       const myIntern = new Intern (
        employee.iName,
        employee.iID,
        employee.iEmail,
        employee.iSchool
       )

        let internString = `
        <div class="card text-bg-primary mb-3" style="width: 18rem">
        <div class="card-header">
        <i class="fas fa-user-graduate" aria-hidden="true">Intern ${employee.internName} </i>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID ${employee.iID}</li>
            <li class="list-group-item">Email ${employee.iEmail}</li>
            <li class="list-group-item">School ${employee.iSchool}</li>
        </ul>
        </div>
    </body>
    </html>
        `
       
    masterString+= internString
    }
  });

  // return your masterString
  return `
        
    `;
}

// export the function

module.exports = (userAnswersObj) => {
  // here you might want to destructure your manager's info from the answersObj
  const {
    managerName,
    managerId,
    managerEmail,
    managerOfficeNumber,
    ...employeesObject
  } = userAnswersObj;
  const myManager = new Manager(
    managerName,
    managerId,
    managerEmail,
    managerOfficeNumber
  );
  return `
    ${generateManagerHtmlCard(myManager)}
    ${generateRestOfTeamCards(employeesObject)}
  `;

};
