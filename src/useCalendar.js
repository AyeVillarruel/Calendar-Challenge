import { useState } from 'react';
import './styles.css'

const useCalendar = (startingDate, events) => {  

    const filas = 6;
    const columnas = 7;


    const todayDate =  `${startingDate.getDate()}-${startingDate.getMonth() + 1}-${startingDate.getFullYear()}`;
    const daysInWeek = [0, 1, 2, 3, 4, 5, 6];
    const [selectedDate, setSelectedDate] = useState(startingDate);
    const selectedMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    const prevMonthLastDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 0);
    const daysInMonth = selectedMonthLastDate.getDate();
    const firstDayInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const start = daysInWeek.indexOf(firstDayInMonth) + 1;
    let prevMonthStart = prevMonthLastDate.getDate() - daysInWeek.indexOf(firstDayInMonth) + 1;
    let currentMonthCounter = 1;
    let nextMonthCounter = 1;
    
    const calendario = {};
  
    for(let i = 1; i < filas + 1; i++) {
      for(let j = 1; j < columnas + 1; j++) {
        if(!calendario[i]) {
          calendario[i] = [];
        }
  
        if(i === 1) {
          if(j < start) { //si todavia no empezo el mes muestra los ultimos dias del mes anterior
            calendario[i] = [...calendario[i], {
              estilo: 'mesAnt',
              date: `${prevMonthStart}-${selectedDate.getMonth() === 0 ? 12 : selectedDate.getMonth()}-${selectedDate.getMonth() === 0 ? selectedDate.getFullYear() - 1 : selectedDate.getFullYear()}`, //si no exite mes previo se pone diciembre del año pasado
              events:[],
              value: prevMonthStart
            }];
            prevMonthStart++; //aumenta la fecha del mes anterior
          }else { //si el mes empieza justo el primer dia del calendario
            calendario[i] = [...calendario[i], {
              estilo: '',
              date: `${currentMonthCounter}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`, 
              events: [],
              value: currentMonthCounter //numero del mes 
            }];
            currentMonthCounter++; //aumenta el mes
          }
        }else if( i > 1 && currentMonthCounter < daysInMonth + 1 ) { //si ya esta dentro del mes muestra los dias del mes actual
          calendario[i] = [...calendario[i], {
            estilo: '',
            date: `${currentMonthCounter}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`,
            events:[],
            value: currentMonthCounter
          }];
          currentMonthCounter++; //aumenta el dia de la fecha
        }else { //si ya termino el mes muestra los primerps dias del mes siguiente
          calendario[i] = [...calendario[i], {
            estilo: 'mesSig',
            date: `${nextMonthCounter}-${selectedDate.getMonth() + 2 === 13 ? 1 : selectedDate.getMonth() + 2}-${selectedDate.getMonth() + 2 === 13 ? selectedDate.getFullYear() + 1 : selectedDate.getFullYear()}`,
            events:[],
            value: nextMonthCounter
          }];
          nextMonthCounter++;
        }
      }
    }
  
    const getPrevMonth = () => {
      setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() - 1, 1));
    }
  
    const getNextMonth = () => {
      setSelectedDate(prevValue => new Date(prevValue.getFullYear(), prevValue.getMonth() + 1, 1));
    }
  
    return {
      todayDate,
      calendario,
      selectedDate,
      getPrevMonth,
      getNextMonth
    }
  }
  
  export default useCalendar;