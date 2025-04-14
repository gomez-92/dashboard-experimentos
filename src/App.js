import './App.css';
import { autenticarAutomaticamente } from './Utils/Firebase/FirebaseDatabase';
import { getLecturas } from './Utils/Firebase/FirebaseController';
import { useEffect, useState } from 'react';
import './Componentes/Grafico/Grafico.jsx'
import Grafico from './Componentes/Grafico/Grafico.jsx';

const email = process.env.REACT_APP_FIREBASE_USER_EMAIL;
const password = process.env.REACT_APP_FIREBASE_USER_PASSWORD;

const App = () => {
  const [autenticado, setAutenticado] = useState(false);
  const [datos, setDatos] = useState([]);
  const [ultimoTimestamp, setUltimoTimestamp] = useState(0);

  useEffect(() => {
    const autenticar = async () => {
      try {
        console.log("Autenticando...");
        await autenticarAutomaticamente(email, password);
        setAutenticado(true);
      } catch (error) {
        console.log("Error al autenticarse en Firebase.");
        setAutenticado(false);
      }
    };
    autenticar();
  }, []);

  useEffect(() => {
    if (!autenticado) return;

    const obtenerDatos = async () => {
      try {
        const response = await getLecturas("ambiente", ultimoTimestamp);
        if (!response) return;

        const nuevosDatos = Object.values(response);
        
        if (Array.isArray(nuevosDatos) && nuevosDatos.length > 0) {
          // Obtener el último timestamp recibido
          const nuevoUltimoTimestamp = nuevosDatos[nuevosDatos.length - 1].time;

          // Actualizamos el estado correctamente:
          setDatos(prevDatos => {
            // Añadir solo los nuevos datos que no se han agregado antes
            const datosUnicos = nuevosDatos.filter(d => !prevDatos.some(pd => pd.time === d.time));
            return [...prevDatos, ...datosUnicos];
          });

          // Actualizamos el timestamp con el último timestamp recibido
          setUltimoTimestamp(nuevoUltimoTimestamp);

          console.log("Datos actualizados.");
        }
      } catch (error) {
        console.log("Error al obtener datos:", error);
      }
    };

    // Llamar a obtenerDatos
    obtenerDatos();

    // Configurar intervalo para obtener datos cada 20 segundos
    const intervalo = setInterval(obtenerDatos, 20000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalo);

  }, [autenticado, ultimoTimestamp]); // Dependencia de `ultimoTimestamp` para asegurar que se usa el valor actualizado

  if (!autenticado) {
    return <>Sin autenticar</>;
  }

  return (<Grafico title="Test 5" titleX="Tiempo" titleY="Temperatura ºC" vEjeX={getTiempo(datos)} vEjeY={getTemperatura(datos)}/>);
};

const getTiempo = (datos)=>{
  return datos.map(dato => dato["time"]);
}

const getTemperatura = (datos)=>{
  return datos.map(dato => dato["temperatura"]);
}



export default App;