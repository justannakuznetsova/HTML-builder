//  Asynchronous programming allows you to perform multiple requests simultaneously and complete more tasks faster.

const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises; // to create a dir

async function copyDir(filesFolder, filesCopyFolder) {

  // set paths  
  const filesFolderPath = path.join(__dirname, filesFolder);
  const filesCopyFolderPath = path.join(__dirname, filesCopyFolder);
  
  // create a dir + do not create a dir if I have it
  await fsPromises.mkdir(filesCopyFolderPath, { recursive : true });

  let myFiles = await fs.promises.readdir(filesCopyFolderPath);
  
  // delete a dir if it's created to create another one
  for (let file of myFiles) {
    await fsPromises.rm(path.join(filesCopyFolderPath, file));
  } 

  myFiles = await fsPromises.readdir(filesFolderPath);

  for (let file of myFiles) {
    await fsPromises.copyFile(path.join(filesFolderPath, file), path.join(filesCopyFolderPath, file));
  }
}

copyDir('files', 'files-copy');
