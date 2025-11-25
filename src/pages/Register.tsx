import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components";
import { checkRegisterFormData } from "../utils/checkRegisterFormData";
import customFetch from "../axios/custom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get form data
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    // Check if form data is valid
    if (!checkRegisterFormData(data)) return;

    // Check if user with this email already exists
    const users = await customFetch.get("/users");
    const userExists = users.data.some(
      (user: { email: string }) => user.email === data.email
    );
    if (userExists) {
      toast.error("Email này đã được sử dụng"); // Translated
      return;
    }

    // Prepare user data for registration, defaulting role to 'user'
    const newUser = {
        ...data,
        role: 'user', // Gán vai trò mặc định là 'user'
        // Loại bỏ confirmPassword trước khi gửi lên db
        confirmPassword: undefined 
    };

    // Register user
    const response = await customFetch.post("/users", newUser);
    if (response.status === 201) {
      toast.success("Đăng ký thành công"); // Translated
      navigate("/login");
    } else {
      toast.error("Đã xảy ra lỗi. Vui lòng thử lại"); // Translated
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto pt-24 flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="max-w-md mx-auto flex flex-col gap-5 p-8 border border-gray-200 rounded-lg shadow-lg bg-white"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Đăng ký tài khoản
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-medium text-gray-700">
              Tên của bạn
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-lg py-3 px-4 w-full outline-none focus:border-indigo-500 transition duration-200 rounded-md"
              placeholder="Nhập tên"
              id="name"
              name="name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lastname" className="font-medium text-gray-700">
              Họ của bạn
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-lg py-3 px-4 w-full outline-none focus:border-indigo-500 transition duration-200 rounded-md"
              placeholder="Nhập họ"
              id="lastname"
              name="lastname"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email-register" className="font-medium text-gray-700">
              Email của bạn
            </label>
            <input
              type="email"
              className="bg-gray-50 border border-gray-300 text-lg py-3 px-4 w-full outline-none focus:border-indigo-500 transition duration-200 rounded-md"
              placeholder="Nhập địa chỉ email"
              id="email-register"
              name="email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="font-medium text-gray-700">
              Mật khẩu của bạn
            </label>
            <input
              type="password"
              className="bg-gray-50 border border-gray-300 text-lg py-3 px-4 w-full outline-none focus:border-indigo-500 transition duration-200 rounded-md"
              placeholder="Nhập mật khẩu"
              id="password"
              name="password"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword" className="font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              className="bg-gray-50 border border-gray-300 text-lg py-3 px-4 w-full outline-none focus:border-indigo-500 transition duration-200 rounded-md"
              placeholder="Xác nhận mật khẩu"
              id="confirmPassword"
              name="confirmPassword"
            />
          </div>
        </div>
        <Button 
            type="submit" 
            text="Đăng ký" 
            mode="brown" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 mt-2"
        />
        <Link
          to="/login"
          className="text-center text-sm text-gray-600 hover:text-indigo-600 transition duration-200"
        >
          Đã có tài khoản?{" "}
          <span className="font-semibold text-indigo-700 hover:text-indigo-600">
            Đăng nhập
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Register;