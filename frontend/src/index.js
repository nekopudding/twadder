import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/css/globals.css';
import App from './App';
import reportWebVitals from './utils/tests/reportWebVitals';
import { initializeApp } from 'firebase/app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe_SUb0lkUXYNnu_XBZIKIGx1qoZ-1rZk",
  authDomain: "twadder-b2796.firebaseapp.com",
  projectId: "twadder-b2796",
  storageBucket: "twadder-b2796.appspot.com",
  messagingSenderId: "517933089324",
  appId: "1:517933089324:web:166a26e6a55b09b7ff8789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
