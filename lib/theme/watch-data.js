const chokidar = require('chokidar');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(process.cwd(), 'public', 'data');
const themeJsonPath = path.join(dataDir, 'theme.json');
const builtDataPath = path.join(process.cwd(), '.built', 'data.json');

console.log('=== Watch Data Script Starting ===');
console.log('Data directory:', dataDir);
console.log('Built data path:', builtDataPath);

// Verify the data directory exists
if (!fs.existsSync(dataDir)) {
  console.error('Error: Data directory does not exist:', dataDir);
  process.exit(1);
}

let previousPlugins = [];
let updateTimeout = null;
let isUpdating = false;

function getPluginsArray() {
  try {
    const themeJson = require(themeJsonPath);
    return themeJson.plugins || [];
  } catch (error) {
    console.error('Error reading theme.json:', error);
    return [];
  }
}

function runUpdateCommand(includePlugins = false, retryCount = 0) {
  // If already updating, queue the next update
  if (isUpdating) {
    console.log('Update already in progress, will retry after current update completes');
    setTimeout(() => runUpdateCommand(includePlugins, retryCount), 2000);
    return;
  }

  // Clear any pending update
  if (updateTimeout) {
    clearTimeout(updateTimeout);
  }

  // Debounce the update command
  updateTimeout = setTimeout(() => {
    isUpdating = true;
    const command = includePlugins ? 'npx create-built-app update --plugins' : 'npx create-built-app update';
    console.log(`Running update command: ${command}`);
    
    try {
      const updateProcess = spawn('npx', ['create-built-app', 'update', includePlugins ? '--plugins' : ''], {
        stdio: 'inherit'
      });

      updateProcess.on('exit', (code) => {
        if (code !== 0) {
          console.error(`Error running update command: ${code}`);
          isUpdating = false;
          
          // Retry up to 3 times with increasing delays
          if (retryCount < 3) {
            const delay = (retryCount + 1) * 2000; // 2s, 4s, 6s
            console.log(`Retrying update in ${delay/1000} seconds... (attempt ${retryCount + 1}/3)`);
            setTimeout(() => runUpdateCommand(includePlugins, retryCount + 1), delay);
          } else {
            console.error('Max retries reached. Please try again or check for errors.');
          }
          return;
        }
        
        // Wait a moment for the update to complete
        setTimeout(() => {
          isUpdating = false;
        }, 3000);
      });
    } catch (error) {
      console.error('Error running update command:', error);
      isUpdating = false;
    }
  }, 2000);
}

// Watch theme.json for changes
const themeWatcher = chokidar.watch(themeJsonPath, { 
  ignoreInitial: true,
  persistent: true,
  awaitWriteFinish: {
    stabilityThreshold: 3000,
    pollInterval: 100
  }
});

themeWatcher.on('change', () => {
  lastChangedFile = 'public/data/theme.json';
  const newPlugins = getPluginsArray();

  if (JSON.stringify(previousPlugins) !== JSON.stringify(newPlugins)) {
    console.log('Plugins have changed, running update with --plugins flag');
    runUpdateCommand(true);
    previousPlugins = newPlugins;
  } else {
    runUpdateCommand(false);
  }
});

// Watch all files in the public/data directory except theme.json
const dataWatcher = chokidar.watch(dataDir, { 
  ignoreInitial: true,
  persistent: true,
  ignored: [themeJsonPath, '**/node_modules/**'],
  awaitWriteFinish: {
    stabilityThreshold: 3000,
    pollInterval: 100
  }
});

dataWatcher
  .on('change', filePath => {
    console.log(`Detected change in ${filePath}...`);
    lastChangedFile = filePath;
    runUpdateCommand(false);
  })
  .on('error', error => console.error(`Watcher error: ${error}`))
  .on('ready', () => {
    console.log('Watching for changes in:', dataDir);
  });

// Handle process termination
process.on('SIGINT', () => {
  console.log('Cleaning up...');
  if (updateTimeout) {
    clearTimeout(updateTimeout);
  }
  themeWatcher.close();
  dataWatcher.close();
  process.exit(0);
});

// Prevent the script from exiting on SIGTERM
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, ignoring to keep watch script running');
});

console.log('=== Watch Data Script Started ===');