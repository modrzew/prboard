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
  console.log('Fetching updates');
  execSync('git fetch origin master');
  console.log('Resetting repo');
  execSync('git checkout -- .');
  execSync('git reset --hard origin/master');
  console.log('Upgrading');
  execSync('yarn install');
  console.log('Building');
  execSync('yarn build');
}

console.log('Started!');
setInterval(function() {
  if (check()) {
    run();
  } else {
    console.log('No changes');
  }
}, 5 * 60 * 1000);
