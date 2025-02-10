import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// // Dynamically import the worker in development mode
if (import.meta.env.VITE_USE_MSW === "true") {
  try {
    const { worker } = await import('../src/mocks/browser')
    worker.start().catch((err) => {
      console.error('Failed to start MSW', err)
      if (err.message.includes('The script has an unsupported MIME type')) {
        console.error('Check if the mockServiceWorker.js file is being served correctly.')
      }
    })
  } catch (err) {
    console.error('Failed to import MSW', err)
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)