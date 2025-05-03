import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../components/tables";
import {
  vehicleColumns as getVehicleColumns,
  Vehicle,
} from "../../components/tables/columns";
import API_ENDPOINTS from "../../constants/api";
import CreateEditVehicle from "../../components/modals/vehicles/createEditVehicle";
import { Button } from "../../components/ui/button";
import { deleteVehicle } from "../../services/vehiclesService";
import { toast } from "sonner";
import Loader from "../../components/commons/loader";

const VehiclePage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const fetchVehicles = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_ENDPOINTS.vehicles.allPaginated, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const { data } = response.data;
      setVehicles(data);
    } catch (err) {
      console.error("Vehicle fetch error:", err);
      setError("Failed to fetch vehicles");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedVehicle(null);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    fetchVehicles();
  };

  const handleDelete = async (vehicle:Vehicle)=>{
   await deleteVehicle(vehicle.id)
   toast.success("Vehicle deleted successfully")
   fetchVehicles()
  }

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Vehicles</h1>
        <Button onClick={handleCreate} className="mb-4">
          Create Vehicle
        </Button>
      </div>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
       <Loader/>
      ) : (
        <DataTable<Vehicle>
          data={vehicles}
          columns={getVehicleColumns(handleEdit)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      <CreateEditVehicle
        isOpen={isDialogOpen}
        vehicleToEdit={selectedVehicle}
        onOpenChange={setIsDialogOpen}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default VehiclePage;
