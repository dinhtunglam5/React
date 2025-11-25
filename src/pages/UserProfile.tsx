import { useEffect, useState } from "react";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import customFetch from "../axios/custom";
import { checkUserProfileFormData } from "../utils/checkUserProfileFormData";
import { setLoginStatus } from "../features/auth/authSlice";
import { store } from "../store";

// Thông tin người dùng
interface User {
  id: number | string;
  name: string;
  lastname: string;
  email: string;
  password?: string;
}

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();

  const logout = () => {
    toast.error("Bạn đã đăng xuất");
    localStorage.removeItem("user");
    store.dispatch(setLoginStatus(false));
    navigate("/login");
  };

  const fetchUser = async (userId: number | string) => {
    const response = await customFetch(`/users/${userId}`);
    setUser(response.data);
  };

  const updateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (!checkUserProfileFormData(data)) return;

    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;

    if (userId) {
      try {
        await customFetch.put(`/users/${userId}`, data);
      } catch (e) {
        toast.error("Cập nhật thất bại. Vui lòng thử lại!");
        return;
      }
      toast.success("Cập nhật hồ sơ thành công");
    } else {
      toast.error("Bạn cần đăng nhập để tiếp tục");
      navigate("/login");
    }
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user") || "{}").id;
    if (!userId) {
      toast.error("Bạn cần đăng nhập để truy cập trang này");
      navigate("/login");
    } else {
      fetchUser(userId);
    }
  }, [navigate]);

  return (
    <div className="max-w-screen-lg mx-auto mt-24 px-5">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-indigo-700">
        Thông Tin Tài Khoản
      </h1>

      <form
        className="flex flex-col gap-6 p-8 bg-white shadow-2xl rounded-xl"
        onSubmit={updateUser}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex flex-col gap-1">
            <label htmlFor="firstname" className="font-medium text-gray-700">
              Tên
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-lg py-3 px-4 rounded-md focus:border-indigo-500 outline-none transition"
              placeholder="Nhập tên của bạn"
              id="firstname"
              name="name"
              defaultValue={user?.name}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lastname" className="font-medium text-gray-700">
              Họ
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-lg py-3 px-4 rounded-md focus:border-indigo-500 outline-none transition"
              placeholder="Nhập họ"
              id="lastname"
              name="lastname"
              defaultValue={user?.lastname}
            />
          </div>

        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="bg-gray-50 border border-gray-300 text-lg py-3 px-4 rounded-md focus:border-indigo-500 outline-none transition"
            placeholder="Nhập email"
            id="email"
            name="email"
            defaultValue={user?.email}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-medium text-gray-700">
            Mật khẩu (bỏ trống nếu không thay đổi)
          </label>
          <input
            type="password"
            className="bg-gray-50 border border-gray-300 text-lg py-3 px-4 rounded-md focus:border-indigo-500 outline-none transition"
            placeholder="Nhập mật khẩu mới"
            id="password"
            name="password"
          />
        </div>

        <Button
          type="submit"
          text="Lưu Thay Đổi"
          mode="brown"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-semibold"
        />

        <Link
          to="/order-history"
          className="text-center text-lg text-indigo-600 font-semibold border-2 border-indigo-600 py-3 rounded-md hover:bg-indigo-50 transition"
        >
          Lịch Sử Mua Hàng
        </Link>

        <Button
          onClick={logout}
          text="Đăng Xuất"
          mode="white"
          className="bg-red-500 hover:bg-red-600 text-white py-3 font-semibold"
        />
      </form>
    </div>
  );
};

export default UserProfile;
