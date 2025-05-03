import React, { useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { VehicleModel, createVehicleModel, updateVehicleModel } from '../../../services/vehicleModelsService';

interface CreateEditVehicleModelProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  vehicleModelToEdit?: VehicleModel | null;
  onSuccess: () => void;
}

interface VehicleModelFormData {
  name: string;
  brand: string;
}

const CreateEditVehicleModel: React.FC<CreateEditVehicleModelProps> = ({
  isOpen,
  onOpenChange,
  vehicleModelToEdit,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<VehicleModelFormData>();

  useEffect(() => {
    if (vehicleModelToEdit) {
      setValue('name', vehicleModelToEdit.name);
      setValue('brand', vehicleModelToEdit.brand);
    } else {
      reset();
    }
  }, [vehicleModelToEdit, setValue, reset]);

  const onSubmit = async (data: VehicleModelFormData) => {
    try {
      if (vehicleModelToEdit) {
        await updateVehicleModel(vehicleModelToEdit.id, data);
      } else {
        await createVehicleModel(data);
      }
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to save vehicle model', error);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full p-6 bg-white rounded-md shadow-lg -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-lg font-semibold mb-4">
            {vehicleModelToEdit ? 'Edit Vehicle Model' : 'Create Vehicle Model'}
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1">Name</label>
              <Input {...register('name', { required: true })} />
              {errors.name && <p className="text-red-600">Name is required</p>}
            </div>
            <div>
              <label className="block mb-1">Brand</label>
              <Input {...register('brand', { required: true })} />
              {errors.brand && <p className="text-red-600">Brand is required</p>}
            </div>
            <div className="mt-4 flex justify-end">
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateEditVehicleModel;
