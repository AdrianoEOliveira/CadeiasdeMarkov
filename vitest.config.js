import { defineConfig } from 'vitest/config'


export default defineConfig({
  test: {
    environment: 'jsdom',
    //setupFiles:'./tests/setupTests.js', // Caminho absoluto
    include: ['test/**/*.test.js'],  // Caminho para os testes
  },

    //  browser: {
    //  enabled: false,
    //  name: 'chromium',
     // provider: 'playwright',
      // https://playwright.dev
     // include: ['test/**/*.test.js'],  // Caminho para os testes
     // providerOptions: {},
   // },
  //},
})
