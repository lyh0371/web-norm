const createLogger = require('progress-estimator');
const { join } = require('path');

// All configuration keys are optional, but it's recommended to specify a storage location.
// Learn more about configuration options below.
const logger = createLogger({
  storagePath: join(__dirname, '.progress-estimator'),
});

const task1 = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1200);
  });
};
async function run() {
  await logger(task1(), 'This is a promise');
}

run();
