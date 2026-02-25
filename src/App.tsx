import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShopLayout from './layouts/ShopLayout';
import AdminLayout from './layouts/AdminLayout';
import ShopHome from './pages/shop/Home';
import AdminDashboard from './pages/admin/Dashboard';
import AdminCarousels from './pages/admin/Carousels';
import AdminInventory from './pages/admin/Inventory';
import AdminOrders from './pages/admin/Orders';
import AdminFinance from './pages/admin/Finance';
import AdminPurchases from './pages/admin/Purchases';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Shop Routes */}
        <Route path="/" element={<ShopLayout />}>
          <Route index element={<ShopHome />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="carousels" element={<AdminCarousels />} />
          <Route path="inventory" element={<AdminInventory />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="finance" element={<AdminFinance />} />
          <Route path="purchases" element={<AdminPurchases />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
