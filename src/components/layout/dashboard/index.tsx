"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { DashboardNavbar } from "./Navbar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="transition-all duration-300" style={{ marginRight: collapsed ? "4rem" : "16rem" }}>
        <DashboardNavbar sidebarCollapsed={collapsed} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
