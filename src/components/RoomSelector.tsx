import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Graph } from "@/lib/pathfinding";

interface RoomSelectorProps {
  graph: Graph;
  value: string;
  onValueChange: (value: string) => void;
  label: string;
  placeholder: string;
}

export const RoomSelector = ({ graph, value, onValueChange, label, placeholder }: RoomSelectorProps) => {
  const rooms = Object.values(graph).sort((a, b) => {
    if (a.floor !== b.floor) return a.floor - b.floor;
    return a.name.localeCompare(b.name);
  });

  const getFloorLabel = (floor: number) => {
    if (floor === 0) return "Ground Floor";
    if (floor === 1) return "First Floor";
    return `Floor ${floor}`;
  };

  // Group rooms by floor
  const roomsByFloor = rooms.reduce((acc, room) => {
    const floorLabel = getFloorLabel(room.floor);
    if (!acc[floorLabel]) {
      acc[floorLabel] = [];
    }
    acc[floorLabel].push(room);
    return acc;
  }, {} as Record<string, typeof rooms>);

  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase().replace(/\s/g, '-')} className="text-sm font-medium">
        {label}
      </Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full bg-card shadow-sm">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border max-h-[300px]">
          {Object.entries(roomsByFloor).map(([floor, floorRooms]) => (
            <div key={floor}>
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                {floor}
              </div>
              {floorRooms.map(room => (
                <SelectItem key={room.id} value={room.id}>
                  {room.name}
                </SelectItem>
              ))}
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
