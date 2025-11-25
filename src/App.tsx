import { RouterProvider, createBrowserRouter, Outlet, NavLink } from "react-router-dom";
import {
  Cart, Checkout, HomeLayout, Landing, Login, OrderConfirmation, OrderHistory,
  Register, Search, Shop, SingleOrderHistory, SingleProduct, UserProfile, AdminOrders,
  // ⭐️ ĐÃ THÊM IMPORT
  About,
  Contact, 
} from "./pages"; // Giả định các pages khác đã được import từ index.ts trong thư mục pages
import AdminProducts from "./pages/AdminProducts"; // Import trang AdminProducts
import { checkoutAction, searchAction } from "./actions/index";
import { shopCategoryLoader } from "./pages/Shop";
import { loader as orderHistoryLoader } from "./pages/OrderHistory";
import { loader as singleOrderLoader } from "./pages/SingleOrderHistory";
// ✅ Đã sửa lỗi: Import named export 'singleProductLoader' trực tiếp.

// Component Layout đơn giản cho Admin
const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Admin Header/Sidebar chung */}
            <header className="p-4 bg-white shadow-md border-b">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-extrabold text-indigo-700">ADMIN PANEL</h1>
                    <nav className="space-x-6">
                        <NavLink 
                            to="/admin/products" 
                            className={({ isActive }) => (isActive ? 'font-bold text-indigo-700 border-b-2 border-indigo-700 pb-1' : 'text-gray-600 hover:text-indigo-500')}
                        >
                            Quản lý Sản phẩm
                        </NavLink>
                        <NavLink 
                            to="/admin/orders" 
                            className={({ isActive }) => (isActive ? 'font-bold text-indigo-700 border-b-2 border-indigo-700 pb-1' : 'text-gray-600 hover:text-indigo-500')}
                        >
                            Quản lý Đơn hàng
                        </NavLink>
                    </nav>
                </div>
            </header>
            
            {/* Nội dung Admin Page */}
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <Outlet /> 
            </div>
        </div>
    );
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout />,
        children: [
            // --- USER ROUTES ---
            { index: true, element: <Landing /> },
            { path: "shop", element: <Shop />, loader: shopCategoryLoader },
            { path: "shop/:category", element: <Shop />, loader: shopCategoryLoader },
            { path: "product/:id", element: <SingleProduct /> },
            { path: "cart", element: <Cart /> },
            { path: "checkout", element: <Checkout />, action: checkoutAction },
            { path: "order-confirmation", element: <OrderConfirmation /> },
            { path: "search", element: <Search />, action: searchAction },
            { path: "order-history", element: <OrderHistory />, loader: orderHistoryLoader },
            { path: "order-history/:id", element: <SingleOrderHistory />, loader: singleOrderLoader },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "user-profile", element: <UserProfile /> },
            
            // ⭐️ ĐÃ THÊM LẠI CÁC TRANG MỚI
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
        ],
    },
    // --- ADMIN ROUTES ---
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminProducts />, 
            },
            {
                path: "products",
                element: <AdminProducts />,
            },
            {
                path: "orders",
                element: <AdminOrders />,
            },
            {
                path: "orders/:id",
                element: 
                    <div className="text-center p-10 bg-white rounded-lg shadow-xl">
                        <h2 className="text-2xl font-bold text-indigo-700 mb-4">Trang Chi Tiết Đơn Hàng (Admin View)</h2>
                        <p className="text-gray-600">
                            Đây là placeholder. Vui lòng triển khai component xem/sửa chi tiết đơn hàng tại đây.
                        </p>
                    </div>, 
            },
        ],
    }
]);

const App = () => {
    return <RouterProvider router={router} />;
};

export default App;