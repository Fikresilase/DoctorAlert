const fs = require('fs');
const path = require('path');

// Path to the users.json file
const usersFilePath = path.join(__dirname, '../users.json');

// Read users from JSON file
const readUsersFromFile = () => {
  if (!fs.existsSync(usersFilePath)) {
    return [];
  }
  const data = fs.readFileSync(usersFilePath);
  return JSON.parse(data);
};

// Write users to JSON file
const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

module.exports = { readUsersFromFile, writeUsersToFile };
