import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import App from './App.jsx'
import {DataProvider} from  "./components/dataProvider/dataProvider"
import {initialState,reducer} from "./utility/reducer"

createRoot(document.getElementById('root')).render(
   <StrictMode>
    <BrowserRouter>
    <DataProvider reducer={reducer} initialState={initialState}>
      <App />
    </DataProvider>
    </BrowserRouter>
  </StrictMode>
)
