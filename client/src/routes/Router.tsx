import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "../pages/auth/Login";
import { Layout } from "../layout/Layout";
import { ProtectedRoute } from "./ProtectedRoute";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { NotFound } from "../components/NotFound";
import { CreateCustomer } from "../pages/customers/CreateCustomer";
import { CustomerList } from "../pages/customers/CustomerList";
import { CreateProduct } from "../pages/products/CreateProduct";
import { EditProduct } from "../pages/products/EditProduct";
import { ProductList } from "../pages/products/ProductList";
import { InventoryReport } from "../pages/reports/inventoryReport/InventoryReport";
import { SalesReport } from "../pages/reports/salesReport/SalesReport";
import { NewSale } from "../pages/sales/newSale/NewSale";
import { SalesHistoryList } from "../pages/sales/saleHistory/SalesHistoryList";
import { CreateSupplier } from "../pages/suppliers/CreateSupplier";
import { SupplierList } from "../pages/suppliers/SupplierList";
import { Register } from "../pages/auth/Register";
import { CategoryList } from "../pages/categories/CategoryList";
import { EditCategory } from "../pages/categories/EditCategory";
import { CreateCategory } from "../pages/categories/CreateCategory";
import { EditSupplier } from "../pages/suppliers/EditSupplier";
import { EditCustomer } from "../pages/customers/EditCustomer";
import { SaleDetailList } from "../pages/sales/saleHistory/SaleDetailList";
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
            <Route path="categories/create" element={<CreateCategory />} />
            <Route
              path="categories/edit/:categoryId"
              element={<EditCategory />}
            />
            <Route path="products" element={<ProductList />} />
            <Route path="products/create" element={<CreateProduct />} />
            <Route path="products/edit/:productId" element={<EditProduct />} />
            <Route path="sales/history" element={<SalesHistoryList />} />
            <Route
              path="sales/history/:saleId/detail"
              element={<SaleDetailList />}
            />
            <Route path="customers" element={<CustomerList />} />
            <Route path="customers/create" element={<CreateCustomer />} />
            <Route
              path="customers/edit/:customerId"
              element={<EditCustomer />}
            />
            <Route path="suppliers" element={<SupplierList />} />
            <Route path="suppliers/create" element={<CreateSupplier />} />
            <Route
              path="suppliers/edit/:supplierId"
              element={<EditSupplier />}
            />
            <Route path="reports/sales" element={<SalesReport />} />
            <Route path="reports/inventory" element={<InventoryReport />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="sales/new" element={<NewSale />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
