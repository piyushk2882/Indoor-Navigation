// SVG manipulation, path drawing, and zoom/pan functionality

class SVGHandler {
  constructor(svgElement) {
    this.svg = svgElement;
    this.viewBox = { x: 0, y: 0, width: 800, height: 600 };
    this.scale = 1;
    this.isPanning = false;
    this.startPoint = { x: 0, y: 0 };
    this.currentFloor = 0;
    this.initialDistance = 0;
    this.initialScale = 1;

    this.initializeViewBox();
    this.setupZoomPan();
  }

  initializeViewBox() {
    this.svg.setAttribute('viewBox', `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.width} ${this.viewBox.height}`);
  }

  setupZoomPan() {
    // Mouse wheel zoom
    this.svg.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? 1.1 : 0.9;
      this.zoom(delta, e.clientX, e.clientY);
    });

    // Pan functionality
    this.svg.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.isPanning = true;
        this.startPoint = this.getMousePosition(e);
      }
    });

    this.svg.addEventListener('mousemove', (e) => {
      if (this.isPanning) {
        const currentPoint = this.getMousePosition(e);
        const dx = (this.startPoint.x - currentPoint.x) * this.scale;
        const dy = (this.startPoint.y - currentPoint.y) * this.scale;

        this.viewBox.x += dx;
        this.viewBox.y += dy;
        this.updateViewBox();
        this.startPoint = currentPoint;
      }
    });

    this.svg.addEventListener('mouseup', () => {
      this.isPanning = false;
    });

    this.svg.addEventListener('mouseleave', () => {
      this.isPanning = false;
    });

    // Touch support for mobile
    this.svg.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.isPanning = true;
        this.startPoint = this.getTouchPosition(e.touches[0]);
      } else if (e.touches.length === 2) {
        // Pinch to zoom start
        this.isPanning = false;
        this.initialDistance = this.getTouchDistance(e.touches[0], e.touches[1]);
        this.initialScale = this.scale;
      }
    });

    this.svg.addEventListener('touchmove', (e) => {
      if (this.isPanning && e.touches.length === 1) {
        e.preventDefault();
        const currentPoint = this.getTouchPosition(e.touches[0]);
        const dx = (this.startPoint.x - currentPoint.x) * this.scale;
        const dy = (this.startPoint.y - currentPoint.y) * this.scale;

        this.viewBox.x += dx;
        this.viewBox.y += dy;
        this.updateViewBox();
        this.startPoint = currentPoint;
      } else if (e.touches.length === 2) {
        e.preventDefault();
        // Pinch to zoom
        const currentDistance = this.getTouchDistance(e.touches[0], e.touches[1]);
        const scaleChange = this.initialDistance / currentDistance;
        const newScale = this.initialScale * scaleChange;

        // Calculate center point of pinch
        const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2;

        this.zoomToScale(newScale, centerX, centerY);
      }
    });

    this.svg.addEventListener('touchend', (e) => {
      if (e.touches.length === 0) {
        this.isPanning = false;
        this.initialDistance = 0;
        this.initialScale = this.scale;
      }
    });
  }

  zoom(delta, clientX, clientY) {
    const rect = this.svg.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const svgX = this.viewBox.x + (x / rect.width) * this.viewBox.width;
    const svgY = this.viewBox.y + (y / rect.height) * this.viewBox.height;

    this.scale *= delta;
    this.scale = Math.max(0.5, Math.min(3, this.scale));

    this.viewBox.width = 800 * this.scale;
    this.viewBox.height = 600 * this.scale;

    this.viewBox.x = svgX - (x / rect.width) * this.viewBox.width;
    this.viewBox.y = svgY - (y / rect.height) * this.viewBox.height;

    this.updateViewBox();
  }

  updateViewBox() {
    this.svg.setAttribute('viewBox',
      `${this.viewBox.x} ${this.viewBox.y} ${this.viewBox.width} ${this.viewBox.height}`);
  }

  getMousePosition(e) {
    const rect = this.svg.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  getTouchPosition(touch) {
    const rect = this.svg.getBoundingClientRect();
    return {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    };
  }

  getTouchDistance(touch1, touch2) {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  zoomToScale(newScale, centerX, centerY) {
    const rect = this.svg.getBoundingClientRect();
    const x = centerX - rect.left;
    const y = centerY - rect.top;

    const svgX = this.viewBox.x + (x / rect.width) * this.viewBox.width;
    const svgY = this.viewBox.y + (y / rect.height) * this.viewBox.height;

    this.scale = Math.max(0.5, Math.min(3, newScale));

    this.viewBox.width = 800 * this.scale;
    this.viewBox.height = 600 * this.scale;

    this.viewBox.x = svgX - (x / rect.width) * this.viewBox.width;
    this.viewBox.y = svgY - (y / rect.height) * this.viewBox.height;

    this.updateViewBox();
  }

  // Draw floor plan
  drawFloorPlan(nodes, edges, floor) {
    this.currentFloor = floor;
    this.clearSVG();

    // Create groups for better organization
    const corridorGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    corridorGroup.id = 'corridors';

    const roomGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    roomGroup.id = 'rooms';

    const labelGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    labelGroup.id = 'labels';

    // Draw edges (corridors)
    edges.forEach(edge => {
      const fromNode = nodes.get(edge.from);
      const toNode = nodes.get(edge.to);

      if (fromNode && toNode && fromNode.floor === floor && toNode.floor === floor) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fromNode.x);
        line.setAttribute('y1', fromNode.y);
        line.setAttribute('x2', toNode.x);
        line.setAttribute('y2', toNode.y);
        line.setAttribute('class', 'corridor-line');
        corridorGroup.appendChild(line);
      }
    });

    // Draw nodes (rooms)
    nodes.forEach((node, id) => {
      if (node.floor === floor) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', node.type === 'room' || node.type === 'entrance' ? 25 : 12);
        circle.setAttribute('class', `node node-${node.type}`);
        circle.setAttribute('data-node-id', id);
        roomGroup.appendChild(circle);

        // Add label
        if (node.type === 'room' || node.type === 'entrance') {
          const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          text.setAttribute('x', node.x);
          text.setAttribute('y', node.y - 35);
          text.setAttribute('class', 'node-label');
          text.setAttribute('text-anchor', 'middle');
          text.textContent = node.name.split(' - ')[0];
          labelGroup.appendChild(text);
        }
      }
    });

    this.svg.appendChild(corridorGroup);
    this.svg.appendChild(roomGroup);
    this.svg.appendChild(labelGroup);
  }

  // Draw path with animation
  drawPath(pathNodes) {
    // Remove existing path
    const existingPath = this.svg.querySelector('#navigation-path');
    if (existingPath) {
      existingPath.remove();
    }

    if (!pathNodes || pathNodes.length < 2) return;

    const pathGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    pathGroup.id = 'navigation-path';

    // Draw path segments
    for (let i = 0; i < pathNodes.length - 1; i++) {
      const from = pathNodes[i];
      const to = pathNodes[i + 1];

      if (from.floor === to.floor && from.floor === this.currentFloor) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', from.x);
        line.setAttribute('y1', from.y);
        line.setAttribute('x2', to.x);
        line.setAttribute('y2', to.y);
        line.setAttribute('class', 'path-line');
        line.style.strokeDasharray = '1000';
        line.style.strokeDashoffset = '1000';
        line.style.animation = `drawPath 0.5s ease-out ${i * 0.2}s forwards`;
        pathGroup.appendChild(line);
      }
    }

    // Highlight nodes in path
    pathNodes.forEach((node, index) => {
      if (node.floor === this.currentFloor) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', 8);
        circle.setAttribute('class', index === 0 ? 'path-start' :
          index === pathNodes.length - 1 ? 'path-end' : 'path-node');
        circle.style.opacity = '0';
        circle.style.animation = `fadeIn 0.3s ease-out ${index * 0.2}s forwards`;
        pathGroup.appendChild(circle);
      }
    });

    this.svg.appendChild(pathGroup);
  }

  clearPath() {
    const existingPath = this.svg.querySelector('#navigation-path');
    if (existingPath) {
      existingPath.remove();
    }
  }

  clearSVG() {
    while (this.svg.firstChild) {
      this.svg.removeChild(this.svg.firstChild);
    }
  }

  switchFloor(floor) {
    this.currentFloor = floor;
  }
}

// Export SVGHandler class
window.SVGHandler = SVGHandler;