const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests/browser',
    fullyParallel: true,
    workers: 2,
    retries: 0,
    timeout: 30000,
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
        baseURL: 'https://127.0.0.1:8761',
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure'
    },
    webServer: {
        command: 'node tests/serve.js',
        url: 'https://127.0.0.1:8761',
        ignoreHTTPSErrors: true,
        reuseExistingServer: false
    },
    projects: [
        { name: 'Chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 } } },
        { name: 'Firefox', use: { ...devices['Desktop Firefox'], viewport: { width: 1440, height: 1000 } } },
        { name: 'WebKit', use: { ...devices['Desktop Safari'], viewport: { width: 1440, height: 1000 } } },
        { name: 'Android', use: { ...devices['Pixel 7'] } },
        { name: 'iPhone', use: { ...devices['iPhone 13'] } }
    ]
});
