const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/user/create`,
    verifyAccountInitiate: `${API_BASE_URL}/auth/initiate-email-verification`,
    verifyAccountConfirm: (code: string) =>
      `${API_BASE_URL}/auth/verify-email/${code}`,
    resetPasswordInitiate: `${API_BASE_URL}/auth/initiate-reset-password`,
    resetPasswordConfirm: `${API_BASE_URL}/auth/reset-password`,
  },
  user: {
    me: `${API_BASE_URL}/user/me`,
    all: `${API_BASE_URL}/user/all`,
  },
  vehicles: {
    add: `${API_BASE_URL}/vehicles`,
    all: `${API_BASE_URL}/vehicles`,
    allPaginated: `${API_BASE_URL}/vehicles/paginated`,
    oneById: (id: string) => `${API_BASE_URL}/vehicles/${id}`,
    editOne: (id: string) => `${API_BASE_URL}/vehicles/${id}`,
    delete: (id: string) => `${API_BASE_URL}/vehicles/${id}`,
    search: `${API_BASE_URL}/vehicles/search`,
  },
  vehicleModels: {
    addOne: `${API_BASE_URL}/vehicle-models`,
    allModels: `${API_BASE_URL}/vehicle-models`,
    allPaginated: `${API_BASE_URL}/vehicle-models/paginated`,
    oneById: (id: string) => `${API_BASE_URL}/vehicle-models/${id}`,
    editOne: (id: string) => `${API_BASE_URL}/vehicle-models/${id}`,
    delete: (id: string) => `${API_BASE_URL}/vehicle-models/${id}`,
    search: `${API_BASE_URL}/vehicle-models/search`,
  },
  actions: {
    makeAction: `${API_BASE_URL}/actions`,
    getAllActions: `${API_BASE_URL}/actions`,
    deleteAction: (id: string) => `${API_BASE_URL}/actions/${id}`,
    updateAction: (id: string) => `${API_BASE_URL}/actions/${id}`,
  },
};

export default API_ENDPOINTS;
