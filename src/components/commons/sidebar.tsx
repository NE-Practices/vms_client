import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import logo from "../../assets/logo.png";
import DeleteConfirmModal from "../modals/common/DeleteConfirmModal";

const Sidebar: React.FC = () => {
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const navItems = [
    { name: "Overview", path: "/dashboard/overview" },
    { name: "Vehicles", path: "/dashboard/vehicles" },
    { name: "Vehicle Models", path: "/dashboard/vehicleModels" },
    { name: "Actions", path: "/dashboard/actions" },
  ];

  const confirmLogout = ()=>{
    setIsLogoutConfirmOpen(true)
  }
   
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/auth/login";
  };

  return (
    <aside className="h-screen p-6 flex flex-col rounded-2xl bg-white">
      <div className="mb-8 items-center text-center">
        <img src={logo} alt="Logo" className=" h-20 mx-auto" />
        <h1 className="font-bold text-xl">VMS System</h1>
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
        <Button
          variant="outline"
          onClick={confirmLogout}
          className="w-full px-5 py-6 rounded-md border-2  text-black"
        >
          Logout
        </Button>
      </div>
      <DeleteConfirmModal
        isOpen={isLogoutConfirmOpen}
        onOpenChange={setIsLogoutConfirmOpen}
        onConfirm={handleLogout}
        title="Confirm Logout"
        description = 'Are you sure you want to logout This action cannot be undone.'
        confirmText="Logout"
        loadingText="Logging out ..."
      />
    </aside>
  );
};

export default Sidebar;
