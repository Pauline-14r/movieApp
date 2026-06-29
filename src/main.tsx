import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {GenresContextProvider} from "./context/GenresContext.tsx";

import 'antd/dist/reset.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <GenresContextProvider>
          <App />
      </GenresContextProvider>
  </StrictMode>,
)
