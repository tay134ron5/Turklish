const fs = require('fs/promises');
const path = require('path');
const { historyFile } = require('../config');

const readHistory = async () => {
  try {
    return JSON.parse(await fs.readFile(historyFile, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return []; // no history yet
    throw err; // corrupt file: fail loudly rather than overwrite it
  }
};

// Writes run one at a time so concurrent requests can't overwrite each other.
let writeQueue = Promise.resolve();

const addEntry = (entry) => {
  const task = writeQueue.then(async () => {
    const history = await readHistory();
    history.push(entry);
    await fs.mkdir(path.dirname(historyFile), { recursive: true });
    // Write to a temp file, then rename, so a crash mid-write can't corrupt history.json
    const tmp = `${historyFile}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(history, null, 2));
    await fs.rename(tmp, historyFile);
  });
  writeQueue = task.catch(() => {}); // keep the queue alive after a failure
  return task;
};

module.exports = { readHistory, addEntry };
