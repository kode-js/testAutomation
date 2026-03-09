import { defineConfig, devices } from '@playwright/test';
import { execSync } from 'child_process';
// Get current timestamp for unique report folder
const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
const channels = ['bac', 'spynz', 'nsp', 'vm', 'spyau'];
const envs = ['uat', 'prod', 'dev'];

// Read env vars but do not exit — keep discoverability for debug.
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
  console.warn(`Invalid CHANNEL value: ${channel}. Falling back to 'bac'. Expected one of: ${channels.join(', ')}`);
  channel = 'bac';
}

if (!envs.includes(env)) {
  console.warn(`Invalid ENV value: ${env}. Falling back to 'uat'. Expected one of: ${envs.join(', ')}`);
  env = 'uat';
}

// Set baseURL based on CHANNEL and ENV
let baseURL = '';
// Make test discovery friendly for IDEs: include all src tests by default.
let testDir = process.env.TEST_DIR || './src';
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
    baseURL = 'https://spynz.app-prd.9spokes.dev';
  } else if (env === 'dev') {
    baseURL = 'https://spynz.app-dev.9spokes.dev';
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
    baseURL = 'https://spyau.app-uat.9spokes.dev';
  } else if (env === 'prod') {
    baseURL = '';
  } else if (env === 'dev') {
    baseURL = '';
  }
  testDir = `./src/spyau/tests`;
}

if (baseURL === '') {
  console.warn(`Base URL not defined for CHANNEL: ${channel} and ENV: ${env}. Tests will still be discoverable; set proper base URLs via env or config for full end-to-end runs.`);
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
  timeout: 10 * 60 * 1000,
  expect: {
    timeout: 30 * 1000, // Sets default expect timeout to 30 seconds
  },
  // Use a broad testDir so IDE/Test Explorer can discover all suites for debugging.
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
    acceptDownloads: true,

  },

  /* Configure projects for major browsers */
  projects: [
   
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'], channel: 'chrome', actionTimeout: 30000, headless: false, viewport: { width: resWidth / 2, height: resHeight/2, },

      },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
  ],
});