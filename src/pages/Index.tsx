import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FloorPlan } from "@/components/FloorPlan";
import { RoomSelector } from "@/components/RoomSelector";
import { PathInfo } from "@/components/PathInfo";
import { campusGraph, getFloorName } from "@/lib/campusGraph";
import { dijkstra } from "@/lib/pathfinding";
import { MapPin, Building2, Info } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const [sourceRoom, setSourceRoom] = useState<string>("");
  const [destinationRoom, setDestinationRoom] = useState<string>("");
  const [path, setPath] = useState<string[]>([]);
  const [currentFloor, setCurrentFloor] = useState<number>(0);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const calculatePath = () => {
    if (!sourceRoom || !destinationRoom) {
      toast.error("Please select both source and destination rooms");
      return;
    }

    if (sourceRoom === destinationRoom) {
      toast.error("Source and destination cannot be the same");
      return;
    }

    const calculatedPath = dijkstra(campusGraph, sourceRoom, destinationRoom);
    
    if (calculatedPath.length === 0) {
      toast.error("No path found between selected rooms");
      setPath([]);
    } else {
      setPath(calculatedPath);
      toast.success(`Path found! ${calculatedPath.length} stops`);
      
      // Switch to the floor of the source room
      setCurrentFloor(campusGraph[sourceRoom].floor);
    }
  };

  const clearPath = () => {
    setPath([]);
    setSourceRoom("");
    setDestinationRoom("");
    toast.info("Selection cleared");
  };

  const floors = [0, 1];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Building2 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Campus Navigator
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the shortest path between any two rooms using Dijkstra's algorithm. 
            Select your starting point and destination to see the optimal route.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <Card className="shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Navigation Controls
                </CardTitle>
                <CardDescription>
                  Select your starting location and destination
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RoomSelector
                  graph={campusGraph}
                  value={sourceRoom}
                  onValueChange={setSourceRoom}
                  label="Starting Point"
                  placeholder="Select source room"
                />
                
                <RoomSelector
                  graph={campusGraph}
                  value={destinationRoom}
                  onValueChange={setDestinationRoom}
                  label="Destination"
                  placeholder="Select destination room"
                />

                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={calculatePath} 
                    className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    disabled={!sourceRoom || !destinationRoom}
                  >
                    Find Path
                  </Button>
                  <Button 
                    onClick={clearPath} 
                    variant="outline"
                    disabled={!path.length && !sourceRoom && !destinationRoom}
                  >
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>

            {hoveredRoom && (
              <Alert className="bg-card shadow-[var(--shadow-card)]">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <div className="font-semibold">{campusGraph[hoveredRoom].name}</div>
                  <div className="text-xs text-muted-foreground">
                    {getFloorName(campusGraph[hoveredRoom].floor)}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {path.length > 0 && <PathInfo path={path} graph={campusGraph} />}
          </div>

          {/* Floor Plan */}
          <Card className="lg:col-span-2 shadow-[var(--shadow-lg)]">
            <CardHeader>
              <CardTitle>Interactive Floor Plan</CardTitle>
              <CardDescription>
                Hover over rooms for details • Path animates when found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={currentFloor.toString()} onValueChange={(v) => setCurrentFloor(Number(v))}>
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  {floors.map(floor => (
                    <TabsTrigger key={floor} value={floor.toString()}>
                      {getFloorName(floor)}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {floors.map(floor => (
                  <TabsContent key={floor} value={floor.toString()}>
                    <div className="rounded-lg border bg-card overflow-hidden">
                      <FloorPlan
                        graph={campusGraph}
                        floor={floor}
                        path={path}
                        selectedSource={sourceRoom}
                        selectedDestination={destinationRoom}
                        onRoomHover={setHoveredRoom}
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Algorithm Info */}
        <Card className="shadow-[var(--shadow-card)]">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              This navigation system uses <strong>Dijkstra's algorithm</strong> to find the shortest path between rooms. 
              Each room is a node in the graph, and hallways/connections are weighted edges based on Euclidean distance.
            </p>
            <p>
              The system is fully client-side, requiring no hardware like GPS or beacons. 
              You can easily customize the campus layout by editing the graph data structure in <code className="text-xs bg-muted px-1 py-0.5 rounded">campusGraph.ts</code>.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
