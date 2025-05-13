import React, { useEffect, useState } from "react";
import DataTable from "../../components/tables";
import {requestColumns } from "../../components/tables/columns";
import Loader from "../../components/commons/loader";
import { getAllVehicleRequests } from "../../services/vehiclesService";

const RequestsPage: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : {};
  const UserRole = parsedUser.role.toLowerCase();
  console.log("UserRole--->", UserRole);

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAllVehicleRequests();
      console.log("Requestsss data-->", response);
      setRequests(response);
    } catch {
      setError("Failed to fetch actions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Vehicle Requests</h1>
      </div>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading ? (
        <Loader />
      ) : (
        <DataTable<Request>
          data={requests}
          columns={requestColumns()}
          tableType="request"
          role={UserRole}
        />
      )}
    </div>
  );
};

export default RequestsPage;
