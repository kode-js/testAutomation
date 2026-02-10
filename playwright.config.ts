import { defineConfig, devices } from '@playwright/test';
import { execSync } from 'child_process';
// Get current timestamp for unique report folder
const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
const channels = ['bac', 'spynz', 'nsp', 'vm', 'spyau'];
const envs = ['uat', 'prod', 'dev'];

let env = (process.env.ENV || '').trim();
let channel = (process.env.CHANNEL || '').trim();

if (!env) {
  console.warn('ENV not set — defaulting to "uat" for local runs.');
  env = 'uat';
}
if (!channel) {
  console.warn('CHANNEL not set — defaulting to "bac" for local runs.');
  channel = 'bac';
}

if (!channels.includes(channel)) {
  console.error(`Invalid CHANNEL value. Expected one of: ${channels.join(', ')}`);
  process.exit(1);
}

if (!envs.includes(env)) {
  console.error(`Invalid ENV value. Expected one of: ${envs.join(', ')}`);
  process.exit(1);
}

// Set baseURL based on CHANNEL and ENV
let baseURL = '';
let testDir = '';
if (channel === 'bac') {
  if (env === 'uat') {
    baseURL = 'https://bac-uat.9spokes.io';
  } else if (env === 'prod') {
    baseURL = 'https://bac-prd.9spokes.io';
  } else if (env === 'dev') {
    baseURL = 'https://bac-dev.9spokes.io';
  }
  testDir = `./src/bac/tests`;
}
else if (channel === 'spynz') {
  if (env === 'uat') {
    baseURL = 'https://spynz.app-uat.9spokes.dev';
  } else if (env === 'prod') {
    baseURL = '';
  } else if (env === 'dev') {
    baseURL = '';
  }
  testDir = `./src/spynz/tests`;
}else if (channel === 'nsp') {
  if (env === 'uat') {
    baseURL = 'https://nsp-dev.9spokes.io';
  } else if (env === 'prod') {
    baseURL = 'https://nsp-prd.9spokes.io';
  } else if (env === 'dev') {
    baseURL = 'https://nsp-dev.9spokes.io';
  }
  testDir = `./src/nsp/tests`;
}else if (channel === 'vm') {
  if (env === 'uat') {
    baseURL = 'https://vm-uat.9spokes.io';
  } else if (env === 'prod') {
    baseURL = 'https://vm-prd.9spokes.io';
  } else if (env === 'dev') {
    baseURL = 'https://vm-dev.9spokes.io';
  }
  testDir = `./src/vm/tests`;
}else if (channel === 'spyau') {
  if (env === 'uat') {
    baseURL = ' https://spyau.app-uat.9spokes.dev';
  } else if (env === 'prod') {
    baseURL = '';
  } else if (env === 'dev') {
    baseURL = '';
  }
  testDir = `./src/spyau/tests`;
}

if(baseURL === '') {
  console.error(`Base URL not defined for CHANNEL: ${channel} and ENV: ${env}`);
  process.exit(1);
}

console.log(`Running tests on ${channel} environment: ${env}`);
console.log(`Base URL: ${baseURL}`);


// Get current display resolution (macOS). Use regex and fall back to sensible defaults.
let resWidth = 1280;
let resHeight = 800;
try {
  const resolution = execSync('system_profiler SPDisplaysDataType | grep Resolution').toString().trim();
  console.log('Current Display Resolution:', resolution);
  const match = resolution.match(/Resolution:\s*(\d+)\s*x\s*(\d+)/i);
  if (match) {
    resWidth = parseInt(match[1], 10);
    resHeight = parseInt(match[2], 10);
  } else {
    console.warn('Could not parse display resolution; using fallback 1280x800.');
  }
} catch (e) {
  console.warn('Failed to get display resolution, using fallback 1280x800.');
}

export default defineConfig({
  timeout: 60 * 60 * 1000,
  expect: {
    timeout: 20 * 1000, // Sets default expect timeout to 90 seconds
  },
  testDir: testDir,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  //workers: process.env.CI ? 1 : undefined,
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['list'], // keep console output
    ['allure-playwright',
      {
        outputFolder: 'allure-results',
        suiteTitle: false,
        showHooks: false,
        detail: false,
        hooks: false,
        trace: 'off'
      }], 
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
   baseURL: baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

  },

  /* Configure projects for major browsers */
  projects: [
   
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'], channel: 'chrome', headless: false, viewport: { width: resWidth / 2, height: resHeight/2 },

      },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],
});