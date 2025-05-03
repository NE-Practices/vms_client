import { ColumnDef } from "@tanstack/react-table";
import { Action } from "@/services/actionService";

export interface VehicleModel {
  id: string;
  name: string;
  brand: string;
}

export interface Vehicle {
  id: string;
  plateNumber: string;
  color: string;
  modelName: string;
  modelId:string;
  isAvailable: boolean;
}

export const vehicleModelColumns = (
  onEdit: (model: VehicleModel) => void
): ColumnDef<VehicleModel>[] => [
  // {
  //   accessorKey: "id",
  //   header: "ID",
  // },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
];

export const vehicleColumns = (
  onEdit: (vehicle: Vehicle) => void
): ColumnDef<Vehicle>[] => [
  // {
  //   accessorKey: "id",
  //   header: "ID",
  // },
  {
    accessorKey: "plateNumber",
    header: "Plate Number",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "model.name",
    header: "Model",
  },
  {
    accessorKey: "isAvailable",
    header: "Available",
    cell: (info) => (info.getValue() ? "Yes" : "No"),
  },
];



export const actionColumns = (
  onEdit: (action: Action) => void
): ColumnDef<Action>[] => [
  {
    accessorKey: "vehicle.plateNumber",
    header: "Vehicle plateNumber",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "actionType",
    header: "User Action Type",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey:"user.names",
    header:"User Name",
    cell:(info)=>info.getValue(),
  },
  {
    accessorKey:"user.telephone",
    header:"Phone number",
    cell:(info)=>info.getValue(),
  },
  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => (
  //     <button
  //       onClick={() => onEdit(row.original)}
  //       className="text-blue-500 hover:underline"
  //     >
  //       Edit
  //     </button>
  //   ),
  // },
];