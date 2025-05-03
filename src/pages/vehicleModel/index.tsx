import React, { useEffect, useState } from "react";
import DataTable from "../../components/tables";
import {
  vehicleModelColumns,
  VehicleModel,
} from "../../components/tables/columns";
import { deleteVehicleModel, getAllVehicleModels } from "../../services/vehicleModelsService";
import CreateEditVehicleModel from "../../components/modals/vehicleModels/createEditVehicleModel"; 
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import Loader from "../../components/commons/loader";



const VehicleModelPage: React.FC = () => {
  const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [vehicleModelToEdit, setVehicleModelToEdit] =
    useState<VehicleModel | null>(null);

  const fetchVehicleModels = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllVehicleModels();
      const models = response?.data || response; 
      setVehicleModels(models);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch vehicle models");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicleModels();
  }, []);


  const handleCreate = () => {
    setVehicleModelToEdit(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (model: VehicleModel) => {
    setVehicleModelToEdit(model);
    setIsDialogOpen(true);
  };

  const handleSuccess = () => {
    fetchVehicleModels();
  };

  const handleDelete = async (model:VehicleModel) =>{
       await deleteVehicleModel(model.id);
       toast.success("Model deleted successfully");
       fetchVehicleModels();
  }


  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Vehicle Models</h1>
      <Button onClick={handleCreate} className="mb-4">
        Create Vehicle Model
      </Button>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <Loader/>
      ) : (
    <DataTable<VehicleModel>
  data={vehicleModels}
  columns={vehicleModelColumns(handleEdit)}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

      )}
      <CreateEditVehicleModel
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        vehicleModelToEdit={vehicleModelToEdit}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default VehicleModelPage;
