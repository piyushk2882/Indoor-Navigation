import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Graph } from "@/lib/pathfinding";
import { ArrowRight, MapPin, Navigation } from "lucide-react";

interface PathInfoProps {
  path: string[];
  graph: Graph;
}

export const PathInfo = ({ path, graph }: PathInfoProps) => {
  if (path.length === 0) {
    return null;
  }

  const calculateDistance = () => {
    let total = 0;
    for (let i = 0; i < path.length - 1; i++) {
      const current = graph[path[i]];
      const next = graph[path[i + 1]];
      const dist = Math.sqrt(
        Math.pow(current.x - next.x, 2) + Math.pow(current.y - next.y, 2)
      );
      total += dist;
    }
    return (total / 10).toFixed(1); // Scale for display
  };

  const hasFloorChange = () => {
    const floors = new Set(path.map(nodeId => graph[nodeId].floor));
    return floors.size > 1;
  };

  return (
    <Card className="shadow-[var(--shadow-card)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Navigation className="w-5 h-5 text-primary" />
          Navigation Path
        </CardTitle>
        <CardDescription>
          {path.length} stops • {calculateDistance()}m estimated distance
          {hasFloorChange() && " • Multiple floors"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {path.map((nodeId, idx) => {
            const room = graph[nodeId];
            const isFirst = idx === 0;
            const isLast = idx === path.length - 1;
            const nextRoom = idx < path.length - 1 ? graph[path[idx + 1]] : null;
            const floorChange = nextRoom && nextRoom.floor !== room.floor;

            return (
              <div key={nodeId}>
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                        isFirst
                          ? "bg-primary text-primary-foreground"
                          : isLast
                          ? "bg-accent text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {idx + 1}
                    </div>
                    {!isLast && (
                      <div className="w-0.5 h-8 bg-border my-1" />
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="font-medium text-sm">{room.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {room.floor === 0 ? "Ground Floor" : `Floor ${room.floor}`}
                    </div>
                  </div>
                  {isFirst && (
                    <Badge variant="outline" className="bg-primary/10">
                      Start
                    </Badge>
                  )}
                  {isLast && (
                    <Badge variant="outline" className="bg-accent/10">
                      End
                    </Badge>
                  )}
                </div>
                {floorChange && (
                  <div className="ml-14 mt-2 text-xs text-accent font-medium flex items-center gap-1">
                    <ArrowRight className="w-3 h-3" />
                    Take stairs to {nextRoom.floor === 0 ? "Ground Floor" : `Floor ${nextRoom.floor}`}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
