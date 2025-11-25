import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  return (
    <div className="max-w-screen-2xl mx-auto pt-20 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold text-center text-green-600 mb-4">
        Đặt Hàng Thành Công!
      </h1>
      <h2 className="text-4xl font-light text-center">
        Xác Nhận Đơn Hàng
      </h2>
      <p className="text-center mt-5 text-xl max-w-lg">
        Đơn hàng của bạn đã được xác nhận và sẽ sớm được giao đi. Cảm ơn bạn đã mua sắm tại cửa hàng điện tử của chúng tôi!
      </p>
      <Link
        to="/shop"
        className="text-white bg-indigo-600 hover:bg-indigo-700 text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-[400px] mx-auto mt-8 h-12 flex items-center justify-center max-md:text-base rounded-md transition duration-200"
      >
        Tiếp tục mua sắm
      </Link>
      <Link
        to="/order-history"
        className="text-indigo-600 bg-white border-2 border-indigo-600 hover:bg-indigo-50 text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-[400px] mx-auto mt-4 h-12 flex items-center justify-center max-md:text-base rounded-md transition duration-200"
      >
        Xem lịch sử và trạng thái đơn hàng
      </Link>
    </div>
  );
};
export default OrderConfirmation;