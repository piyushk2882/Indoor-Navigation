// Graph node structure
export interface GraphNode {
  id: string;
  name: string;
  floor: number;
  x: number;
  y: number;
  connections: string[];
}

// Graph structure
export interface Graph {
  [key: string]: GraphNode;
}

// Dijkstra's algorithm implementation
export function dijkstra(graph: Graph, start: string, end: string): string[] {
  const distances: { [key: string]: number } = {};
  const previous: { [key: string]: string | null } = {};
  const unvisited = new Set<string>();

  // Initialize
  for (const nodeId in graph) {
    distances[nodeId] = Infinity;
    previous[nodeId] = null;
    unvisited.add(nodeId);
  }
  distances[start] = 0;

  while (unvisited.size > 0) {
    // Find unvisited node with minimum distance
    let current: string | null = null;
    let minDistance = Infinity;
    
    for (const nodeId of unvisited) {
      if (distances[nodeId] < minDistance) {
        minDistance = distances[nodeId];
        current = nodeId;
      }
    }

    if (current === null || current === end) break;

    unvisited.delete(current);

    // Update distances to neighbors
    const currentNode = graph[current];
    for (const neighborId of currentNode.connections) {
      if (!unvisited.has(neighborId)) continue;

      const neighbor = graph[neighborId];
      // Calculate Euclidean distance
      const distance = Math.sqrt(
        Math.pow(currentNode.x - neighbor.x, 2) + 
        Math.pow(currentNode.y - neighbor.y, 2)
      );

      const alt = distances[current] + distance;
      if (alt < distances[neighborId]) {
        distances[neighborId] = alt;
        previous[neighborId] = current;
      }
    }
  }

  // Reconstruct path
  const path: string[] = [];
  let current: string | null = end;

  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  return path.length > 1 ? path : [];
}

// Calculate path coordinates for SVG rendering
export function getPathCoordinates(graph: Graph, path: string[]): { x: number; y: number }[] {
  return path.map(nodeId => ({
    x: graph[nodeId].x,
    y: graph[nodeId].y
  }));
}
