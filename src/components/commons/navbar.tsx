import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import API_ENDPOINTS from "../../constants/api";

interface UserProfile {
  names: string;
  profilePicture?: string;
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.user.me, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setUser(response.data.data.user);
        }
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <nav className="w-full bg-white text-black px-6 py-4 flex justify-between">
      <span className="hidden sm:inline">Hello</span>

      {user && (
        <div className="flex items-center space-x-4 justify-between">
          <Avatar>
            {user.profilePicture ? (
              <AvatarImage src={user?.profilePicture} alt={user.names} />
            ) : (
              <AvatarFallback>
                {user?.names?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            )}
          </Avatar>
          <h1>{user.names}</h1>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
