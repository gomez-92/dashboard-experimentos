// FirebaseController.js
import firebaseManager from './FirebaseManager'; // Importa la instancia Singleton

// Método que trae todas las lecturas de un sensor de un registro determinado
export const getLecturas = async (sensorId, time) => {
    const nodo = `/Prueba3abril/${sensorId}`;
    return await firebaseManager.getAfterTimestamp(nodo, time);
}