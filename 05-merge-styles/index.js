const fs = require('fs');
const path = require('path');
let filesArray = '';
const pathBundle = path.join(__dirname, 'project-dist', 'bundle.css');

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  const cssFiles = files.filter(value => value.slice(value.indexOf('.')) === '.css');
  cssFiles.forEach(file => {
    fs.readFile(path.join(path.join(__dirname, 'styles'), file), 'utf8', (err, data) => {
      filesArray+=data;
      fs.writeFile(path.join(pathBundle), filesArray, (err) => {
        if (err) {
          console.log(err);
        }      
      });
    });
  });
});

