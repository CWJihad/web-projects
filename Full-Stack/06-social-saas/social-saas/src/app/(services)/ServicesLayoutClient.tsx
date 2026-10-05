"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  LogOut,
  Menu,
  LayoutDashboard,
  Share2,
  Upload,
  Image,
} from "lucide-react";

const sidebarItems = [
  { href: "/home", icon: LayoutDashboard, label: "Home Page" },
  { href: "/social-share", icon: Share2, label: "Social Share" },
  { href: "/video-upload", icon: Upload, label: "Video Upload" },
];

const ServicesLayoutClient = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {

// const ServicesLayoutClient = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();

  const handleLogoClick = () => {
    router.push("/home");
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <header className=" bg-base-300 w-full">
          <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost drawer-button"
              >
                <Menu />
              </label>
            </div>
            <div className="flex-1">
              <Link href={"/home"} onClick={handleLogoClick}>
                <div className="btn btn-ghost normal-case text-2xl font-bold tracking-tight cursor-pointer">
                  Cloudinary Showcase
                </div>
              </Link>
            </div>
            <div className="flex-none flex items-center space-x-4">
              {user && (
                <>
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full">
                      <img
                        src={user.imageUrl}
                        alt={
                          user.username || user.emailAddresses[0].emailAddress
                        }
                      />
                    </div>
                  </div>
                  <span className="text-sm truncate max-w-xs lg:max-w-md">
                    {user.username || user.emailAddresses[0].emailAddress}
                  </span>
                  <button
                    className="btn btn-ghost btn-circle"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        </header>
        {/* Page content here */}
        <main className="grow">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
            {children}
          </div>
        </main>
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <aside className="bg-base-200 w-64 h-full flex flex-col">
          <div className="flex items-center justify-center py-4">
            <Image className="w-10 h-10 text-primary" />
          </div>
          <ul className="menu p-4 w-full text-base-content grow">
            {sidebarItems.map((item) => (
              <li key={item.href} className="mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${pathname === item.href ? "bg-primary text-white" : "hover:bg-base-300"}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-6 h-6" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {user && (
            <div className="p-4">
              <button
                className="btn btn-outline btn-error w-full"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign Out
              </button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default ServicesLayoutClient;
