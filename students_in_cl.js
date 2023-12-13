function allocateRooms(utilizedRooms, coursesCapacity) {
    let utilizedRoomsCapacity = {};
    let roomCoursesCapacity = {};
    let roomEmptySeats = {};
    let courseCapacityNotFilled = {};
  
    // Initialize utilizedRoomsCapacity
    utilizedRooms.forEach((room) => {
      utilizedRoomsCapacity[room] = 0;
    });
  
    // Step 1
    utilizedRooms.forEach((room) => {
      roomCoursesCapacity[room] = [];
      let totalRooms = utilizedRooms.length;
  
      for (let course in coursesCapacity) {
        let j = Math.floor(coursesCapacity[course] / totalRooms);
  
        if (utilizedRoomsCapacity[room] >= j) {
          roomCoursesCapacity[room].push(j);
          utilizedRoomsCapacity[room] -= j;
        } else {
          if (utilizedRoomsCapacity[room] >= 0) {
            roomCoursesCapacity[room].push(utilizedRoomsCapacity[room]);
            utilizedRoomsCapacity[room] = 0;
          } else {
            roomCoursesCapacity[room].push(0);
          }
        }
      }
    });
  
    // Step 2
    utilizedRooms.forEach((room) => {
      if (roomCoursesCapacity[room].reduce((sum, value) => sum + value, 0) >= utilizedRoomsCapacity[room]) {
        roomEmptySeats[room] = 0;
      } else {
        let difference = utilizedRoomsCapacity[room] - roomCoursesCapacity[room].reduce((sum, value) => sum + value, 0);
        roomEmptySeats[room] = difference;
      }
    });
  
    // Step 3
    for (let course in coursesCapacity) {
      if (coursesCapacity[course] === utilizedRooms.reduce((sum, room) => sum + roomCoursesCapacity[room][course], 0)) {
        courseCapacityNotFilled[course] = 0;
      } else {
        let difference = coursesCapacity[course] - utilizedRooms.reduce((sum, room) => sum + roomCoursesCapacity[room][course], 0);
        courseCapacityNotFilled[course] = difference;
      }
    }
  
    // Step 4
    for (let course in coursesCapacity) {
      if (courseCapacityNotFilled[course] !== 0) {
        for (let room of utilizedRooms) {
          if (roomEmptySeats[room] !== 0) {
            if (roomEmptySeats[room] >= courseCapacityNotFilled[course]) {
              roomEmptySeats[room] -= courseCapacityNotFilled[course];
              roomCoursesCapacity[room][course] += courseCapacityNotFilled[course];
              courseCapacityNotFilled[course] = 0;
            } else {
              courseCapacityNotFilled[course] -= roomEmptySeats[room];
              roomCoursesCapacity[room][course] += roomEmptySeats[room];
              roomEmptySeats[room] = 0;
            }
          }
          if (courseCapacityNotFilled[course] === 0) {
            break;
          }
        }
      }
    }
  
    // Remove NaN values
    roomCoursesCapacity = removeNaNValues(roomCoursesCapacity);
    roomEmptySeats = removeNaNValues(roomEmptySeats);
    courseCapacityNotFilled = removeNaNValues(courseCapacityNotFilled);
  
    return {
      roomCoursesCapacity,
      roomEmptySeats,
      courseCapacityNotFilled,
    };
  }
  
  // Helper function to remove NaN values from objects
  function removeNaNValues(obj) {
    let result = {};
    for (let key in obj) {
      result[key] = obj[key].map(value => isNaN(value) ? 0 : value);
    }
    return result;
  }
  
  // Example usage:
  const utilizedRooms = ['Room1', 'Room2', 'Room3'];
  const coursesCapacity = {
    Course1: 30,
    Course2: 20,
    Course3: 25,
  };
  
  const result = allocateRooms(utilizedRooms, coursesCapacity);
  console.log(result.roomCoursesCapacity);
  console.log(result.roomEmptySeats);
  console.log(result.courseCapacityNotFilled);
  