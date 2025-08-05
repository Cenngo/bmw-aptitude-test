import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { SWRConfig } from 'swr'
import { swrFetcher } from './utils/axios';
import { BrowserRouter, Route, Routes } from 'react-router';
import { DetailsPage } from './pages/details';
import { Index } from './pages/index';

ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SWRConfig value={{fetcher: swrFetcher}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path=":carId" element={<DetailsPage/>}/>
        </Routes>
      </BrowserRouter>
    </SWRConfig>
  </StrictMode>
)
