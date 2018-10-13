import firebase from 'firebase'
var config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  storageBucket: process.env.REACT_APP_BUCKET_URL,
  messagingSenderId: process.env.REACT_APP_MSG_SDR_ID
};
var fire = firebase.initializeApp(config);
export default fire;