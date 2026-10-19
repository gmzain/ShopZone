import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux"
import { store } from "./features/store"
import './index.css'
import App from './App.jsx'
import { AppProvider } from './AppContext/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppProvider>
      <App />
      </AppProvider>
    </Provider>
  </StrictMode>,
)
