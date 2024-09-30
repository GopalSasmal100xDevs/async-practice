const fs = require("fs");
const path = require("path");

const indexFilePath = path.join(__dirname, "./index.json");
const outputPath = path.join(__dirname, "./output.json");

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("File write successfull");
      }
    });
  });
}

function fetchTopicParts(parts) {
  const p = parts.map(async ({ name, file_location }) => {
    const partPathName = path.join(__dirname, file_location);
    const content = await readFile(partPathName);
    return { name, content };
  });
  return Promise.all(p);
}

async function solve() {
  try {
    const data = await readFile(indexFilePath);
    const jsonData = JSON.parse(data);
    const { topics } = jsonData;

    const contentPromise = topics.map(async ({ id, directory_path }) => {
      const dirPathName = path.join(__dirname, `${directory_path}/index.json`);
      const indexFileData = await readFile(dirPathName);
      const { parts } = JSON.parse(indexFileData);

      const partsContents = await fetchTopicParts(parts);

      return { id, directory_path, content: partsContents };
    });

    const result = await Promise.all(contentPromise);

    await writeFile(outputPath, JSON.stringify(result));
  } catch (error) {
    console.log(error);
  }
}

function main() {
  solve();
}

main();
