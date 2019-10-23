const express = require('express');
const binarySearch = require('./binarySearch');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const exampleData = require('../data/tracking.json');

app.get('/', (req, res) => {
    // TODO(Task 1): Split tracking data into trip segments for example by using the time property.
    // while the array is sorted based on time
    let segments = [],
        segment = [exampleData[0]];
    // split the segments if the time exceeds 120 min
    for (let i = 1; i < exampleData.length; ++i) {
        // put data into date format
        const date = new Date(exampleData[i].time);
        const prevDate = new Date(exampleData[i - 1].time);
        // check it time less than 120 mins or not
        if (Math.abs(date - prevDate) / 1000 / 60 <= 120) {
            segment.push(exampleData[i]);
        } else {
            segments.push(segment);
            segment = [exampleData[i]];
        }
        if (i === exampleData.length - 1) segments.push(segment);
    }
    res.send(segments);
});

app.get('/location/:when', (req, res) => {
    // TODO(Task 2): Return the tracking data closest to `req.params.when` from `exampleData`.
    const { when } = req.params;
    // as the data is sorted "in reverse" in terms of time so
    // we can use reversed binary search to make better performance
    const nearest = binarySearch(exampleData, exampleData.length, new Date(when));
    res.send({ nearest });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
