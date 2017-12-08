const { spawn } = require('child_process');


const install = (...packages) => (
  new Promise((resolve, reject) => {
    console.log('running', 'npm', 'install', ...packages);

    const child = spawn('npm', ['install', ...packages], { shell: true, stdio: 'inherit' });

    child.on('exit', () => resolve());

    child.on('error', () => reject());
  })
);

module.exports = {
  install,
};
