import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorker from './serviceWorker';
import RootForm from "./components/RootForm";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./components/Dashboard";


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<RootForm />} />
            <Route path="home" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

serviceWorker.register();
