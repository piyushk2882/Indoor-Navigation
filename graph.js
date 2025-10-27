// Graph data structure and Dijkstra's algorithm implementation

class Graph {
  constructor() {
    this.nodes = new Map();
    this.adjacencyList = new Map();
  }

  // Add a node to the graph
  addNode(nodeId, nodeData) {
    this.nodes.set(nodeId, nodeData);
    if (!this.adjacencyList.has(nodeId)) {
      this.adjacencyList.set(nodeId, []);
    }
  }

  // Add an edge between two nodes (bidirectional)
  addEdge(from, to, distance) {
    if (!this.adjacencyList.has(from)) {
      this.adjacencyList.set(from, []);
    }
    if (!this.adjacencyList.has(to)) {
      this.adjacencyList.set(to, []);
    }

    this.adjacencyList.get(from).push({ node: to, distance });
    this.adjacencyList.get(to).push({ node: from, distance });
  }

  // Dijkstra's algorithm to find shortest path
  findShortestPath(startId, endId) {
    const distances = new Map();
    const previous = new Map();
    const unvisited = new Set();

    // Initialize distances
    for (let nodeId of this.nodes.keys()) {
      distances.set(nodeId, Infinity);
      previous.set(nodeId, null);
      unvisited.add(nodeId);
    }
    distances.set(startId, 0);

    while (unvisited.size > 0) {
      // Find node with minimum distance
      let currentNode = null;
      let minDistance = Infinity;

      for (let nodeId of unvisited) {
        if (distances.get(nodeId) < minDistance) {
          minDistance = distances.get(nodeId);
          currentNode = nodeId;
        }
      }

      if (currentNode === null || minDistance === Infinity) {
        break; // No path exists
      }

      if (currentNode === endId) {
        break; // Reached destination
      }

      unvisited.delete(currentNode);

      // Update distances to neighbors
      const neighbors = this.adjacencyList.get(currentNode) || [];
      for (let neighbor of neighbors) {
        if (unvisited.has(neighbor.node)) {
          const newDistance = distances.get(currentNode) + neighbor.distance;
          if (newDistance < distances.get(neighbor.node)) {
            distances.set(neighbor.node, newDistance);
            previous.set(neighbor.node, currentNode);
          }
        }
      }
    }

    // Reconstruct path
    const path = [];
    let current = endId;

    if (previous.get(current) === null && current !== startId) {
      return null; // No path exists
    }

    while (current !== null) {
      path.unshift(current);
      current = previous.get(current);
    }

    return {
      path: path,
      distance: distances.get(endId),
      nodes: path.map(id => this.nodes.get(id))
    };
  }

  // Get all room nodes (excluding corridors and stairs)
  getRoomNodes() {
    const rooms = [];
    for (let [id, node] of this.nodes) {
      if (node.type === 'room' || node.type === 'entrance') {
        rooms.push({ id, ...node });
      }
    }
    return rooms.sort((a, b) => a.name.localeCompare(b.name));
  }
}

// Export Graph class
window.Graph = Graph;