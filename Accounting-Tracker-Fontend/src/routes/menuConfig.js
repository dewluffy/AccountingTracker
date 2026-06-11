import {
  FaChartPie,
  FaUsers,
  FaBuilding,
  FaFileInvoiceDollar,
  FaTasks,
  FaChartBar,
} from "react-icons/fa";

export const menus = [
  {
    title: "Dashboard",
    path: "/",
    icon: FaChartPie,
  },
  {
    title: "Customers",
    path: "/customers",
    icon: FaBuilding,
  },
  {
    title: "Monthly Tax",
    path: "/taxes/monthly",
    icon: FaFileInvoiceDollar,
  },
  {
    title: "Annual Tax",
    path: "/taxes/annual",
    icon: FaFileInvoiceDollar,
  },
  {
    title: "Current Work",
    path: "/tasks",
    icon: FaTasks,
  },
  {
    title: "Users",
    path: "/users",
    icon: FaUsers,
    roles: ["ADMIN"],
  },
  {
    title: "Reports",
    path: "/reports",
    icon: FaChartBar,
  },
];