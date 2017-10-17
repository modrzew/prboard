const execSync = require('child_process').execSync;

function check() {
  console.log('Fetching updates');
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
  console.log('Resetting repo');
  execSync('git checkout -- .');
  execSync('git reset --hard origin/master');
  console.log('Upgrading');
  execSync('yarn install');
  console.log('Building');
  execSync('yarn build');
}

function run() {
  if (check()) {
    rebuild();
  } else {
    console.log('No changes');
  }
}

console.log('Started!');
setInterval(run, 5 * 60 * 1000);
run();
