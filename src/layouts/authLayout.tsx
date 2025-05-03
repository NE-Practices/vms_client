import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-64 md:h-auto">
        <img
          src="https://images.unsplash.com/photo-1513036191774-b2badb8fcb76?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Auth"
          className="w-full h-screen object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
