import axios from "axios";
import API_ENDPOINTS from "../constants/api";
import { toast } from "sonner";

export interface Vehicle {
  id: string;
  plateNumber: string;
  color: string;
  modelId: string;
  isAvailable: boolean;
}
export interface Request {
  id: string;
  userId: string;
  vehicleId: string;
  actionType: string;
  status: string;
}


export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export async function getAllVehicles(page: number, pageSize: number) {
  try {
    const response = await axios.get<PaginatedResponse<Vehicle>>(
      API_ENDPOINTS.vehicles.allPaginated,
      {
        params: { page, pageSize },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    toast.success("Vehicles loaded successfully!");
    console.log("Vehicle data->", response.data);
    return response.data;
  } catch (error: unknown) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to load vehicles!";
    toast.error(errorMessage);
    throw error; 
  }
}

export async function getVehicleById(id: string) {
  try {
    const response = await axios.get<Vehicle>(
      API_ENDPOINTS.vehicles.oneById(id),
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    toast.success("Vehicle loaded successfully!");
    return response.data;
  } catch (error: unknown) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to load vehicle!";
    toast.error(errorMessage);
    throw error; 
  }
}

export async function createVehicle(data: Partial<Vehicle>) {
  try {
    const response = await axios.post(API_ENDPOINTS.vehicles.add, data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    toast.success(response.data.message || "Vehicle created successfully!");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to create vehicle!";
    toast.error(errorMessage);
    throw error; 
  }
}

export async function updateVehicle(id: string, data: Partial<Vehicle>) {
  try {
    const response = await axios.put(API_ENDPOINTS.vehicles.editOne(id), data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    toast.success(response.data.message || "Vehicle updated successfully!");
    return response.data;
  } catch (error) {
    const errorMessage =
    axios.isAxiosError(error) && error.response?.data?.message
      ? error.response.data.message
      : "Failed to update vehicle!";
    toast.error(errorMessage);
    throw error; 
  }
}

export async function deleteVehicle(id: string) {
  try {
    const response = await axios.delete(API_ENDPOINTS.vehicles.delete(id), {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    toast.success(response.data.message || "Vehicle deleted successfully!");
    return response.data;
  } catch (error: unknown) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to delete vehicle!";
    toast.error(errorMessage);
    throw error; 
  }
}

export async function getAllVehicleRequests() {
  try {
    const response = await axios.get(API_ENDPOINTS.vehicles.getAllRequests, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    toast.success("Requests loaded successfully!");
    console.log("Requestsss data-->", response.data);
    return response.data;
  } catch (error: unknown) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to load actions!";
    toast.error(errorMessage);
    console.log("Error get all actions --->", errorMessage);
    throw error;
  }
}

export async function approveVehicleRequest(id: string) {
  try {
    const response = await axios.put(
      `${API_ENDPOINTS.vehicles.approveRequest(id)}`,{},
      {
        headers:{
          Authorization: localStorage.getItem("token"),
        }
      }
    );
    toast.success(response.data.message || "Request approved successfully!");
    return response.data;
  } catch (error: unknown) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to approve request!";
    toast.error(errorMessage);
    throw error; 
  }
}