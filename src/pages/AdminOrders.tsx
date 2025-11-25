import { useState, useEffect, useCallback } from 'react';
import customFetch from '../axios/custom'; // Import customFetch thực tế
import toast from 'react-hot-toast'; // Giả định đã cài đặt react-hot-toast
import { NavLink } from 'react-router-dom';
import { HiEye as EyeIcon } from 'react-icons/hi2'; 
// Giả định import component Button

// Định nghĩa Interfaces
interface CustomerData { 
    emailAddress: string; 
    firstName: string; 
    lastName: string; 
}
interface OrderProduct { id: string; title: string; price: number; quantity: number; }
type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

interface Order {
    id: string; 
    data: CustomerData; 
    products: OrderProduct[];
    orderStatus: OrderStatus; 
    orderDate: string;
}

// Hàm tiện ích: Format tiền tệ
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'USD' }).format(amount);
};

// Component Pill hiển thị trạng thái (giữ nguyên)
const OrderStatusPill: React.FC<{ status: OrderStatus }> = ({ status }) => {
    let colorClass = 'bg-gray-100 text-gray-800';
    if (status === 'Processing') colorClass = 'bg-yellow-100 text-yellow-800';
    if (status === 'Shipped') colorClass = 'bg-blue-100 text-blue-800';
    if (status === 'Delivered') colorClass = 'bg-green-100 text-green-800';
    if (status === 'Cancelled') colorClass = 'bg-red-100 text-red-800';

    return (
        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClass}`}>
            {status}
        </span>
    );
};

const AdminOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const statusOptions: OrderStatus[] = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];

    // --- READ: Fetch danh sách đơn hàng ---
    const fetchOrders = useCallback(async () => {
        setIsLoading(true);
        try {
            // Giả định endpoint là /orders
            const response = await customFetch.get('/orders');
            setOrders(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            toast.error('Không thể tải đơn hàng');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // Hàm tính tổng giá trị đơn hàng (giữ nguyên)
    const calculateOrderTotal = (products: OrderProduct[]) => {
        return products.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    // --- UPDATE: Cập nhật trạng thái đơn hàng (giữ nguyên) ---
    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        try {
            // Sử dụng PATCH để cập nhật một phần tài nguyên (chỉ trạng thái)
            await customFetch.patch(`/orders/${orderId}`, { orderStatus: newStatus });
            toast.success(`Cập nhật trạng thái đơn hàng ${orderId} thành ${newStatus}`);
            
            // Cập nhật state local
            setOrders(prev => prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o));
        } catch (error) {
            toast.error('Cập nhật trạng thái thất bại');
            console.error(error);
        }
    };
    
    // Render
    return (
        <div className="max-w-screen-2xl mx-auto pt-8 px-5">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Quản Lý Đơn Hàng</h1>
            
            {isLoading ? (
                <div className="text-center p-10 text-xl text-indigo-600">Đang tải dữ liệu đơn hàng...</div>
            ) : orders.length === 0 ? (
                <div className="text-center p-10 text-xl text-gray-500 border rounded-lg">Chưa có đơn hàng nào trong hệ thống.</div>
            ) : (
                <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Đơn Hàng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách Hàng</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng Giá Trị</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày Đặt</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                    {/* DÒNG ĐÃ SỬA LỖI */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {/* Sử dụng optional chaining (?.) để tránh lỗi nếu 'data' hoặc 'firstName/lastName' là undefined */}
                                        {order.data?.firstName && order.data?.lastName 
                                            ? `${order.data.firstName} ${order.data.lastName}`
                                            : order.data?.emailAddress || 'Khách hàng ẩn danh'
                                        }
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                                        {formatCurrency(calculateOrderTotal(order.products))}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <OrderStatusPill status={order.orderStatus} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium flex items-center justify-center space-x-2">
                                        {/* Dropdown cập nhật trạng thái */}
                                        <select
                                            value={order.orderStatus}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                                            className="border border-gray-300 rounded-lg p-1 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            {statusOptions.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                        
                                        {/* Nút xem chi tiết */}
                                        <NavLink 
                                            to={`/admin/orders/${order.id}`} // Route chi tiết
                                            className="text-indigo-600 hover:text-indigo-900"
                                        >
                                            {/* Giả định EyeIcon được render đúng */}
                                            <EyeIcon className="w-5 h-5 inline-block" /> 
                                        </NavLink>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;