const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Declare variables
let roomCapacity = [];
let roomCount, totalCapacity, totalStudents;

// Function to optimize room selection
function roomOptimization(extraSeats, roomIndex, ignoredRooms) {
    while (extraSeats < roomCapacity[roomIndex] && roomIndex >= 0) {
        roomIndex--;
        if (roomIndex < 0) {
            return;
        }
    }

    ignoredRooms.push(roomIndex);
    extraSeats -= roomCapacity[roomIndex];

    if (extraSeats >= roomCapacity[0]) {
        roomIndex--;
        if (roomIndex >= 0) {
            roomOptimization(extraSeats, roomIndex, ignoredRooms);
        }
    }
}

// Input: roomCapacity[], roomCount, totalCapacity, totalStudents
rl.question("Enter the number of rooms: ", (count) => {
    roomCount = parseInt(count);

    rl.question("Enter the capacity for each room (space-separated): ", (capacities) => {
        roomCapacity = capacities.split(' ').map(capacity => parseInt(capacity));

        rl.question("Enter total capacity: ", (capacity) => {
            totalCapacity = parseInt(capacity);

            rl.question("Enter total students: ", (students) => {
                totalStudents = parseInt(students);

                // Initialize extraSeats to the difference of totalCapacity and totalStudents
                let extraSeats = totalCapacity - totalStudents;

                // Declare utilizedRooms, ignoredRooms as empty lists
                let utilizedRooms = [];
                let ignoredRooms = [];

                // Initialize roomIndex to one less than roomCount
                let roomIndex = roomCount - 1;

                // Call RoomOptimization function
                roomOptimization(extraSeats, roomIndex, ignoredRooms);

                // If ignoredRooms is not empty, add rooms to utilizedRooms
                if (ignoredRooms.length > 0) {
                    for (let i = 0; i < roomCount; i++) {
                        if (!ignoredRooms.includes(i)) {
                            utilizedRooms.push(i);
                        }
                    }
                } else {
                    // Add all rooms to utilizedRooms
                    utilizedRooms = Array.from({ length: roomCount }, (_, i) => i);
                }

                // Output: utilizedRooms, ignoredRooms
                console.log("Utilized Rooms:", utilizedRooms);
                console.log("Ignored Rooms:", ignoredRooms);

                rl.close();
            });
        });
    });
});
