/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnDef } from "@tanstack/react-table";


export interface User {
  id: string;
  names: string;
  phone: string;
  email: string;
}
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
  model?: VehicleModel;
}

export interface Action {
  id: string;
  userId: string;
  vehicleId: string;
  actionType: string;
  user?: User;
  vehicle?: Vehicle;
}
export interface Requests {
  id: string;
  userId: string;
  vehicleId: string;
  actionType: string;
  user?: User;
  vehicle?: Vehicle;
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
    header: "Model Name",
    accessorFn: (row) => row.model?.name,
    cell: (info) => info.getValue(),
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
    header: "Vehicle Plate Number",
    accessorFn: (row) => row.vehicle?.plateNumber,
    cell: (info) => info.getValue(),
  },
  {
    header: "User Action Type",
    accessorKey: "actionType",
    cell: (info) => info.getValue(),
  },
  {
    header: "User Name",
    accessorFn: (row) => row.user?.names,
    cell: (info) => info.getValue(),
  },
  {
    header: "Phone Number",
    accessorFn: (row) => row.user?.phone,
    cell: (info) => info.getValue(),
  },
];



export const requestColumns = (): ColumnDef<Requests>[] => [
  {
    header: "User Names",
    accessorFn: (row) => row.user?.names,
    cell: (info) => info.getValue(),
  },
  {
    header: "Email",
    accessorFn: (row) => row.user?.email,
    cell: (info) => info.getValue(),
  },
  {
    header: "Vehicle Plate Number",
    accessorFn: (row) => row.vehicle?.plateNumber,
    cell: (info) => info.getValue(),
  },
  {
    header: "Action Type",
    accessorKey: "actionType",
    cell: (info) => info.getValue(),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info) => info.getValue(),
  },
];
