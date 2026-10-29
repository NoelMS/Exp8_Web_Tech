import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base matches the GitHub Pages path https://noelms.github.io/Exp8_Web_Tech/
export default defineConfig({ plugins: [react()], base: '/Exp8_Web_Tech/' });
