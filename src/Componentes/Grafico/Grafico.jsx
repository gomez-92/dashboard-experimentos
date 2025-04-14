import "./Grafico.css";
import React from "react";
import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  
  // Registrar los componentes necesarios de Chart.js
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const Grafico = ({title, titleX, titleY, vEjeX, vEjeY}) => {
    if((Array.isArray(vEjeX) && Array.isArray(vEjeY) && vEjeX.length > 0 && vEjeY.length > 0 && vEjeX.length == vEjeY.length)){
        <>No hay datos para mostrar</>
    }
    console.log(vEjeY);
    return(<Line data={getData({titleY, vEjeX, vEjeY})} options={getOptions(title, titleX, titleY)}/>);
}

const getData = ({titleY, vEjeX, vEjeY}) => {
    return ({
        labels: vEjeX, // Eje X: tiempos
        datasets: [
          {
            label: titleY, // Etiqueta del dataset
            data: vEjeY, // Eje Y: temperaturas
            borderColor: "rgba(255, 0, 180, 1)", // Color de la línea
            backgroundColor: "rgba(255, 255, 255, 1)", // Color de fondo
            tension: 0.3, // Curvatura de la línea
          },
        ],
      });
}

const getOptions = ({titulo, titleX, titleY}) => {
    return ({
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: titulo, // Título del gráfico
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: titleX, // Etiqueta del eje X
            },
          },
          y: {
            title: {
              display: true,
              text: titleY, // Etiqueta del eje Y
            },
            min: 10,
            //beginAtZero: true, // Iniciar el eje Y desde 0
          },
        },
      });
}

export default Grafico;