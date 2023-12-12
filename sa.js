const readline = require('readline');

const read = readline.createInterface({
        input: process.stdin,
        output:process.stdout
});


function distributeAmount(total, capacities) {
    const result = Array(capacities.length).fill(0);

    for (let i = 0; i < capacities.length; i++) {
        if (total >= capacities[i]) {
            result[i] = capacities[i];
            total -= capacities[i];
        } else {
            result[i] = total;
            total = 0;
            break;
        }
    }

    if (total > 0) {
        for (let i = 0; i < capacities.length; i++) {
            if (total > 0 && result[i] < capacities[i]) {
                const spaceAvailable = capacities[i] - result[i];
                const toAdd = Math.min(total, spaceAvailable);
                result[i] += toAdd;
                total -= toAdd;
            }
        }
    }

    return result;
}

// Example usage:
const totalAmount = 10;
const capacities = [10, 10];

const allocation = distributeAmount(totalAmount, capacities);

console.log("Allocation:", allocation);






