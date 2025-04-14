// FirebaseManager.js
import { database } from './FirebaseDatabase';
import { ref, get, query, orderByKey, orderByChild, startAfter, push, set, update, remove } from 'firebase/database';

class FirebaseManager {
  // Instancia única de la clase
  static instance = null;

  // Constructor privado para evitar la creación de nuevas instancias
  constructor() {
    if (FirebaseManager.instance) {
      return FirebaseManager.instance;
    }
    this.database = database;
    FirebaseManager.instance = this;
  }

  // Método estático para obtener la instancia única
  static getInstance() {
    if (!FirebaseManager.instance) {
      FirebaseManager.instance = new FirebaseManager();
    }
    return FirebaseManager.instance;
  }

  // Método para obtener datos de una referencia
  async get(refPath) {
    try {
      const dbRef = ref(this.database, refPath);
      const snapshot = await get(dbRef);
      return snapshot.val();
    } catch (error) {
      console.error("[FirebaseManager]: Error al consultar un dato. ", error);
      throw error;
    }
  }

  // Método para obtener registros con una clave mayor que un valor específico
  async getAfterKey(refPath, startAfterKey) {
    try {
      const dbRef = ref(this.database, refPath);
      let dbQuery = query(dbRef, orderByKey());
      if (startAfterKey) {
        dbQuery = query(dbRef, orderByKey(), startAfter(String(startAfterKey)));
      }
      const snapshot = await get(dbQuery);
      return snapshot.val();
    } catch (error) {
      console.error("[FirebaseManager]: Error al consultar un dato. ", error);
      throw error;
    }
  }

  // Método para obtener registros con un timestamp superior a un valor específico
  async getAfterTimestamp(refPath, startAfterTimestamp) {
    try {
      const dbRef = ref(this.database, refPath);
      const dbQuery = query(dbRef, orderByChild("time"), startAfter(startAfterTimestamp));
      const snapshot = await get(dbQuery);
      return snapshot.val();
    } catch (error) {
        console.error("[FirebaseManager]: Error al consultar un dato. ", error);
      throw error;
    }
  }

  // Método para agregar datos a una referencia
  async push(refPath, data) {
    try {
      const dbRef = ref(this.database, refPath);
      const newRef = push(dbRef);
      await set(newRef, data);
      return newRef.key;
    } catch (error) {
      console.error("[FirebaseManager]: Error al insertar un dato. ", error);
      throw error;
    }
  }

  // Método para actualizar datos en una referencia
  async update(refPath, data) {
    try {
      const dbRef = ref(this.database, refPath);
      await update(dbRef, data);
    } catch (error) {
      console.error("[FirebaseManager]: Error al actualizar un dato. ", error);
      throw error;
    }
  }

  // Método para eliminar datos de una referencia
  async delete(refPath) {
    try {
      const dbRef = ref(this.database, refPath);
      await remove(dbRef);
    } catch (error) {
      console.error("[FirebaseManager]: Error al eliminar un dato. ", error);
      throw error;
    }
  }
}

// Exporta la instancia única de FirebaseManager
export default FirebaseManager.getInstance();