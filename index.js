import { initializeApp } from 'firebase/app';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import fs from 'fs';

const firebaseConfig = {
  apiKey: 'AIzaSyAlDsxk6y4pVWi8au0FQ_Brtn4qyU7mGvE',
  authDomain: 'hackaton-da764.firebaseapp.com',
  databaseURL:
    'https://hackaton-da764-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'hackaton-da764',
  storageBucket: 'hackaton-da764.appspot.com',
  messagingSenderId: '420471406105',
  appId: '1:420471406105:web:76452e2acb5db01d32f488',
  measurementId: 'G-0GY7SFGH91',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const rawJson = fs.readFileSync('./festivals.json', 'utf8');
const festivals = JSON.parse(rawJson);

const festivalsWithExtraFields = festivals.map((festival) => ({
  postalCode: null,
  contactEmail: null,
  webSite: null,
  geolocation: [],
  availableTickets: 0,
  creatorId: '',
  status: 2,
  ...festival,
}));

for (let i = 0; i < 100; i++) {
  setDoc(
    doc(db, 'festivals', festivalsWithExtraFields[i].id),
    festivalsWithExtraFields[i]
  );
}
