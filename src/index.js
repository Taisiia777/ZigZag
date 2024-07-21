import React from 'react';
import ReactDOM from 'react-dom/client';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UpdateProvider } from './contexts/UpdateTime';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TonConnectUIProvider manifestUrl={'https://raw.githubusercontent.com/Sanch3zCode/mnf/main/manifest.json'}>
        <UpdateProvider>
          <App />
        </UpdateProvider>
      </TonConnectUIProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
