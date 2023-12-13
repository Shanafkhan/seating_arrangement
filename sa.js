function populateRoomCourseIDs(roomCoursesCapacity, studentIDs) {
    const roomCourseIDs = Array.from({ length: roomCoursesCapacity.length }, () => []);

    for (let room = 0; room < roomCoursesCapacity.length; room++) {
        for (let course = 0; course < roomCoursesCapacity[room].length; course++) {
            let k = roomCoursesCapacity[room][course];

            for (let n = 1; n <= k; n++) {
                const student = studentIDs[course].shift(); // Remove and get the first student from the list
                roomCourseIDs[room].push(student);
            }
        }
    }

    return roomCourseIDs;
}

// Example usage
const roomCoursesCapacity = [
    [10, 14, 9],
    [10, 13, 8],
    [10, 13, 8]
];

const studentIDs = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
];

const roomCourseIDs = populateRoomCourseIDs(roomCoursesCapacity, studentIDs);
console.log("Room Course IDs:", roomCourseIDs);
