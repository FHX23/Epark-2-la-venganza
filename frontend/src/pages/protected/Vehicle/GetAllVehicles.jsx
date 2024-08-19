import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { GetAllVehicles, updatedVehicleByLicensePlate } from "@/services/vehicle.service";
import { Pencil } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { profile } from "@/services/auth.service";

export default function TableVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const { toast } = useToast();
  const [editVehicle, setEditVehicle] = useState(null);
  const [formState, setFormState] = useState({
    licensePlate: "",
    model: "",
    color: "",
    brand: "",
  });

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await GetAllVehicles();
        const formattedData = response.data.map((vehicle) => ({
          licensePlate: vehicle.licensePlate,
          model: vehicle.model,
          color: vehicle.color,
          brand: vehicle.brand,
          owner: vehicle.user.username, // Mostrar el nombre del dueño
        }));
        setVehicles(formattedData);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchVehicles();
  }, []);

  const handleUpdate = async () => {
    try {
      await updatedVehicleByLicensePlate(formState.licensePlate, formState);
      setVehicles(
        vehicles.map((vehicle) =>
          vehicle.licensePlate === editVehicle.licensePlate
            ? { ...formState, owner: vehicle.owner } // Mantener el dueño
            : vehicle
        )
      );
      toast({
        title: "Vehículo actualizado",
        description: "Los datos del vehículo han sido actualizados correctamente.",
        className: "bg-[#4CAF50] text-white py-2 px-4 rounded shadow-lg", // Color verde para la alerta
      });
      setEditVehicle(null);
    } catch (error) {
      console.error("Error actualizando vehículo:", error);
      toast({
        title: "Error",
        description: "Hubo un error al actualizar el vehículo. Por favor, intenta de nuevo.",
        className: "bg-[#4CAF50] text-white py-2 px-4 rounded shadow-lg",
      });
    }
  };
  

  const handleEditClick = (vehicle) => {
    setEditVehicle(vehicle);
    setFormState({
      licensePlate: vehicle.licensePlate,
      model: vehicle.model,
      color: vehicle.color,
      brand: vehicle.brand,
    });
  };

  return (
    <>
      <div>
        <Tabs defaultValue="week">
          <TabsContent value="week">
            <Card>
              <CardHeader className="px-6">
                <CardTitle>Vehículos</CardTitle>
                <CardDescription>
                  Este es un listado de los vehículos en el sistema. Puedes editar sus datos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Placa</TableHead>
                      <TableHead className="hidden sm:table-cell">Modelo</TableHead>
                      <TableHead className="hidden sm:table-cell">Color</TableHead>
                      <TableHead className="hidden md:table-cell">Marca</TableHead>
                      <TableHead className="hidden md:table-cell">Dueño</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.map((vehicle) => (
                      <TableRow key={vehicle.licensePlate}>
                        <TableCell>{vehicle.licensePlate}</TableCell>
                        <TableCell className="hidden sm:table-cell">{vehicle.model}</TableCell>
                        <TableCell className="hidden sm:table-cell">{vehicle.color}</TableCell>
                        <TableCell className="hidden md:table-cell">{vehicle.brand}</TableCell>
                        <TableCell className="hidden md:table-cell">{vehicle.owner}</TableCell>
                        <TableCell align="end">
                          <div className="space-x-2 space-y-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleEditClick(vehicle)}
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Editar</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {editVehicle && (
        <Dialog open={!!editVehicle} onOpenChange={(isOpen) => !isOpen && setEditVehicle(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Actualizar datos</DialogTitle>
              <DialogDescription>Actualiza los datos del vehículo seleccionado.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="licensePlate" className="text-right">
                  Placa
                </Label>
                <Input
                  id="licensePlate"
                  value={formState.licensePlate}
                  className="col-span-3"
                  onChange={(e) =>
                    setFormState({ ...formState, licensePlate: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="model" className="text-right">
                  Modelo
                </Label>
                <Input
                  id="model"
                  value={formState.model}
                  className="col-span-3"
                  onChange={(e) =>
                    setFormState({ ...formState, model: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">
                  Color
                </Label>
                <Input
                  id="color"
                  value={formState.color}
                  className="col-span-3"
                  onChange={(e) =>
                    setFormState({ ...formState, color: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="brand" className="text-right">
                  Marca
                </Label>
                <Input
                  id="brand"
                  value={formState.brand}
                  className="col-span-3"
                  onChange={(e) =>
                    setFormState({ ...formState, brand: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleUpdate}>
                Guardar cambios
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
