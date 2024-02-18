import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { Login } from "../pages/auth/Login";
import { Layout } from "../layout/Layout";
import { ProtectedRoute } from "./ProtectedRoute";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { NotFound } from "../components/NotFound";
import { AddCustomer } from "../pages/customers/AddCustomer";
import { CustomerList } from "../pages/customers/CustomerList";
import { AddProduct } from "../pages/inventory/AddProduct";
import { EditProduct } from "../pages/inventory/EditProduct";
import { InventoryList } from "../pages/inventory/InventoryList";
import { InventoryReport } from "../pages/reports/InventoryReport";
import { SalesReport } from "../pages/reports/SalesReport";
import { NewSale } from "../pages/sales/NewSale";
import { SalesHistory } from "../pages/sales/SalesHistory";
import { AddSupplier } from "../pages/suppliers/AddSupplier";
import { SupplierList } from "../pages/suppliers/SupplierList";
import { Register } from "../pages/auth/Register";
export const Router = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="sales/new" element={<NewSale />} />
              <Route path="sales/history" element={<SalesHistory />} />
              <Route path="inventory" element={<InventoryList />} />
              <Route path="inventory/add" element={<AddProduct />} />
              <Route
                path="inventory/edit/:productId"
                element={<EditProduct />}
              />
              <Route path="customers" element={<CustomerList />} />
              <Route path="customers/add" element={<AddCustomer />} />
              <Route path="suppliers" element={<SupplierList />} />
              <Route path="suppliers/add" element={<AddSupplier />} />
              <Route path="reports/sales" element={<SalesReport />} />
              <Route path="reports/inventory" element={<InventoryReport />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
