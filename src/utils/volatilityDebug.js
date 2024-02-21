const fs = require('fs');
const { DATA_DIR } = require('../utils/constants');
const path = require('path');

const file = path.join(DATA_DIR, 'precomputed', 'price', 'pancakeswapv2', 'BTCB-USDT-unified-data.csv');


function debugPriceData(file){
fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    const lines = data.split('\n').filter(line => line); // Split the file into lines and remove empty lines
    const objectsArray = lines.slice(1).map(line => { // Skip the header line
        const [timestamp, value] = line.split(','); // Split each line by comma
        return {
            timestamp,
            value: parseFloat(value) // Convert value string to float
        };
    });

    let maxObject = objectsArray.reduce((max, obj) => obj.value > max.value ? obj : max, objectsArray[0]);
    let minObject = objectsArray.reduce((min, obj) => obj.value < min.value ? obj : min, objectsArray[0]);
    let average = objectsArray.reduce((acc, obj) => acc + obj.value, 0) / objectsArray.length;

    console.log(`The smallest value is ${minObject.value} at timestamp ${minObject.timestamp}`);
    console.log(`The largest value is ${maxObject.value} at timestamp ${maxObject.timestamp}`);
    console.log(`The average value is ${average}`);

    let changes = [];
    for (let i = 1; i < objectsArray.length; i++) {
        let fromValue = parseFloat(objectsArray[i - 1].value); // Parse the value to ensure it's a number for accurate calculations
        let toValue = parseFloat(objectsArray[i].value);
        let currentChange = Math.abs(toValue - fromValue);
        let percentageVariation = ((currentChange / fromValue) * 100).toFixed(2); // Calculate and format percentage variation
        changes.push({
            from: objectsArray[i - 1],
            to: objectsArray[i],
            change: currentChange.toFixed(2), // Keep two decimal places for change
            percentageVariation // Already formatted to two decimal places
        });
    }

    // Sort changes by the highest percentage variation and keep the top 10
    let topChanges = changes.sort((a, b) => b.percentageVariation - a.percentageVariation).slice(0, 10);

    console.log('Top 10 Variations:');
    topChanges.forEach((change, index) => {
        console.log(`${index + 1}: From ${change.from.value.toFixed(2)} at ${change.from.timestamp} to ${change.to.value.toFixed(2)} at ${change.to.timestamp}, change: ${change.change}, % variation: ${change.percentageVariation}%`);
    });
})
}

debugPriceData(file);