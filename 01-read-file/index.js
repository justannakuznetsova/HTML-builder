const path = require('path');
const fs = require('fs');

const pathToFile = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(pathToFile);

readableStream.on('data', (data) => {
  console.log(data.toString());
});
