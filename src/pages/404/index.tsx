import { Button } from "../../components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react"; 

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">
        The page you are looking for does not exist.
      </p>
      <Button onClick={handleGoBack} variant="destructive">
        Go Back
      </Button>
    </div>
  );
};

export default NotFoundPage;
