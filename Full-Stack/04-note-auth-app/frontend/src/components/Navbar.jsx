import {
  BookOpen,
  LogOut,
  MessageSquare,
  NotebookPen,
  User,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getData } from "@/context/userContext";
import axios from "axios";

const Navbar = () => {
  const { user, setUser, authLoading } = getData();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  const handleNavClick = (section) => {
    setActiveSection(section);
    if (isMainPage) {
      // already on home — just scroll
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // on another page — go home first, then scroll
      navigate("/");
      setTimeout(() => {
        document
          .getElementById(section)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 10000);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true },
      );
    } catch (err) {
      console.error("Logout error: ", err);
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const changeSection = () => {
    setActiveSection("");
  };

  // avatar initials fallback
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <nav className="p-2 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* logo section */}
        <div>
          <BookOpen className="h-6 w-6 text-orange-700" />
          <h1 className="font-bold text-xl">
            <span className="text-orange-600">Notes</span>
          </h1>
        </div>
        <div className="flex gap-7 items-center">
          <ul className="flex gap-7 items-center text-lg font-semibold">
            {["home", "features", "about", "reviews"].map((section) => (
              <li
                key={section}
                onClick={() => handleNavClick(section)}
                to={section !== "home" ? `/${section}` : "/"}
                className={`cursor-pointer capitalize transition-all duration-200 ${
                  isMainPage && activeSection === section
                    ? " border-b-2 border-[#ff6b35]"
                    : "text-gray-700 hover:text-[#ff6b35]"
                }`}
              >
                {section}
              </li>
            ))}
            {
            authLoading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : 
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    {user.avatar ? (
                      <AvatarImage src={user.avatar || ""} />
                    ) : (
                      <AvatarFallback>{initials}</AvatarFallback>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link
                        onClick={() => changeSection()}
                        className="flex gap-2 items-center"
                        to="/profile"
                      >
                        <User />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link className="flex gap-2" to={"/notes"}>
                        <NotebookPen />
                        Notes
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Link className="flex gap-2 items-center" to="/feedback">
                        <MessageSquare size={16} /> Feedback
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="text-red-600 font-semibold cursor-pointer"
                      onClick={handleLogout}
                    >
                      <LogOut />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="ml-5 flex items-center lg:order-2">
                <Link
                  to="/login"
                  className="text-gray-800 border hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
