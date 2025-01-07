import { defineConfig } from 'vitest/config'


export default defineConfig({
  test: {
    environment: 'jsdom',
    testTimeout: 20000, // Timeout de 20 segundos para todos os testes
    setupFiles:'./test/setupTests.js', // Caminho absoluto
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
