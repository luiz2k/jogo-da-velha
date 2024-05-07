import { defineConfig } from 'cypress';

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    // Base URL da aplicação
    baseUrl: 'http://localhost:5173',

    // Impede de limpar o estado da tela após cada it
    testIsolation: false,
  },
});
