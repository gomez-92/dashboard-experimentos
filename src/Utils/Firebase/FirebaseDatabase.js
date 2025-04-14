// FirebaseDatabase.js

import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

async function autenticarAutomaticamente(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuario autenticado:", userCredential.user.uid);
    return userCredential.user;
  } catch (error) {
    console.error("Error en autenticación:", error);
    throw error;
  }
}

async function cerrarSesion() {
  try {
    await signOut(auth);
    console.log("Sesión cerrada");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
}

export { database, cerrarSesion, autenticarAutomaticamente };