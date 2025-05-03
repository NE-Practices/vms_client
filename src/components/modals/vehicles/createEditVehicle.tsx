import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../../ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Vehicle,
  createVehicle,
  updateVehicle,
} from "../../../services/vehiclesService";
import {
  getAllVehicleModels,
  VehicleModel,
} from "../../../services/vehicleModelsService";

interface CreateEditVehicleProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleToEdit?: Vehicle | null;
  onSuccess: () => void;
}

interface VehicleFormData {
  plateNumber: string;
  color: string;
  modelId: string;
  isAvailable: string; // "yes" or "no"
}

const CreateEditVehicle: React.FC<CreateEditVehicleProps> = ({
  isOpen,
  onOpenChange,
  vehicleToEdit,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VehicleFormData>();
  const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([]);
  const [loading, setLoading] = useState(false);

  const selectedModelId = watch("modelId");
  const availability = watch("isAvailable");

  useEffect(() => {
    async function fetchVehicleModels() {
      try {
        const data = await getAllVehicleModels();
        setVehicleModels(data);
      } catch (error) {
        console.error("Failed to fetch vehicle models", error);
      }
    }
    fetchVehicleModels();
  }, []);

  useEffect(() => {
    if (vehicleToEdit) {
      reset({
        plateNumber: vehicleToEdit.plateNumber,
        color: vehicleToEdit.color,
        modelId: vehicleToEdit.modelId,
        isAvailable: vehicleToEdit.isAvailable ? "yes" : "no",
      });
    } else {
      reset({
        isAvailable: "no",
      });
    }
  }, [vehicleToEdit, reset]);

  const onSubmit = async (data: VehicleFormData) => {
    setLoading(true);
    try {
      const finalData = {
        ...data,
        isAvailable: data.isAvailable === "yes",
      };
      if (vehicleToEdit) {
        await updateVehicle(vehicleToEdit.id, finalData);
      } else {
        await createVehicle(finalData);
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save vehicle", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {vehicleToEdit ? "Edit Vehicle" : "Create Vehicle"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Plate Number</label>
            <Input {...register("plateNumber", { required: true })} />
            {errors.plateNumber && (
              <p className="text-red-600">Plate Number is required</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Color</label>
            <Input {...register("color", { required: true })} />
            {errors.color && <p className="text-red-600">Color is required</p>}
          </div>
          <div>
            <label className="block mb-1">Vehicle Model</label>
            <Select
              value={selectedModelId}
              onValueChange={(value) => setValue("modelId", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a vehicle model" />
              </SelectTrigger>
              <SelectContent className="w-full">
                {vehicleModels.map((vm) => (
                  <SelectItem key={vm.id} value={vm.id}>
                    {vm.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.modelId && (
              <p className="text-red-600">Vehicle Model is required</p>
            )}
          </div>
          <div>
            <label className="block mb-1">Available</label>
            <Select
              value={availability}
              onValueChange={(value) => setValue("isAvailable", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditVehicle;
