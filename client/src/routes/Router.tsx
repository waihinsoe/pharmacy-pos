import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/auth/Login";
import { Layout } from "../layout/Layout";
import { ProtectedRoute } from "./ProtectedRoute";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { NotFound } from "../components/NotFound";
import { AddCustomer } from "../pages/customers/AddCustomer";
import { CustomerList } from "../pages/customers/CustomerList";
import { AddProduct } from "../pages/products/AddProduct";
import { EditProduct } from "../pages/products/EditProduct";
import { ProductList } from "../pages/products/ProductList";
import { ProdcutReport } from "../pages/reports/ProductReport";
import { SalesReport } from "../pages/reports/SalesReport";
import { NewSale } from "../pages/sales/NewSale";
import { SalesHistory } from "../pages/sales/SalesHistory";
import { AddSupplier } from "../pages/suppliers/AddSupplier";
import { SupplierList } from "../pages/suppliers/SupplierList";
import { Register } from "../pages/auth/Register";
import { CategoryList } from "../pages/categories/CategoryList";
export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="products" element={<ProductList />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:productId" element={<EditProduct />} />
            <Route path="sales/new" element={<NewSale />} />
            <Route path="sales/history" element={<SalesHistory />} />
            <Route path="customers" element={<CustomerList />} />
            <Route path="customers/add" element={<AddCustomer />} />
            <Route path="suppliers" element={<SupplierList />} />
            <Route path="suppliers/add" element={<AddSupplier />} />
            <Route path="reports/sales" element={<SalesReport />} />
            <Route path="reports/products" element={<ProdcutReport />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
