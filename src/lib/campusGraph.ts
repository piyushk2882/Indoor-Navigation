import { Graph } from "./pathfinding";

export const campusGraph: Graph = {
  // === 🏫 Ground Floor ===
  "seminar-hall": {
    id: "seminar-hall",
    name: "Seminar Hall",
    floor: 0,
    x: 100,
    y: 80,
    connections: ["lab-04", "csaiml-03"]
  },
  "lab-04": {
    id: "lab-04",
    name: "lab 04",
    floor: 0,
    x: 250,
    y: 80,
    connections: ["lab-05"]
  },
  "lab-05": {
    id: "lab-05",
    name: "lab 05",
    floor: 0,
    x: 400,
    y: 80,
    connections: ["room-01"]
  },
  "room-01": {
    id: "room-01",
    name: "ROOM 01",
    floor: 0,
    x: 550,
    y: 80,
    connections: ["room-02", "stairs"]
  },

  // Left Wing
  "stairs-gf": {
    id: "stairs-gf",
    name: "stairs-3",
    floor: 0,
    x: 200,
    y: 420,
    connections: ["csaiml-01", "teacher-cabin-01"]
  },

  "csaiml-03": {
    id: "csaiml-03",
    name: "CSAIML 03",
    floor: 0,
    x: 100,
    y: 220,
    connections: ["csaiml-02"]
  },
  "csaiml-02": {
    id: "csaiml-02",
    name: "CSAIML 02",
    floor: 0,
    x: 100,
    y: 320,
    connections: ["csaiml-01",]
  },
  "csaiml-01": {
    id: "csaiml-01",
    name: "CSAIML 01",
    floor: 0,
    x: 100,
    y: 400,
    connections: ["gens-washroom-l", "teacher-cabin-01"]
  },
  "gens-washroom-l": {
    id: "gens-washroom-l",
    name: "GENS W2",
    floor: 0,
    x: 100,
    y: 600,
    connections: ["teacher-cabin-01", "stairs-gf-l", "teacher-cabin-02"]
  },
  "stairs-gf-l": {
    id: "stairs-gf-l",
    name: "stairs-1",
    floor: 0,
    x: 100,
    y: 660,
    connections: ["corridor-mid-l", "stairs-1f"]
  },

  // Right Wing
  "room-02": {
    id: "room-02",
    name: "ROOM 02",
    floor: 0,
    x: 550,
    y: 180,
    connections: ["stairs-gf-r", "csds-03"]
  },
  "stairs-gf-r": {
    id: "stairs-gf-r",
    name: "stairs-4",
    floor: 0,
    x: 625,
    y: 220,
    connections: ["csds-03"]
  },
  "csds-03": {
    id: "csds-03",
    name: "CSDS 03",
    floor: 0,
    x: 550,
    y: 320,
    connections: ["csds-02"]
  },
  "csds-02": {
    id: "csds-02",
    name: "CSDS 02",
    floor: 0,
    x: 550,
    y: 420,
    connections: ["ladies-washroom-r", "lab-06"]
  },
  "ladies-washroom-r": {
    id: "ladies-washroom-r",
    name: "LADIES W2",
    floor: 0,
    x: 550,
    y: 520,
    connections: ["lab-06"]
  },
  "gens-washroom-r": {
    id: "gens-washroom-r",
    name: "GENS W1",
    floor: 0,
    x: 550,
    y: 600,
    connections: []
  },
  "room-03": {
    id: "room-03",
    name: "ROOM 03",
    floor: 0,
    x: 500,
    y: 668,
    connections: ["gens-washroom-r", "stairs-gf-b"]
  },
  "ladies-washroom-2": {
    id: "ladies-washroom-2",
    name: "LADIES W1",
    floor: 0,
    x: 605,
    y: 600,
    connections: ["room-03"]
    // Middle Corridor & Rooms
  },

  "teacher-cabin-01": {
    id: "teacher-cabin-01",
    name: "TEACHER CAB 01",
    floor: 0,
    x: 200,
    y: 580,
    connections: ["gens-washroom-l", "csaiml-01"]
  },
  "lab-06": {
    id: "lab-06",
    name: "lab 06",
    floor: 0,
    x: 450,
    y: 580,
    connections: ["teacher-cabin-01"]
  },
  "teacher-cabin-02": {
    id: "teacher-cabin-02",
    name: "TEACHER CAB 02",
    floor: 0,
    x: 200,
    y: 680,
    connections: ["corridor-bottom", "hod-cabin", "lab-01", "stairs-gf-l"]
  },
  "hod-cabin": {
    id: "hod-cabin",
    name: "HOD CABIN",
    floor: 0,
    x: 325,
    y: 680,
    connections: ["corridor-bottom", "teacher-cabin-03"]
  },
  "teacher-cabin-03": {
    id: "teacher-cabin-03",
    name: "TEACHER CAB 03",
    floor: 0,
    x: 450,
    y: 680,
    connections: ["corridor-bottom", "room-03"]
  },

  // Bottom Corridor & Rooms
  "corridor-bottom": {
    id: "corridor-bottom",
    name: "Corridor",
    floor: 0,
    x: 350,
    y: 750,
    connections: ["hod-cabin", "teacher-cabin-03", "lab-01", "lab-02", "lab-03", "stairs-gf-b"]
  },
  "exit": {
    id: "exit",
    name: "exit",
    floor: 0,
    x: 120,
    y: 850,
    connections: ["lab-01"]
  },
  "lab-01": {
    id: "lab-01",
    name: "lab 01",
    floor: 0,
    x: 200,
    y: 810,
    connections: ["corridor-bottom", "lab-02"]
  },
  "lab-02": {
    id: "lab-02",
    name: "lab 02",
    floor: 0,
    x: 325,
    y: 810,
    connections: ["corridor-bottom", "lab-03"]
  },
  "lab-03": {
    id: "lab-03",
    name: "lab 03",
    floor: 0,
    x: 450,
    y: 810,
    connections: ["corridor-bottom", "stairs-gf-b"]
  },
  "stairs-gf-b": {
    id: "stairs-gf-b",
    name: "stairs-2",
    floor: 0,
    x: 575,
    y: 810,
    connections: ["corridor-bottom", "stairs-1f"]
  },

  // First Floor (floor: 1)
  "stairs-1f": {
    id: "stairs-1f",
    name: "Stairs (First Floor)",
    floor: 1,
    x: 450,
    y: 150,
    connections: ["stairs-gf", "corridor-1f-1", "corridor-1f-2"]
  },
  "corridor-1f-1": {
    id: "corridor-1f-1",
    name: "First Floor Corridor 1",
    floor: 1,
    x: 300,
    y: 150,
    connections: ["stairs-1f", "class-201", "class-202", "faculty-room"]
  },
  "class-201": {
    id: "class-201",
    name: "Classroom 201",
    floor: 1,
    x: 200,
    y: 100,
    connections: ["corridor-1f-1"]
  },
  "class-202": {
    id: "class-202",
    name: "Classroom 202",
    floor: 1,
    x: 200,
    y: 200,
    connections: ["corridor-1f-1"]
  },
  "faculty-room": {
    id: "faculty-room",
    name: "Faculty Room",
    floor: 1,
    x: 300,
    y: 50,
    connections: ["corridor-1f-1"]
  },
  "corridor-1f-2": {
    id: "corridor-1f-2",
    name: "First Floor Corridor 2",
    floor: 1,
    x: 550,
    y: 150,
    connections: ["stairs-1f", "class-203", "class-204", "seminar-hall"]
  },
  "class-203": {
    id: "class-203",
    name: "Classroom 203",
    floor: 1,
    x: 650,
    y: 100,
    connections: ["corridor-1f-2"]
  },
  "class-204": {
    id: "class-204",
    name: "Classroom 204",
    floor: 1,
    x: 650,
    y: 200,
    connections: ["corridor-1f-2"]
  },
  "seminar-hall-02": {
    id: "seminar-hall-02",
    name: "Seminar Hall 02",
    floor: 1,
    x: 550,
    y: 50,
    connections: ["corridor-1f-2"]
  }
};

// Get all rooms grouped by floor for easier UI rendering
export function getRoomsByFloor(): { floor: number; rooms: typeof campusGraph[string][] }[] {
  const floorMap = new Map<number, typeof campusGraph[string][]>();

  Object.values(campusGraph).forEach(room => {
    if (!floorMap.has(room.floor)) {
      floorMap.set(room.floor, []);
    }
    floorMap.get(room.floor)!.push(room);
  });

  return Array.from(floorMap.entries())
    .sort(([a], [b]) => a - b)
    .map(([floor, rooms]) => ({
      floor,
      rooms: rooms.sort((a, b) => a.name.localeCompare(b.name))
    }));
}

// Get floor name
export function getFloorName(floor: number): string {
  if (floor === 0) return "Ground Floor";
  if (floor === 1) return "First Floor";
  return `Floor ${floor}`;
}
