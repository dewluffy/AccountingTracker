import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Navbar />

          <main className="p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}