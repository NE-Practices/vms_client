import axios from "axios";
import API_ENDPOINTS from "../constants/api";
import { toast } from "sonner";


export async function getAllUsers() {
  try {
    const response = await axios.get(API_ENDPOINTS.user.all, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    toast.success("Users loaded successfully");
    console.log("Response --->", response.data.data.users);
    return response.data.data.users;
  } catch (error) {
    const errorMessage =
      axios.isAxiosError(error) && error.response?.data?.message
        ? error.response.data.message
        : "Failed to load users";
    toast.error(errorMessage);
    throw error;
  }
}


   export async function fetchUserProfile()  {
     try {
       const response = await axios.get(API_ENDPOINTS.user.me, {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
       });
       if (response.status === 200) {
         return response.data.data.user;
       }
     } catch (error) {
       console.error("Failed to fetch user profile", error);
     }
   };