import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import DatePicker from 'react-datepicker';
import MapComponent from './map_component';
import './styles.css';
import 'react-datepicker/dist/react-datepicker.css';
const exampleData = require('../../data/tracking.json');

const Index = () => {
    const [chosen, setChosen] = useState();

    // set up the min date and last max date he can choose
    const endDate = new Date(exampleData[0].time),
        startDate = new Date(exampleData[exampleData.length - 1].time);
    return (
        <div>
            <div className='header'>
                <h1>Welcome to the example task!</h1>
            </div>
            {/* TODO(Task 2): Add a slider to select datetime in the past.
        Pass the selected value as prop to the MapContainer */}
            <h2 className='markerHeader'>Chose a date to see where the driver was : </h2>
            <DatePicker
                selected={chosen}
                onChange={date => {
                    setChosen(date);
                }}
                showTimeSelect
                timeFormat='HH:mm'
                minDate={startDate}
                maxDate={endDate}
                timeIntervals={15}
                timeCaption='Time'
            />
            <MapComponent selectedDate={chosen} />
        </div>
    );
};

ReactDOM.render(<Index />, document.getElementById('main-container'));
