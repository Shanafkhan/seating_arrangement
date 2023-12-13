function allocateStudentsToRooms(coursesCapacity, utilizedRoomsCapacity) {
  const roomCoursesCapacity = Array.from({ length: utilizedRoomsCapacity.length }, () => []);
  const roomCourseIDs = Array.from({ length: utilizedRoomsCapacity.length }, () => []);
  const roomEmptySeats = new Array(utilizedRoomsCapacity.length).fill(0);
  const courseCapacityNotFilled = new Array(coursesCapacity.length).fill(0);

  for (let roomIndex = 0; roomIndex < utilizedRoomsCapacity.length; roomIndex++) {
    const roomCapacity = utilizedRoomsCapacity[roomIndex];
    for (let courseIndex = 0; courseIndex < coursesCapacity.length; courseIndex++) {
      const j = Math.floor(coursesCapacity[courseIndex] / utilizedRoomsCapacity.length);
      if (roomCapacity >= j) {
        roomCoursesCapacity[roomIndex].push(j);
        roomCourseIDs[roomIndex].push(courseIndex);
        utilizedRoomsCapacity[roomIndex] -= j;
      } else if (roomCapacity > 0) {
        roomCoursesCapacity[roomIndex].push(roomCapacity);
        roomCourseIDs[roomIndex].push(courseIndex);
        utilizedRoomsCapacity[roomIndex] = 0;
      } else {
        roomCoursesCapacity[roomIndex].push(0);
        roomCourseIDs[roomIndex].push(-1); // Placeholder for courses not assigned
      }
    }
  }

  for (let roomIndex = 0; roomIndex < utilizedRoomsCapacity.length; roomIndex++) {
    if (roomCoursesCapacity[roomIndex].reduce((sum, value) => sum + value, 0) >= utilizedRoomsCapacity[roomIndex]) {
      roomEmptySeats[roomIndex] = 0;
    } else {
      const difference =
        utilizedRoomsCapacity[roomIndex] - roomCoursesCapacity[roomIndex].reduce((sum, value) => sum + value, 0);
      roomEmptySeats[roomIndex] = difference;
    }
  }

  for (let courseIndex = 0; courseIndex < coursesCapacity.length; courseIndex++) {
    if (
      coursesCapacity[courseIndex] ===
      roomCoursesCapacity.reduce((sum, roomCapacityList) => sum + roomCapacityList[courseIndex], 0)
    ) {
      courseCapacityNotFilled[courseIndex] = 0;
    } else {
      const difference =
        coursesCapacity[courseIndex] -
        roomCoursesCapacity.reduce((sum, roomCapacityList) => sum + roomCapacityList[courseIndex], 0);
      courseCapacityNotFilled[courseIndex] = difference;
    }
  }

  for (let courseIndex = 0; courseIndex < coursesCapacity.length; courseIndex++) {
    if (courseCapacityNotFilled[courseIndex] !== 0) {
      for (let roomIndex = 0; roomIndex < utilizedRoomsCapacity.length; roomIndex++) {
        if (roomEmptySeats[roomIndex] !== 0) {
          if (roomEmptySeats[roomIndex] >= courseCapacityNotFilled[courseIndex]) {
            roomEmptySeats[roomIndex] -= courseCapacityNotFilled[courseIndex];
            roomCoursesCapacity[roomIndex][courseIndex] += courseCapacityNotFilled[courseIndex];
            courseCapacityNotFilled[courseIndex] = 0;
          } else {
            courseCapacityNotFilled[courseIndex] -= roomEmptySeats[roomIndex];
            roomCoursesCapacity[roomIndex][courseIndex] += roomEmptySeats[roomIndex];
            roomEmptySeats[roomIndex] = 0;
          }
        }
        if (courseCapacityNotFilled[courseIndex] === 0) {
          break;
        }
      }
    }
  }

  return { roomCoursesCapacity, roomCourseIDs };
}

// Example usage
const coursesCapacity = [30, 40, 25];
const utilizedRoomsCapacity = [100, 80, 120];
const result = allocateStudentsToRooms(coursesCapacity, utilizedRoomsCapacity);
console.log(result);
