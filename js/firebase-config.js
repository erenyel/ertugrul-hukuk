/* ============================================================
   Firebase Shared Config
   Her iki sayfada (index.html + admin.html) kullanılır.
   ============================================================ */

const firebaseConfig = {
    apiKey: "AIzaSyBkHLEwvkCEa6hTYcVP9_X8jkS8UdNLx5w",
    authDomain: "ertugrul-hukuk-burosu.firebaseapp.com",
    databaseURL: "https://ertugrul-hukuk-burosu-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ertugrul-hukuk-burosu",
    storageBucket: "ertugrul-hukuk-burosu.firebasestorage.app",
    messagingSenderId: "606082079535",
    appId: "1:606082079535:web:dcba29b16340a47b0d5fda",
    measurementId: "G-ZQD9GJ8MVF"
};

// Uygulama zaten başlatılmamışsa başlat
if (!firebase.apps || !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

// Auth SDK yüklüyse başlat (sadece admin.html'de yüklüdür)
const auth = (typeof firebase.auth === 'function') ? firebase.auth() : null;

