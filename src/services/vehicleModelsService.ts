import axios from "axios";
import API_ENDPOINTS from "../constants/api";
import { toast } from "sonner";

export interface VehicleModel {
  id: string;
  name: string;
  brand: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export async function getAllVehicleModelsPaginated(
  page: number,
  pageSize: number
) {
  try {
    const response = await axios.get<PaginatedResponse<VehicleModel>>(
      API_ENDPOINTS.vehicleModels.allPaginated,
      {
        params: { page, pageSize },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    toast.success("Vehicle models loaded successfully!");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to load vehicle models!";
    toast.error(errorMessage);
    throw error; 
  }
}

export async function getAllVehicleModels() {
  try {
    const response = await axios.get(API_ENDPOINTS.vehicleModels.allModels, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    toast.success("Vehicle models loaded successfully!");
    console.log("Response->", response.data);
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to load vehicle models!";
    toast.error(errorMessage);
    throw error; 
  }
}

export async function getVehicleModelById(id: string) {
  try {
    const response = await axios.get<VehicleModel>(
      API_ENDPOINTS.vehicleModels.oneById(id),
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    toast.success("Vehicle model loaded successfully!");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to load vehicle model!";
    toast.error(errorMessage);
    throw error; 
  }
}

export async function createVehicleModel(data: Partial<VehicleModel>) {
  try {
    const response = await axios.post(
      API_ENDPOINTS.vehicleModels.addOne,
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    toast.success(
      response.data.message || "Vehicle model created successfully!"
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to create vehicle model!";
    toast.error(errorMessage);
    throw error; 
  }
}

export async function updateVehicleModel(
  id: string,
  data: Partial<VehicleModel>
) {
  try {
    const response = await axios.put(
      API_ENDPOINTS.vehicleModels.editOne(id),
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    toast.success(
      response.data.message || "Vehicle model updated successfully!"
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to update vehicle model!";
    toast.error(errorMessage);
    throw error; 
  }
}

export async function deleteVehicleModel(id: string) {
  try {
    const response = await axios.delete(
      API_ENDPOINTS.vehicleModels.delete(id),
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    toast.success(
      response.data.message || "Vehicle model deleted successfully!"
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to delete vehicle model!";
    toast.error(errorMessage);
    throw error; 
  }
}

export async function getVehicleModelStats() {
  try {
    const response = await axios.get("/api/vehicleModels/stats", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    toast.success("Vehicle model stats loaded successfully!");
    return response.data;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to load vehicle model stats!";
    toast.error(errorMessage);
    throw error; 
  }
}
