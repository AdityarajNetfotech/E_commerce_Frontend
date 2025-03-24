import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import './main.css'
import { FilterProvider } from './Pages/Student/ProductPages/FilterContext.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
   <FilterProvider>
    <App />
    </FilterProvider>
  </StrictMode>,
)
