import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "../../assets/logo.png";

const Sidebar: React.FC = () => {
  const navItems = [
    { name: "Overview", path: "/dashboard/overview" },
    { name: "Vehicles", path: "/dashboard/vehicles" },
    { name: "Vehicle Models", path: "/dashboard/vehicleModels" },
    { name: "Actions", path: "/dashboard/actions" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  };

  return (
    <aside className="h-screen p-6 flex flex-col rounded-2xl bg-white">
      <div className="mb-8">
        <img src={logo} alt="Logo" className=" h-20 mx-auto" />
      </div>
      <nav className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `block px-5 py-3 rounded-md hover:bg-red-200 ${
                isActive ? "bg-red-700 text-white font-semibold" : ""
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="float-bottom mb-6 mt-auto">
        <Button variant="destructive" onClick={handleLogout} className="w-full px-5 py-6 rounded-md border-2  text-white">
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
