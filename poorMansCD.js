const execSync = require('child_process').execSync;

function log(msg) {
  const time = new Date().toTimeString();
  console.log(`${time} ${msg}`);
}

function check() {
  log('Fetching updates');
  execSync('git fetch origin master');
  const local = execSync('git rev-parse @')
    .toString()
    .trim();
  const upstream = execSync('git rev-parse @{u}')
    .toString()
    .trim();
  return local !== upstream;
}

function rebuild() {
  log('Resetting repo');
  execSync('git checkout -- .');
  execSync('git reset --hard origin/master');
  log('Upgrading');
  execSync('yarn install');
  log('Building');
  execSync('yarn build');
  log('Update done');
}

function run() {
  if (check()) {
    rebuild();
  } else {
    log('No changes');
  }
}

log('Started!');
setInterval(run, 5 * 60 * 1000);
run();
