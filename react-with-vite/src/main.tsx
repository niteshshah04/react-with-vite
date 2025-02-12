import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'


console.log('---------------Main-----------------',import.meta.env.VITE_USE_MSW, import.meta.env.MODE);
// Dynamically import the worker in development mode
if (import.meta.env.VITE_USE_MSW === "true" && import.meta.env.MODE !== "production") {
  async function startWorker() {
    try {
      const { worker } = await import('../src/mocks/browser');
      worker.start().catch((err) => {
        console.error('Failed to start MSW', err);
        if (err.message.includes('The script has an unsupported MIME type')) {
          console.error('Check if the mockServiceWorker.js file is being served correctly.');
        }
      });
    } catch (err) {
      console.error('Failed to import MSW', err);
    }
  }

  // Call the async function to start the worker
  startWorker();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)