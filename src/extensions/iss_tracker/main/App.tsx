import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import useHooks from "./hooks";

function App() {
  const { issPosition, handleUpdate, handleJump, isFollowing, toggleFollow } =
    useHooks();

  return (
    <Card>
      <CardHeader>
        <CardTitle>ISS Tracker</CardTitle>
        <CardDescription>
          View, move, and update the current location of the ISS
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]" />
              <TableHead>Longitude</TableHead>
              <TableHead>Latitude</TableHead>
              <TableHead>Height</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-semibold">ISS</TableCell>
              <TableCell>
                <Label htmlFor="mouse-lng" className="sr-only">
                  Longitude
                </Label>
                <Input type="number" disabled value={issPosition?.lon ?? ""} />
              </TableCell>
              <TableCell>
                <Label htmlFor="mouse-lat" className="sr-only">
                  Latitude
                </Label>
                <Input type="number" disabled value={issPosition?.lat ?? ""} />
              </TableCell>
              <TableCell>
                <Label htmlFor="mouse-height" className="sr-only">
                  Height
                </Label>
                <Input
                  type="number"
                  disabled
                  value={issPosition?.height ?? ""}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center gap-3 p-4 border-t">
        <Button size="sm" className="gap-1" onClick={handleUpdate}>
          Update
        </Button>
        <Button size="sm" className="gap-1" onClick={handleJump}>
          Jump
        </Button>
        <Button size="sm" className="gap-1" onClick={toggleFollow}>
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default App;
