let fs = require('fs');

// Read file asynchronously with callback
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});

 fs = require('fs').promises;

async function appendToFile() {
  try {
    // Append a timestamped log entry
    const logEntry = "New content added"
    await fs.appendFile('data.txt', logEntry, 'utf8');

    console.log('Log entry added');
  } catch (err) {
    console.error('Error appending to file:', err);
  }
}

appendToFile();