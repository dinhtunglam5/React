import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import customFetch from "../axios/custom";
import { formatDate } from "../utils/formatDate";

interface Order {
    id: string;
    orderDate: string;
    subtotal: number;
    orderStatus: string;
    user: { id: number | string }; 
}

export const loader = async () => {
  try {
    const response = await customFetch.get("/orders");
    
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
};

const OrderHistory = () => {
  const [user] = useState(JSON.parse(localStorage.getItem("user") || "{}"));
  const orders = useLoaderData() as Order[];
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      toast.error("Vui lòng đăng nhập để xem trang này"); 
      navigate("/login");
    }
  }, [user, navigate]);

  // Lọc đơn hàng của người dùng hiện tại
  const userOrders = orders.filter(
    (order) => order?.user && order.user.id === user.id
  );

  return (
    <div className="max-w-screen-2xl mx-auto pt-20 px-5">
      <h1 className="text-3xl font-bold mb-8">Lịch Sử Đơn Hàng</h1> 
      {userOrders.length === 0 && (
        <p className="text-center text-xl text-gray-600 mt-10">
          Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm sản phẩm điện tử ngay!
        </p>
      )}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-4 border-b text-left">Mã Đơn hàng</th>
              <th className="py-3 px-4 border-b text-center">Ngày Đặt</th>
              <th className="py-3 px-4 border-b text-center">Tổng cộng</th>
              <th className="py-3 px-4 border-b text-center">Trạng thái</th>
              <th className="py-3 px-4 border-b text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b text-left font-medium text-indigo-700">{order.id}</td>
                <td className="py-3 px-4 border-b text-center">{ formatDate(order.orderDate) }</td>
                <td className="py-3 px-4 border-b text-center font-semibold">
                  ${(order.subtotal + 5 + (order.subtotal / 5)).toFixed(2)}
                </td>
                <td className={`py-3 px-4 border-b text-center font-medium ${order.orderStatus === 'Processing' ? 'text-yellow-600' : 'text-green-600'}`}>
                  { order.orderStatus === 'Processing' ? 'Đang xử lý' : 'Đã giao' }
                </td>
                <td className="py-3 px-4 border-b text-center">
                  <Link
                    to={`/order-history/${order.id}`}
                    className="text-indigo-600 hover:underline font-medium"
                  >
                    Xem Chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrderHistory;