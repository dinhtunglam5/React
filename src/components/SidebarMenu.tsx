import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  HiXMark,
  HiOutlineHome,
  HiOutlineShoppingBag,
  HiOutlineMagnifyingGlass,
  HiOutlineShoppingCart,
  HiOutlineArrowRightOnRectangle,
  HiOutlineUserPlus,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineInformationCircle,
  HiOutlineEnvelope,
  HiOutlineUserCircle,
  HiOutlineArchiveBox,
} from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";

const SidebarMenu = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (prev: boolean) => void;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { loginStatus } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const closeSidebar = () => setIsSidebarOpen(false);

  const logout = () => {
    toast.error("Đã đăng xuất thành công");
    localStorage.removeItem("user");
    store.dispatch(setLoginStatus(false));
    closeSidebar(); // Đóng sidebar sau khi logout
    navigate("/login");
  };

  useEffect(() => {
    if (isSidebarOpen) {
      setIsAnimating(true);
    } else {
      // Đợi animation (300ms) kết thúc rồi mới gỡ component
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isSidebarOpen]);

  // Định nghĩa link style để tái sử dụng
  const linkStyle =
    "flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors duration-200";
  const iconStyle = "w-6 h-6";

  return (
    <>
      {/* Backdrop mờ */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isSidebarOpen ? "bg-black/50" : "bg-black/0 pointer-events-none"
        }`}
        onClick={closeSidebar}
      />

      {/* Sidebar Content */}
      {(isSidebarOpen || isAnimating) && (
        <div
          className={`fixed top-0 left-0 w-72 z-50 h-full transition-transform duration-300 ease-in-out bg-white shadow-xl transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header của Sidebar */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link
              to="/"
              className="text-2xl font-bold text-indigo-600"
              onClick={closeSidebar}
            >
              ZazelStore
            </Link>
            <HiXMark
              className="text-3xl text-gray-500 cursor-pointer hover:text-gray-800"
              onClick={closeSidebar}
            />
          </div>

          {/* Danh sách Link */}
          <nav className="p-4 flex flex-col gap-1">
            <Link to="/" className={linkStyle} onClick={closeSidebar}>
              <HiOutlineHome className={iconStyle} />
              <span className="font-medium">Home</span>
            </Link>
            <Link to="/shop" className={linkStyle} onClick={closeSidebar}>
              <HiOutlineShoppingBag className={iconStyle} />
              <span className="font-medium">Shop</span>
            </Link>
            <Link to="/search" className={linkStyle} onClick={closeSidebar}>
              <HiOutlineMagnifyingGlass className={iconStyle} />
              <span className="font-medium">Search</span>
            </Link>

            <hr className="my-2 border-gray-200" />

            <Link to="/about" className={linkStyle} onClick={closeSidebar}>
              <HiOutlineInformationCircle className={iconStyle} />
              <span className="font-medium">Về Chúng Tôi</span>
            </Link>
            <Link to="/contact" className={linkStyle} onClick={closeSidebar}>
              <HiOutlineEnvelope className={iconStyle} />
              <span className="font-medium">Liên Hệ</span>
            </Link>

            <hr className="my-2 border-gray-200" />

            {/* Link dựa trên trạng thái Login */}
            {loginStatus ? (
              <>
                <Link to="/user-profile" className={linkStyle} onClick={closeSidebar}>
                  <HiOutlineUserCircle className={iconStyle} />
                  <span className="font-medium">Tài Khoản Của Tôi</span>
                </Link>
                <Link to="/order-history" className={linkStyle} onClick={closeSidebar}>
                  <HiOutlineArchiveBox className={iconStyle} />
                  <span className="font-medium">Đơn Hàng Của Tôi</span>
                </Link>
                <button
                  onClick={logout}
                  className={`${linkStyle} text-red-600 hover:bg-red-50 hover:text-red-700 w-full text-left`}
                >
                  <HiOutlineArrowLeftOnRectangle className={iconStyle} />
                  <span className="font-medium">Đăng Xuất</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={linkStyle} onClick={closeSidebar}>
                  <HiOutlineArrowRightOnRectangle className={iconStyle} />
                  <span className="font-medium">Sign in</span>
                </Link>
                <Link to="/register" className={linkStyle} onClick={closeSidebar}>
                  <HiOutlineUserPlus className={iconStyle} />
                  <span className="font-medium">Sign up</span>
                </Link>
              </>
            )}

            <hr className="my-2 border-gray-200" />

            {/* Link Giỏ hàng (luôn ở cuối) */}
            <Link to="/cart" className={linkStyle} onClick={closeSidebar}>
              <HiOutlineShoppingCart className={iconStyle} />
              <span className="font-medium">Giỏ Hàng</span>
            </Link>
          </nav>
        </div>
      )}
    </>
  );
};
export default SidebarMenu;