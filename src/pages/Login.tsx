import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { checkLoginFormData } from "../utils/checkLoginFormData";
import customFetch from "../axios/custom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get form data
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    // Check if form data is valid
    if (!checkLoginFormData(data)) return;
    
    // Check if user with the email and password exists
    const users = await customFetch.get("/users");
    let userData: any = null; // Object to store user data including role
    
    const userExists = users.data.some(
      (user: { id: number; email: string; password: string, role?: string }) => {
        if (user.email === data.email && user.password === data.password) {
          userData = user;
          return true;
        }
        return false;
      }
    );
    
    // if user exists, show success message
    if (userExists && userData) {
      toast.success("Đăng nhập thành công!"); 
      // LƯU TOÀN BỘ DỮ LIỆU NGƯỜI DÙNG, BAO GỒM CẢ ROLE, VÀO LOCAL STORAGE
      localStorage.setItem("user", JSON.stringify(userData)); 
      store.dispatch(setLoginStatus(true));
      
      // Kiểm tra vai trò để điều hướng
      if (userData.role === 'admin') {
          navigate("/admin/products"); // Điều hướng đến trang admin
      } else {
          navigate("/user-profile"); // Điều hướng đến trang profile của user
      }
    } else {
        toast.error("Email hoặc mật khẩu không chính xác!");
    }
  };

  useEffect(() => {
    // Nếu người dùng đã đăng nhập, chuyển hướng đi nơi khác.
    const userString = localStorage.getItem('user');
    if (userString) {
        try {
            const user = JSON.parse(userString);
            if (user.role === 'admin') {
                navigate('/admin/products');
            } else {
                navigate('/user-profile');
            }
        } catch (e) {
            console.error("Lỗi đọc user từ localStorage", e);
        }
    }
  }, [navigate]);

  return (
    <div className="max-w-screen-2xl mx-auto pt-24 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="max-w-md mx-auto flex flex-col gap-5 p-8 border border-gray-200 rounded-lg shadow-lg bg-white"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Đăng nhập
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-medium text-gray-700">
              Email của bạn
            </label>
            <input
              type="email"
              className="bg-gray-50 border border-gray-300 text-lg py-3 px-4 w-full outline-none focus:border-indigo-500 transition duration-200 rounded-md"
              placeholder="Nhập địa chỉ email"
              name="email"
              id="email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password-login" className="font-medium text-gray-700">
              Mật khẩu của bạn
            </label>
            <input
              type="password"
              className="bg-gray-50 border border-gray-300 text-lg py-3 px-4 w-full outline-none focus:border-indigo-500 transition duration-200 rounded-md"
              placeholder="Nhập mật khẩu"
              name="password"
              id="password-login"
            />
          </div>
        </div>
        <Button 
            type="submit" 
            text="Đăng nhập" 
            mode="brown" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 mt-2"
        />
        <Link
          to="/register"
          className="text-center text-sm text-gray-600 hover:text-indigo-600 transition duration-200"
        >
          Chưa có tài khoản?{" "}
          <span className="font-semibold text-indigo-700 hover:text-indigo-600">
            Đăng ký ngay
          </span>
        </Link>
      </form>
    </div>
  );
};
export default Login;