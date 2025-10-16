import { useMemo } from "react";
import { Graph } from "@/lib/pathfinding";

interface FloorPlanProps {
  graph: Graph;
  floor: number;
  path: string[];
  selectedSource: string | null;
  selectedDestination: string | null;
  onRoomHover: (roomId: string | null) => void;
}

export const FloorPlan = ({
  graph,
  floor,
  path,
  selectedSource,
  selectedDestination,
  onRoomHover
}: FloorPlanProps) => {
  const rooms = useMemo(() => {
    return Object.values(graph).filter(room => room.floor === floor);
  }, [graph, floor]);

  const bounds = useMemo(() => {
    if (rooms.length === 0) return { minX: 0, maxX: 800, minY: 0, maxY: 500 };

    const xs = rooms.map(r => r.x);
    const ys = rooms.map(r => r.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const padding = 50;
    return {
      minX: minX - padding,
      maxX: maxX + padding,
      minY: minY - padding,
      maxY: maxY + padding,
      width: maxX - minX + 2 * padding,
      height: maxY - minY + 2 * padding
    };
  }, [rooms]);

  const connections = useMemo(() => {
    const conns: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const processed = new Set<string>();

    rooms.forEach(room => {
      room.connections.forEach(connId => {
        const neighbor = graph[connId];
        if (neighbor && neighbor.floor === floor) {
          const key = [room.id, connId].sort().join("-");
          if (!processed.has(key)) {
            conns.push({
              x1: room.x,
              y1: room.y,
              x2: neighbor.x,
              y2: neighbor.y
            });
            processed.add(key);
          }
        }
      });
    });

    return conns;
  }, [rooms, graph, floor]);

  const pathSegments = useMemo(() => {
    const segments: { x1: number; y1: number; x2: number; y2: number }[] = [];

    for (let i = 0; i < path.length - 1; i++) {
      const current = graph[path[i]];
      const next = graph[path[i + 1]];

      if (current.floor === floor && next.floor === floor) {
        segments.push({
          x1: current.x,
          y1: current.y,
          x2: next.x,
          y2: next.y
        });
      }
    }

    return segments;
  }, [path, graph, floor]);

  const getRoomClass = (roomId: string) => {
    if (roomId === selectedSource) return "fill-primary";
    if (roomId === selectedDestination) return "fill-accent";
    if (path.includes(roomId)) return "fill-[hsl(var(--room-selected))]";
    return "fill-[hsl(var(--room-default))] hover:fill-[hsl(var(--room-hover))] transition-colors";
  };

  return (
    <div className="overflow-auto border rounded-lg" style={{ maxHeight: "600px", maxWidth: "100%" }}>
      <svg
        viewBox={`${bounds.minX} ${bounds.minY} ${bounds.width} ${bounds.height}`}
        className="w-full h-full"
        style={{ minWidth: bounds.width, minHeight: bounds.height }}
      >
        {/* Background */}
        <rect x={bounds.minX} y={bounds.minY} width={bounds.width} height={bounds.height} fill="hsl(var(--card))" />

        {/* Grid */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect x={bounds.minX} y={bounds.minY} width={bounds.width} height={bounds.height} fill="url(#grid)" />

        {/* Connection lines */}
        {connections.map((conn, idx) => (
          <line
            key={idx}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="hsl(var(--border))"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        ))}

        {/* Path highlighting */}
        {pathSegments.map((segment, idx) => (
          <g key={idx}>
            {/* Glow effect */}
            <line
              x1={segment.x1}
              y1={segment.y1}
              x2={segment.x2}
              y2={segment.y2}
              stroke="hsl(var(--path-glow))"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.3"
              className="animate-pulse-path"
            />
            {/* Main path */}
            <line
              x1={segment.x1}
              y1={segment.y1}
              x2={segment.x2}
              y2={segment.y2}
              stroke="hsl(var(--path-stroke))"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="1000"
              className="animate-path-draw"
            />
          </g>
        ))}

        {/* Rooms */}
        {rooms.map(room => (
          <g
            key={room.id}
            onMouseEnter={() => onRoomHover(room.id)}
            onMouseLeave={() => onRoomHover(null)}
            className="cursor-pointer"
          >
            <circle
              cx={room.x}
              cy={room.y}
              r="20"
              className={getRoomClass(room.id)}
              stroke="hsl(var(--border))"
              strokeWidth="2"
            />
            <text
              x={room.x}
              y={room.y + 35}
              textAnchor="middle"
              fill="hsl(var(--foreground))"
              fontSize="11"
              fontWeight="500"
            >
              {room.name}
            </text>
          </g>
        ))}

        {/* Legend */}
        <g transform="translate(650, 20)">
          <text x="0" y="0" fontSize="12" fontWeight="600" fill="hsl(var(--foreground))">
            Legend
          </text>
          <circle cx="10" cy="15" r="6" className="fill-primary" />
          <text x="20" y="19" fontSize="10" fill="hsl(var(--foreground))">Source</text>

          <circle cx="10" cy="35" r="6" className="fill-accent" />
          <text x="20" y="39" fontSize="10" fill="hsl(var(--foreground))">Destination</text>

          <line x1="5" y1="50" x2="15" y2="50" stroke="hsl(var(--path-stroke))" strokeWidth="3" />
          <text x="20" y="54" fontSize="10" fill="hsl(var(--foreground))">Path</text>
        </g>
      </svg>
    </div>
  );
};
