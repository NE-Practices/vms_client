import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../src/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getAllVehicles } from "../../services/vehiclesService"; 
import { getAllVehicleModels } from "../../services/vehicleModelsService"; 
import { getAllUsers } from "../../services/userService"; 

const DashboardPage: React.FC = () => {
  const [vehicleCount, setVehicleCount] = useState<number>(0);
  const [vehicleModelCount, setVehicleModelCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vehicleData = await getAllVehicles(1, 1000); 
        setVehicleCount(vehicleData.total);
        const vehicleModelData = await getAllVehicleModels();
        setVehicleModelCount(vehicleModelData.length);
        const userData = await getAllUsers(); 
        setUserCount(userData.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { name: "Vehicles", count: vehicleCount },
    { name: "Vehicle Models", count: vehicleModelCount },
    { name: "Users", count: userCount },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-black">Dashboard Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Number of Vehicles</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-black">{vehicleCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Number of Vehicle Models</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-black">
              {vehicleModelCount}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Number of Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-semibold text-black">{userCount}</p>
          </CardContent>
        </Card>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-black">
          Vehicles Analytics Chart
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#ffb4b4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardPage;
