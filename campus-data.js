// Campus floor plan data structure
// Each node represents a room or corridor junction
// Edges represent connections with distances

const campusData = {
  // Node definitions: rooms and corridor junctions
  nodes: {
    'seminar-hall': {
      id: 'seminar-hall',
      name: 'Seminar Hall',
      floor: 0,
      x: 100,
      y: 80,
      type: 'room'
    },
    'lab-04': {
      id: 'lab-04',
      name: 'lab 04',
      floor: 0,
      x: 250,
      y: 80,
      type: 'room'
    },
    'lab-05': {
      id: 'lab-05',
      name: 'lab 05',
      floor: 0,
      x: 400,
      y: 80,
      type: 'room'
    },
    'room-01': {
      id: 'room-01',
      name: 'ROOM 01',
      floor: 0,
      x: 550,
      y: 80,
      type: 'room'
    },
    'stairs-gf': {
      id: 'stairs-gf',
      name: 'stairs-3',
      floor: 0,
      x: 200,
      y: 420,
      type: 'stairs'
    },
    'csaiml-03': {
      id: 'csaiml-03',
      name: 'CSAIML 03',
      floor: 0,
      x: 100,
      y: 220,
      type: 'room'
    },
    'csaiml-02': {
      id: 'csaiml-02',
      name: 'CSAIML 02',
      floor: 0,
      x: 100,
      y: 320,
      type: 'room'
    },
    'csaiml-01': {
      id: 'csaiml-01',
      name: 'CSAIML 01',
      floor: 0,
      x: 100,
      y: 400,
      type: 'room'
    },
    'Gents-washroom-l': {
      id: 'Gents-washroom-l',
      name: 'Gents W2',
      floor: 0,
      x: 100,
      y: 600,
      type: 'room'
    },
    'stairs-gf-l': {
      id: 'stairs-gf-l',
      name: 'stairs-1',
      floor: 0,
      x: 100,
      y: 660,
      type: 'stairs'
    },
    'room-02': {
      id: 'room-02',
      name: 'ROOM 02',
      floor: 0,
      x: 550,
      y: 180,
      type: 'room'
    },
    'stairs-gf-r': {
      id: 'stairs-gf-r',
      name: 'stairs-4',
      floor: 0,
      x: 625,
      y: 220,
      type: 'stairs'
    },
    'csds-03': {
      id: 'csds-03',
      name: 'CSDS 03',
      floor: 0,
      x: 550,
      y: 320,
      type: 'room'
    },
    'csds-02': {
      id: 'csds-02',
      name: 'CSDS 02',
      floor: 0,
      x: 550,
      y: 420,
      type: 'room'
    },
    'ladies-washroom-r': {
      id: 'ladies-washroom-r',
      name: 'LADIES W2',
      floor: 0,
      x: 550,
      y: 520,
      type: 'room'
    },
    'Gents-washroom-r': {
      id: 'Gents-washroom-r',
      name: 'Gents W1',
      floor: 0,
      x: 550,
      y: 600,
      type: 'room'
    },
    'room-03': {
      id: 'room-03',
      name: 'ROOM 03',
      floor: 0,
      x: 510,
      y: 668,
      type: 'room'
    },
    'ladies-washroom-2': {
      id: 'ladies-washroom-2',
      name: 'LADIES W1',
      floor: 0,
      x: 615,
      y: 600,
      type: 'room'
    },
    'teacher-cabin-01': {
      id: 'teacher-cabin-01',
      name: 'TEACHER CAB 01',
      floor: 0,
      x: 200,
      y: 580,
      type: 'room'
    },
    'lab-06': {
      id: 'lab-06',
      name: 'lab 06',
      floor: 0,
      x: 450,
      y: 580,
      type: 'room'
    },
    'teacher-cabin-02': {
      id: 'teacher-cabin-02',
      name: 'TEACHER CAB 02',
      floor: 0,
      x: 200,
      y: 680,
      type: 'room'
    },
    'hod-cabin': {
      id: 'hod-cabin',
      name: 'HOD CABIN',
      floor: 0,
      x: 325,
      y: 680,
      type: 'room'
    },
    'teacher-cabin-03': {
      id: 'teacher-cabin-03',
      name: 'TEACHER 3',
      floor: 0,
      x: 450,
      y: 680,
      type: 'room'
    },
    'corridor-bottom': {
      id: 'corridor-bottom',
      name: 'Corridor',
      floor: 0,
      x: 350,
      y: 750,
      type: 'corridor'
    },
    exit: {
      id: 'exit',
      name: 'exit',
      floor: 0,
      x: 120,
      y: 850,
      type: 'entrance'
    },
    'lab-01': {
      id: 'lab-01',
      name: 'lab 01',
      floor: 0,
      x: 200,
      y: 810,
      type: 'room'
    },
    'lab-02': {
      id: 'lab-02',
      name: 'lab 02',
      floor: 0,
      x: 325,
      y: 810,
      type: 'room'
    },
    'lab-03': {
      id: 'lab-03',
      name: 'lab 03',
      floor: 0,
      x: 450,
      y: 810,
      type: 'room'
    },
    'stairs-gf-b': {
      id: 'stairs-gf-b',
      name: 'stairs-2',
      floor: 0,
      x: 575,
      y: 810,
      type: 'stairs'
    },
    'stairs-1f': {
      id: 'stairs-1f',
      name: 'Stairs (First Floor)',
      floor: 1,
      x: 450,
      y: 150,
      type: 'stairs'
    },
    'corridor-1f-1': {
      id: 'corridor-1f-1',
      name: 'First Floor Corridor 1',
      floor: 1,
      x: 300,
      y: 150,
      type: 'corridor'
    },
    'class-201': {
      id: 'class-201',
      name: 'Classroom 201',
      floor: 1,
      x: 200,
      y: 100,
      type: 'room'
    },
    'class-202': {
      id: 'class-202',
      name: 'Classroom 202',
      floor: 1,
      x: 200,
      y: 200,
      type: 'room'
    },
    'faculty-room': {
      id: 'faculty-room',
      name: 'Faculty Room',
      floor: 1,
      x: 300,
      y: 50,
      type: 'room'

    },
    'corridor-1f-2': {
      id: 'corridor-1f-2',
      name: 'First Floor Corridor 2',
      floor: 1,
      x: 550,
      y: 150,
      type: 'corridor'
    },
    'class-203': {
      id: 'class-203',
      name: 'Classroom 203',
      floor: 1,
      x: 650,
      y: 100,
      type: 'room'
    },
    'class-204': {
      id: 'class-204',
      name: 'Classroom 204',
      floor: 1,
      x: 650,
      y: 200,
      type: 'room'
    },
    'seminar-hall-02': {
      id: 'seminar-hall-02',
      name: 'Seminar Hall 02',
      floor: 1,
      x: 550,
      y: 50,
      type: 'room'
    }
  },

  // Edge definitions: connections between nodes with distances
  edges: [
    { from: 'seminar-hall', to: 'lab-04', distance: 150 },
    { from: 'seminar-hall', to: 'csaiml-03', distance: 140 },
    { from: 'lab-04', to: 'lab-05', distance: 150 },
    { from: 'lab-05', to: 'room-01', distance: 150 },
    { from: 'room-01', to: 'room-02', distance: 100 },// Corrected from "stairs"
    { from: 'stairs-gf', to: 'csaiml-01', distance: 102 },
    { from: 'stairs-gf', to: 'teacher-cabin-01', distance: 160 },
    { from: 'csaiml-03', to: 'csaiml-02', distance: 100 },
    { from: 'csaiml-02', to: 'csaiml-01', distance: 80 },
    { from: 'csaiml-01', to: 'Gents-washroom-l', distance: 200 },
    { from: 'csaiml-01', to: 'teacher-cabin-01', distance: 206 },
    { from: 'Gents-washroom-l', to: 'teacher-cabin-01', distance: 102 },
    { from: 'Gents-washroom-l', to: 'stairs-gf-l', distance: 60 },
    { from: 'Gents-washroom-l', to: 'teacher-cabin-02', distance: 128 },
    { from: 'stairs-gf-l', to: 'corridor-mid-l', distance: 0 }, // 'corridor-mid-l' not in nodes, distance 0
    { from: 'stairs-gf-l', to: 'stairs-1f', distance: 593 },
    { from: 'room-02', to: 'stairs-gf-r', distance: 85 },
    { from: 'room-02', to: 'csds-03', distance: 140 },
    { from: 'stairs-gf-r', to: 'csds-03', distance: 125 },
    { from: 'csds-03', to: 'csds-02', distance: 100 },
    { from: 'csds-02', to: 'ladies-washroom-r', distance: 100 },
    { from: 'csds-02', to: 'lab-06', distance: 189 },
    { from: 'ladies-washroom-r', to: 'lab-06', distance: 128 },
    { from: 'room-03', to: 'Gents-washroom-r', distance: 82 },
    { from: 'room-03', to: 'stairs-gf-b', distance: 149 },
    { from: 'ladies-washroom-2', to: 'room-03', distance: 125 },
    { from: 'lab-06', to: 'teacher-cabin-01', distance: 250 },
    { from: 'teacher-cabin-02', to: 'corridor-bottom', distance: 161 },
    { from: 'teacher-cabin-02', to: 'hod-cabin', distance: 125 },
    { from: 'teacher-cabin-02', to: 'lab-01', distance: 130 },
    { from: 'hod-cabin', to: 'corridor-bottom', distance: 74 },
    { from: 'hod-cabin', to: 'teacher-cabin-03', distance: 125 },
    { from: 'teacher-cabin-03', to: 'corridor-bottom', distance: 122 },
    { from: 'teacher-cabin-03', to: 'room-03', distance: 51 },
    { from: 'corridor-bottom', to: 'lab-01', distance: 158 },
    { from: 'corridor-bottom', to: 'lab-02', distance: 65 },
    { from: 'corridor-bottom', to: 'lab-03', distance: 117 },
    { from: 'corridor-bottom', to: 'stairs-gf-b', distance: 234 },
    { from: 'exit', to: 'lab-01', distance: 94 },
    { from: 'lab-01', to: 'lab-02', distance: 125 },
    { from: 'lab-02', to: 'lab-03', distance: 125 },
    { from: 'lab-03', to: 'stairs-gf-b', distance: 125 },
    { from: 'stairs-gf-b', to: 'stairs-1f', distance: 672 },
    { from: 'stairs-1f', to: 'corridor-1f-1', distance: 150 },
    { from: 'stairs-1f', to: 'corridor-1f-2', distance: 100 },
    { from: 'corridor-1f-1', to: 'class-201', distance: 112 },
    { from: 'corridor-1f-1', to: 'class-202', distance: 112 },
    { from: 'corridor-1f-1', to: 'faculty-room', distance: 100 },
    { from: 'corridor-1f-2', to: 'class-203', distance: 112 },
    { from: 'corridor-1f-2', to: 'class-204', distance: 112 },
    { from: 'corridor-1f-2', to: 'seminar-hall', distance: 0 }, // 'seminar-hall' not in nodes, distance 0
    { from: 'seminar-hall-02', to: 'corridor-1f-2', distance: 100 }
  ]
};

// Export for use in other modules
window.campusData = campusData;