import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import UserManagement from "../pages/users/UserManagement";

// Customer
import CustomerList from "../pages/customers/CustomerList";
import CustomerForm from "../pages/customers/CustomerForm";
import CustomerDetail from "../pages/customers/CustomerDetail";

// Monthly Tax
import MonthlyTax from "../pages/taxes/MonthlyTax";
import MonthlyTaxDetail from "../pages/taxes/MonthlyTaxDetail";

// Annual Tax
import AnnualTax from "../pages/taxes/AnnualTax";
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
          <Route
            path="/"
            element={<Dashboard />}
          />

          {/* User Management */}
          <Route
            path="/users"
            element={<UserManagement />}
          />

          {/* Customers */}
          <Route
            path="/customers"
            element={<CustomerList />}
          />

          <Route
            path="/customers/new"
            element={<CustomerForm />}
          />

          <Route
            path="/customers/:id"
            element={<CustomerDetail />}
          />

          <Route
            path="/customers/:id/edit"
            element={<CustomerForm />}
          />

          {/* Monthly Tax */}
          <Route
            path="/taxes/monthly"
            element={<MonthlyTax />}
          />

          <Route
            path="/taxes/monthly/:id"
            element={<MonthlyTaxDetail />}
          />

          <Route
            path="/taxes/monthly/:month/customer/:id"
            element={<MonthlyTaxDetail />}
          />

          {/* Annual Tax */}
          <Route
            path="/taxes/annual"
            element={<AnnualTax />}
          />

          <Route
            path="/taxes/annual/:id"
            element={<AnnualTaxDetail />}
          />

          <Route
            path="/taxes/annual/:year/customer/:id"
            element={<AnnualTaxDetail />}
          />

          {/* Current Work */}
          <Route
            path="/tasks"
            element={<WorkBoard />}
          />

          <Route
            path="/tasks/:id"
            element={<WorkDetail />}
          />

          <Route
            path="/tasks/:month/customer/:id"
            element={<WorkDetail />}
          />

          {/* Reports */}
          <Route
            path="/reports"
            element={<Reports />}
          />

        </Route>
      </Route>

      {/* Redirect */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

      {/* หรือถ้าต้องการหน้า 404 จริง ๆ ใช้อันนี้แทน */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}