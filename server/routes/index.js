const fs = require('fs');
const path = require('path');

module.exports = (app) => {
  // API route s
  fs.readdirSync(__dirname + '/api/').forEach((file) => {
    require(`./api/${file.substr(0, file.indexOf('.'))}`)(app);
  });
};
