const execSync = require('child_process').execSync;

function check() {
  const local = execSync('git rev-parse @')
    .toString()
    .trim();
  const upstream = execSync('git rev-parse @{u}')
    .toString()
    .trim();
  return local !== upstream;
}

function run() {
  console.log('Resetting repo');
  execSync('git reset --hard');
  console.log('Fetching updates');
  execSync('git pull --rebase origin master');
  console.log('Upgrading');
  execSync('yarn install');
  console.log('Building');
  execSync('yarn build');
}

console.log('Started!');
setInterval(function() {
  if (check()) {
    run();
  }
}, 5 * 60 * 1000);
