/* global fetch, L */
import React, { useEffect, useRef, useState } from 'react';
import Moment from 'moment';

const getRouteSummary = locations => {
    const to = Moment(locations[0].time).format('hh:mm DD.MM');
    const from = Moment(locations[locations.length - 1].time).format('hh:mm DD.MM');
    return `${from} - ${to}`;
};
let marker;
const MapComponent = props => {
    const map = useRef();

    const [locations, setLocations] = useState();
    const [lookup, setLookup] = useState();
    const [selectedDate, setSelectedDate] = useState();
    // Request location data.
    useEffect(() => {
        fetch('http://localhost:3000')
            .then(response => response.json())
            .then(json => {
                setLocations(json);
            });
    }, []);
    // TODO(Task 2): Request location closest to specified datetime from the back-end.
    if (selectedDate !== props.selectedDate) {
        setSelectedDate(props.selectedDate);
        fetch(`http://localhost:3000/location/${selectedDate}`)
            .then(response => response.json())
            .then(json => {
                setLookup(json.nearest);
            });
    }
    // useEffect(() => {}, []);

    // Initialize map.
    useEffect(() => {
        map.current = new L.Map('mapid');
        const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        const attribution = 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors';
        const osm = new L.TileLayer(osmUrl, {
            minZoom: 8,
            maxZoom: 12,
            attribution
        });
        map.current.setView(new L.LatLng(52.51, 13.4), 9);
        map.current.addLayer(osm);
    }, []);
    // Update location data on map.
    useEffect(() => {
        if (!map.current || !locations) {
            return; // If map or locations not loaded yet.
        }
        // TODO(Task 1): Replace the single red polyline by the different segments on the map.
        locations.map(location => {
            const latlons = location.map(({ lat, lon }) => [lat, lon]);
            const polyline = L.polyline(latlons, {
                color: '#' + (Math.random().toString(16) + '000000').substring(2, 8) //get random colors each time
            })
                .bindPopup(getRouteSummary(location))
                .addTo(map.current);
            map.current.fitBounds(polyline.getBounds());
            return () => map.current.remove(polyline);
        });
    }, [locations, map.current]);
    // TODO(Task 2): Display location that the back-end returned on the map as a marker.
    useEffect(() => {
        if (!lookup || !map.current) return;
        console.log(lookup);
        if (marker) {
            marker.remove();
        }
        marker = L.marker([lookup.lat, lookup.lon]).addTo(map.current);
    });

    return (
        <div>
            {locations && `${locations.length} locations loaded`}
            {!locations && 'Loading...'}
            <div id='mapid' />
        </div>
    );
};

export default MapComponent;
