import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      VITE_API: JSON.stringify(process.env.VITE_API),
      VITE_URL_TEST: JSON.stringify(process.env.VITE_URL_TEST),
      VITE_API_PORT: JSON.stringify(process.env.VITE_API_PORT),
      PORT: JSON.stringify(process.env.PORT),
    },
  },
});
