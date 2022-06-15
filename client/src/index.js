import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './barebones/App';
import Provider from "./barebones/DinoContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider>
        <App />
    </Provider>
);