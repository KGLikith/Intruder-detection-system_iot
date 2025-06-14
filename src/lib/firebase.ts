import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBQIP8i0nF55TOLEgGhcnNbBln7JUzgQnE",
  authDomain: "intruder-detection-syste-f5256.firebaseapp.com",
  databaseURL: "https://intruder-detection-syste-f5256-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "intruder-detection-syste-f5256",
  storageBucket: "intruder-detection-syste-f5256.firebasestorage.app",
  messagingSenderId: "751169235722",
  appId: "1:751169235722:web:b0feec85ba9798074ba8f3",
  measurementId: "G-85WW1S8R30"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };