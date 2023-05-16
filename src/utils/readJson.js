import fs from 'fs';

filename = "/17-4-2023_keyData.json";


//Fetch API 

function concatenateKeyValues(filename) {
  if (fs.existsSync(filename)) {
    const fileContent = fs.readFileSync(filename, 'utf-8');
    const keyData = JSON.parse(fileContent);

    let concatenatedKeys = '';
    keyData.forEach((entry) => {
      concatenatedKeys += entry.key;
    });

    return concatenatedKeys;
  } else {
    console.error(`File ${filename} does not exist.`);
    return null;
  }
}

export default concatenateKeyValues;