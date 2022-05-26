const fs = require('fs');
const path = require('path');
const pathToFile = path.join(__dirname, 'text.txt');
const writtenStream = fs.createWriteStream(pathToFile);
const { stdin, stdout, exit } = process;

stdout.write('The text you\'re gonna write here will appear in the text.txt file. If you wanna exit the program type Ctrl+C or exit\n');
stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    exit();
  } 
  writtenStream.write(data.toString());
});

process.on('exit', () => stdout.write('See ya!'));
process.on('SIGINT', () => {
  exit();
  stdout.write('See ya!');
});
