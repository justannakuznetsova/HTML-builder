const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  files.forEach(file => {
    fs.stat(path.join(__dirname, 'secret-folder', file), (err, stats) =>{
      if(stats.isFile()) {
        console.log(`${path.parse(file).name} - ${path.extname(file).slice(1)} - ${stats.size} bytes`);
      }   if (err) {
        console.log(err);
      }
    });
  });
});
