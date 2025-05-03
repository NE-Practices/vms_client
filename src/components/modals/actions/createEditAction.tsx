import React, { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { Button } from '../../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { getAllVehicles, Vehicle } from '../../../services/vehiclesService';
import { createAction, updateAction } from '../../../services/actionService';
import { fetchUserProfile } from '../../../services/userService';

interface CreateEditActionProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  actionToEdit?: { id: string; vehicleId: string; actionType: string } | null;
  onSuccess: () => void;
}

interface ActionFormData {
  userId:string;
  vehicleId: string;
  actionType: 'BOOK' | 'USE' | 'RETURN';
}

const actionTypes = ['BOOK', 'USE', 'RETURN'] as const;

const CreateEditAction: React.FC<CreateEditActionProps> = ({
  isOpen,
  onOpenChange,
  actionToEdit,
  onSuccess,
}) => {
  const { handleSubmit, setValue, reset, formState: { errors } } = useForm<ActionFormData>();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [userId,setUserId]=useState("")
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const data = await getAllVehicles(1, 100);
        setVehicles(data.data);
      } catch (error) {
        console.error('Failed to fetch vehicles', error);
      }
    }
    fetchVehicles();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await fetchUserProfile();
        setUserId(data.id);
        console.log("data",data.id)
      } catch (error) {
        console.error('Failed to fetch vehicles', error);
      }
    }
    fetchUser();
  }, []);


  useEffect(() => {
    if (actionToEdit) {
      setValue('userId',userId)
      setValue('vehicleId', actionToEdit.vehicleId);
      setValue('actionType', actionToEdit.actionType as ActionFormData['actionType']);
    } else {
      reset();
    }
  }, [actionToEdit, setValue, reset, userId]);

const onSubmit = async (data: ActionFormData) => {
  setLoading(true);
  try {
    const finalData = {
      ...data,
      userId, 
    };

    if (actionToEdit) {
      await updateAction(actionToEdit.id, finalData);
    } else {
      await createAction(finalData);
    }

    onSuccess();
    onOpenChange(false);
  } catch (error) {
    console.error("Failed to save action", error);
  } finally {
    setLoading(false);
  }
};


  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full p-6 bg-white rounded-md shadow-lg -translate-x-1/2 -translate-y-1/2">
          <Dialog.Title className="text-lg font-semibold mb-4">
            {actionToEdit ? 'Edit Action' : 'Create Action'}
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1">Select Vehicle</label>
              <Select onValueChange={value => setValue('vehicleId', value)} defaultValue="">
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Select a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map(vehicle => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.plateNumber} - {vehicle.color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.vehicleId && <p className="text-red-600">Vehicle is required</p>}
            </div>
            <div>
              <label className="block mb-1">Select Action</label>
              <Select onValueChange={value => setValue('actionType', value as ActionFormData['actionType'])} defaultValue="">
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent>
                  {actionTypes.map(action => (
                    <SelectItem key={action} value={action}>
                      {action}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.actionType && <p className="text-red-600">Action is required</p>}
            </div>
            <div className="mt-4 flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateEditAction;
