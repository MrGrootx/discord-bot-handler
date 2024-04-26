// module.exports = (client) => {
//     client.handleEvents = async (eventFiles, path) => {
//         for (const file of eventFiles) {
//             const event = require(`../events/${file}`);
//             if (event.once) {
//                 client.once(event.name, (...args) => event.execute(...args, client));
//             } else {
//                 client.on(event.name, (...args) => event.execute(...args, client));
//             }
//         }
//     };
// }


const fs = require("fs").promises;
const path = require("path");

module.exports = (client) => {
  client.handleEvents = async () => {
    const basePath = path.join(__dirname, "..", "events");
    const eventFiles = await getAllEventFiles(basePath);
    for (const file of eventFiles) {
      const event = require(file);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
      } else {
        client.on(event.name, (...args) => event.execute(...args, client));
      }
    }
  };
};

async function getAllEventFiles(dir) {
  const files = await fs.readdir(dir);
  const eventFiles = [];
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await fs.stat(filePath);
    if (stats.isDirectory()) {
      const subFiles = await getAllEventFiles(filePath);
      eventFiles.push(...subFiles);
    } else if (file.endsWith(".js")) {
      eventFiles.push(filePath);
    }
  }
  return eventFiles;
}