const { execSync } = require('child_process');

execSync(
  'npx allure-commandline generate allure-results --clean -o allure-report',
  {
    stdio: 'inherit',
  }
);