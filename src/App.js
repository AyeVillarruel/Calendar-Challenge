import { useState } from 'react';
import { Calendar } from './Calendar';
import './styles.css'

const fakeEvents = [{
    date: new Date(),
    title: 'Trash day!',
}, {
    date: new Date(),
    title: 'Other stuff',
}];
console.log(fakeEvents)

export const App = () => {

    const today = new Date();
    const events = useState(fakeEvents);
    
    const onClickDate =(selectedDate, col )  => {
          
       const evento= (col.events)
       evento.push({date: col.date, title:"hola"})
       evento? console.log(evento): console.log('no hay nada')
        fakeEvents.push({date: col.date, title:"hola"})
        console.log(fakeEvents)
       
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Calendar
                events={events}
                onClickDate={onClickDate}
                startingDate={today} />
        </div>
    );
}