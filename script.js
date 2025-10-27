// Main application logic and initialization

let graph;
let svgHandler;
let currentPath = null;

// Initialize application
document.addEventListener('DOMContentLoaded', function () {
  initializeGraph();
  initializeSVG();
  initializeUI();

  // Draw initial floor plan (Ground Floor)
  drawCurrentFloor();
});

// Initialize graph with campus data
function initializeGraph() {
  graph = new Graph();

  // Add nodes
  for (let [id, node] of Object.entries(campusData.nodes)) {
    graph.addNode(id, node);
  }

  // Add edges
  campusData.edges.forEach(edge => {
    graph.addEdge(edge.from, edge.to, edge.distance);
  });
}

// Initialize SVG handler
function initializeSVG() {
  const svgElement = document.getElementById('floor-map');
  svgHandler = new SVGHandler(svgElement);
}

// Initialize UI components
function initializeUI() {
  populateRoomSelectors();

  // Find path button
  document.getElementById('find-path-btn').addEventListener('click', findAndDrawPath);

  // Clear path button
  document.getElementById('clear-path-btn').addEventListener('click', clearPath);

  // Floor switcher
  document.getElementById('floor-0').addEventListener('click', () => switchFloor(0));
  document.getElementById('floor-1').addEventListener('click', () => switchFloor(1));

  // Reset view button
  document.getElementById('reset-view-btn').addEventListener('click', resetView);
}

// Populate room selector dropdowns
function populateRoomSelectors() {
  const rooms = graph.getRoomNodes();
  const sourceSelect = document.getElementById('source-room');
  const destSelect = document.getElementById('dest-room');

  rooms.forEach(room => {
    const option1 = document.createElement('option');
    option1.value = room.id;
    option1.textContent = room.name;
    sourceSelect.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = room.id;
    option2.textContent = room.name;
    destSelect.appendChild(option2);
  });

  // Set default values
  if (rooms.length >= 2) {
    sourceSelect.value = rooms[0].id;
    destSelect.value = rooms[rooms.length - 1].id;
  }
}

// Find and draw shortest path
function findAndDrawPath() {
  const sourceId = document.getElementById('source-room').value;
  const destId = document.getElementById('dest-room').value;

  if (!sourceId || !destId) {
    showMessage('Please select both source and destination rooms', 'error');
    return;
  }

  if (sourceId === destId) {
    showMessage('Source and destination cannot be the same', 'error');
    return;
  }

  const result = graph.findShortestPath(sourceId, destId);

  if (!result) {
    showMessage('No path found between selected rooms', 'error');
    return;
  }

  currentPath = result;

  // Draw path on current floor
  svgHandler.drawPath(result.nodes);

  // Show path info
  const pathInfo = document.getElementById('path-info');
  pathInfo.innerHTML = `
        <div class="path-details">
            <div class="path-stat">
                <span class="stat-label">Distance:</span>
                <span class="stat-value">${result.distance.toFixed(1)} units</span>
            </div>
            <div class="path-stat">
                <span class="stat-label">Steps:</span>
                <span class="stat-value">${result.path.length} nodes</span>
            </div>
        </div>
        <div class="path-instructions">
            <h4>Route:</h4>
            <ol>
                ${result.nodes.map((node, index) => {
    if (node.type === 'room' || node.type === 'entrance' || node.type === 'stairs') {
      return `<li>${node.name}${node.floor !== undefined ? ` (Floor ${node.floor})` : ''}</li>`;
    }
    return '';
  }).filter(item => item).join('')}
            </ol>
        </div>
    `;
  pathInfo.style.display = 'block';

  showMessage('Path found successfully!', 'success');
}

// Clear current path
function clearPath() {
  svgHandler.clearPath();
  currentPath = null;
  document.getElementById('path-info').style.display = 'none';
  showMessage('Path cleared', 'info');
}

// Switch between floors
function switchFloor(floor) {
  svgHandler.switchFloor(floor);
  drawCurrentFloor();

  // Update active button
  document.querySelectorAll('.floor-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(`floor-${floor}`).classList.add('active');

  // Redraw path if exists
  if (currentPath) {
    svgHandler.drawPath(currentPath.nodes);
  }
}

// Draw current floor plan
function drawCurrentFloor() {
  const floor = svgHandler.currentFloor;
  svgHandler.drawFloorPlan(graph.nodes, campusData.edges, floor);

  // Redraw path if exists
  if (currentPath) {
    svgHandler.drawPath(currentPath.nodes);
  }
}

// Reset view to default
function resetView() {
  svgHandler.scale = 1;
  svgHandler.viewBox = { x: 0, y: 0, width: 800, height: 600 };
  svgHandler.updateViewBox();
  showMessage('View reset', 'info');
}

// Show message to user
function showMessage(message, type = 'info') {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
  messageDiv.className = `message ${type}`;
  messageDiv.style.display = 'block';

  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 3000);
}