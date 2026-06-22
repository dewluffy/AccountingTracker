import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import UserManagement from "../pages/users/UserManagement";

// Customer
import CustomerList from "../pages/customers/CustomerList";
import CustomerDetail from "../pages/customers/CustomerDetail";
import CustomerCreate from "../pages/customers/CustomerCreate";
import CustomerEdit from "../pages/customers/CustomerEdit";

// Monthly Tax
import MonthlyTaxList from "../pages/taxes/MonthlyTaxList";
import MonthlyTaxDetail from "../pages/taxes/MonthlyTaxDetail";

// Annual Tax
import AnnualTaxList from "../pages/taxes/AnnualTaxList";
import AnnualTaxDetail from "../pages/taxes/AnnualTaxDetail";

// Current Work
import WorkBoard from "../pages/tasks/WorkBoard";
import WorkDetail from "../pages/tasks/WorkDetail";

// Reports
import Reports from "../pages/reports/Reports";

// Common
import NotFound from "../pages/NotFound";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Protected Area */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          {/* Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* User Management */}
          <Route path="/users" element={<UserManagement />} />

          {/* Customers */}
          <Route path="/customers" element={<CustomerList />} />

          <Route path="/customers/:id" element={<CustomerDetail />} />

          <Route path="/customers/new" element={<CustomerCreate />} />

          <Route path="/customers/:id/edit" element={<CustomerEdit />} />

          {/* Monthly Tax */}
          <Route path="/taxes/monthly" element={<MonthlyTaxList />} />

          <Route path="/taxes/monthly/:id" element={<MonthlyTaxDetail />} />

          {/* Annual Tax */}
          <Route path="/taxes/annual" element={<AnnualTaxList />} />

          <Route path="/taxes/annual/:id" element={<AnnualTaxDetail />} />

          {/* Current Work */}
          <Route path="/tasks" element={<WorkBoard />} />

          <Route path="/tasks/:id" element={<WorkDetail />} />

          {/* Reports */}
          <Route path="/reports" element={<Reports />} />

        </Route>
      </Route>

      {/* Redirect */}
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
