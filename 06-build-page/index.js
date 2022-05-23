//1. import modules 
const fs = require('fs');
const path = require('path');
let filesArray = '';
const pathBundle = path.join(__dirname, 'project-dist', 'style.css');
const fsPromises = fs.promises; // to create a dir

//2. creating dir 'project-dist'
async function makeDir() {
  fs.mkdir(path.join(__dirname, 'project-dist'), err => {
    fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), () => {
      fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'img'), () => {
      });
      fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'fonts'), () => {
      });
      fs.mkdir(path.join(__dirname, 'project-dist', 'assets', 'svg'), () =>{
      });
    });
  });
}

// 3+4. change template.html tags and save in project-dist/index.html.

async function tagsTemplateToHtml() {
  let templateHtml = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf-8');
  const componentsHtml = await fs.promises.readdir(path.join(__dirname, 'components'));
  for (const tag of componentsHtml) {
    const components = await fs.promises.readFile(path.join(path.join(__dirname, 'components'), `${tag}`), 'utf-8');
    templateHtml = templateHtml.replace(`{{${tag.slice(0, tag.indexOf('.'))}}}`, components); 
  }
  fs.writeFile(path.join(path.join(__dirname, 'project-dist'),'template.html'), templateHtml, () => {
  });
}

// 5. 05-merge-styles 
async function mergeCss() {
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
}

const startImg = path.join('assets', 'img');
const resultImg = path.join('project-dist', 'assets', 'img');
const startFonts = path.join('assets', 'fonts');
const resultFonts = path.join('project-dist', 'assets', 'fonts');
const startSvg = path.join('assets', 'svg');
const resultSvg = path.join('project-dist', 'assets', 'svg');


// 7. 04-copy-directory

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

async function buildHtml() {
  await makeDir();
  await tagsTemplateToHtml();
  await mergeCss();
  await copyDir(startImg, resultImg);
  await copyDir(startFonts, resultFonts);
  await copyDir(startSvg, resultSvg);
}

buildHtml();
