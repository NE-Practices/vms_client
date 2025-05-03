import axios from "axios";
import API_ENDPOINTS from "../constants/api";
import { toast } from "sonner";

export interface Action {
  id: string;
  userId:string;
  vehicleId: string;
  actionType: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export async function getAllActions() {
  try {
    const response = await axios.get(API_ENDPOINTS.actions.getAllActions, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    toast.success("Actions loaded successfully!");
    console.log("Actions data-->", response.data);
    return response.data;
    
  } catch (error: unknown) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to load actions!";
    toast.error(errorMessage);
    console.log("Error get all actions --->",errorMessage)
    throw error;
  }
}

export async function createAction(data: Partial<Action>) {
  try {
    const response = await axios.post(API_ENDPOINTS.actions.makeAction, data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    toast.success(response.data.message || "Action created successfully!");
    return response.data;
  } catch (error: unknown) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to create action!";
    toast.error(errorMessage);
    console.log("error create action",errorMessage)
    throw error;
  }
}

export async function updateAction(id: string, data: Partial<Action>) {
  try {
    const response = await axios.put(API_ENDPOINTS.actions.updateAction(id), data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    toast.success(response.data.message || "Action updated successfully!");
    return response.data;
  } catch (error: unknown) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to update action!";
    toast.error(errorMessage);
        console.log("error update action", errorMessage);

    throw error;
  }
}

export async function deleteAction(id: string) {
  try {
    const response = await axios.delete(API_ENDPOINTS.actions.deleteAction(id), {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    toast.success(response.data.message || "Action deleted successfully!");
    return response.data;
  } catch (error: unknown) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to delete action!";
    toast.error(errorMessage);
        console.log("error delete action", errorMessage);
    throw error;
  }
}
