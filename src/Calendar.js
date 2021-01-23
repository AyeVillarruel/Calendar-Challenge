// Work your magic here!

import React from "react";

import useCalendar from "./useCalendar";
import "./styles.css";

const namesWeekday = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
];

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export const Calendar = ({ events, startingDate, onClickDate }) => {
  const array=[]

  const {
    calendario,
    selectedDate,
    todayDate,
    getNextMonth,
    getPrevMonth,
  } = useCalendar(startingDate, events);

  return (
    <div style={{width:"100%", height:"100%"}}>
      <h1>
        {monthNames[selectedDate.getMonth()] + selectedDate.getFullYear()}
      </h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="button" onClick={getPrevMonth}>
          Prev
        </button>
        <button className="button" onClick={getNextMonth}>
          Next
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            {namesWeekday?.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.values(calendario).map((calen) => {
            return (
              <tr key={calen[0].date}>
                {calen.map((col) =>
                  col.date === todayDate ? (
                    <td
                      key={col.date}
                      className={`${col.estilo}today`}
                      onClick={() => onClickDate(array[0], col)}
                    >
                      {col.value}
                      {col.events}
                      
                    </td>
                  ) : (
                    <td
                      key={calen.date}
                      className={col.estilo}
                      onClick={() => onClickDate(array[0], col)}
                    >
                     
                      {col.value}
                      
                    </td>
                  )
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
