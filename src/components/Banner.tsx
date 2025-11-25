import { Link } from "react-router-dom";

const Banner = () => {
  return (
    // Cải thiện: Tăng chiều cao banner, căn giữa nội dung theo chiều dọc
    <div className="banner w-full flex flex-col justify-center items-center h-[700px] max-sm:h-[550px] gap-6 max-sm:gap-4">
      {/* Thêm một lớp phủ mờ (backdrop) để tăng khả năng đọc của văn bản trắng trên nền ảnh */}
      <div className="p-4 bg-black/20 rounded-xl backdrop-blur-sm flex flex-col items-center justify-center gap-4"> 
        <h2 className="text-white text-center text-7xl font-extrabold tracking-wider leading-[80px] max-sm:text-4xl max-[400px]:text-3xl drop-shadow-lg">
          Khám Phá Tương Lai <br />
          Công Nghệ
        </h2>
        <h3 className="text-white text-3xl font-light leading-[40px] tracking-wider max-sm:text-xl max-[400px]:text-lg drop-shadow-lg">
          Hiệu suất. Chất lượng. Đổi mới.
        </h3>
      </div>
      
      {/* Sử dụng giao diện nút đã cải thiện */}
      <div className="flex justify-center items-center gap-5 pt-4 max-[400px]:flex-col max-[400px]:gap-2 w-[480px] max-sm:w-[350px] max-[400px]:w-[300px]">
        {/* Nút 1: Shop Now - Giao diện nâu */}
        <Link 
          to="/shop" 
          className="text-white bg-secondaryBrown text-center text-xl font-medium w-full h-12 flex items-center justify-center rounded-lg hover:bg-[#6c4e40] transition-colors max-md:text-base shadow-lg"
        >
          Mua ngay
        </Link>
        {/* Nút 2: View Collection - Giao diện trong suốt */}
        <Link 
          to="/shop" 
          className="text-white border-white border-2 text-center text-xl font-medium w-full h-12 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors max-md:text-base"
        >
          Xem Bộ Sưu Tập
        </Link>
      </div>
    </div>
  );
};
export default Banner;