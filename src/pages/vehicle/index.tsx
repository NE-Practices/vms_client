import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../components/tables";
import {
  vehicleColumns as getVehicleColumns,
  Vehicle,
} from "../../components/tables/columns";
import API_ENDPOINTS from "../../constants/api";
import CreateEditVehicle from "../../components/modals/vehicles/createEditVehicle";
import CreateEditAction from "../../components/modals/actions/createEditAction";
import { Button } from "../../components/ui/button";
import { deleteVehicle } from "../../services/vehiclesService";
import { toast } from "sonner";
import Loader from "../../components/commons/loader";
import { Action } from "@/services/actionService";

const VehiclePage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const UserRole = parsedUser.role?.toLowerCase();

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

  const handleCreateVehicle = () => {
    setSelectedVehicle(null);
    setIsDialogOpen(true);
  };

  const handleCreateAction = () => {
    setSelectedAction(null);
    setIsActionDialogOpen(true);
  };

  const handleDelete = async (vehicle: Vehicle) => {
    try {
      await deleteVehicle(vehicle.id);
      toast.success("Vehicle deleted successfully");
      fetchVehicles();
    } catch {
      toast.error("Failed to delete vehicle");
    }
  };

  const handleSuccess = () => {
    fetchVehicles();
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Vehicles</h1>

        {/* Admin Create Vehicle */}
        {UserRole === "admin" && (
          <Button onClick={handleCreateVehicle} className="mb-4 mr-2">
            Create Vehicle
          </Button>
        )}

        {/* User Create Action */}
        {UserRole === "user" && (
          <Button onClick={handleCreateAction} className="mb-4">
            Create Action
          </Button>
        )}
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {loading ? (
        <Loader />
      ) : (
        <DataTable<Vehicle>
          data={vehicles}
          columns={getVehicleColumns(handleEdit)}
          onEdit={handleEdit}
          onDelete={handleDelete}
          role={UserRole}
          tableType="vehicle"
        />
      )}

      {/* Vehicle Modal */}
      <CreateEditVehicle
        isOpen={isDialogOpen}
        vehicleToEdit={selectedVehicle}
        onOpenChange={setIsDialogOpen}
        onSuccess={handleSuccess}
      />

      {/* Action Modal for Users */}
      <CreateEditAction
        isOpen={isActionDialogOpen}
        actionToEdit={selectedAction}
        onOpenChange={setIsActionDialogOpen}
        onSuccess={handleSuccess} // or optionally, fetchActions if available
      />
    </div>
  );
};

export default VehiclePage;
