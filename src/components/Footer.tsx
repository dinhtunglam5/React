  import SocialMediaFooter from "./SocialMediaFooter";
  import { HiChevronDown } from "react-icons/hi2";
  import { Link } from "react-router-dom"; 

  const Footer = () => {
    return (
      <>
        <SocialMediaFooter />
        {/* Cải thiện: Thay đổi nền sang xám nhạt và loại bỏ border thô */}
        <footer className="bg-gray-50 max-w-screen-2xl mx-auto px-5 pt-12 pb-8 max-[400px]:px-3">
          {/* Thay đổi layout thành justify-between để giãn cách đều các cột */}
          <div className="flex justify-between gap-12 text-left mt-8 max-[800px]:flex-col max-[800px]:gap-10 max-[800px]:text-center">
            
            {/* Cột 1: Client Service */}
            <div className="flex flex-col gap-3">
              {/* ⭐️ ĐÃ CẬP NHẬT: Thay border-secondaryBrown bằng border-primaryAccent */}
              <h3 className="text-xl font-bold text-gray-800 max-sm:text-lg border-b border-primaryAccent inline-block pb-1 max-[800px]:mx-auto">Dịch Vụ Khách Hàng</h3>
              {/* ⭐️ ĐÃ CẬP NHẬT: Thay hover:text-secondaryBrown bằng hover:text-primaryAccent */}
              <p className="text-base text-gray-600 hover:text-primaryAccent transition-colors cursor-pointer max-sm:text-sm">Chính sách Hậu mãi</p>
              <p className="text-base text-gray-600 hover:text-primaryAccent transition-colors cursor-pointer max-sm:text-sm">Bảo hành Sản phẩm</p>
              <Link to="/contact" className="text-base text-gray-600 hover:text-primaryAccent transition-colors cursor-pointer max-sm:text-sm">
                Liên Hệ
              </Link>
              <p className="text-base text-gray-600 hover:text-primaryAccent transition-colors cursor-pointer max-sm:text-sm">Chính sách đổi trả</p>
            </div>

            {/* Cột 2: Our Brand */}
            <div className="flex flex-col gap-3">
              {/* ⭐️ ĐÃ CẬP NHẬT: Thay border-secondaryBrown bằng border-primaryAccent */}
              <h3 className="text-xl font-bold text-gray-800 max-sm:text-lg border-b border-primaryAccent inline-block pb-1 max-[800px]:mx-auto">Về Thương Hiệu</h3>
              {/* ⭐️ ĐÃ CẬP NHẬT: Thay hover:text-secondaryBrown bằng hover:text-primaryAccent */}
              <p className="text-base text-gray-600 hover:text-primaryAccent transition-colors cursor-pointer max-sm:text-sm">Giới Thiệu Công Ty</p>
              <p className="text-base text-gray-600 hover:text-primaryAccent transition-colors cursor-pointer max-sm:text-sm">Thành Tựu & Giải Thưởng</p>
              <p className="text-base text-gray-600 hover:text-primaryAccent transition-colors cursor-pointer max-sm:text-sm">Lịch Sử Phát Triển</p>
              <Link to="/about" className="text-base text-gray-600 hover:text-primaryAccent transition-colors cursor-pointer max-sm:text-sm">Về Chúng Tôi</Link>
            </div>

            {/* Cột 3: Product Categories */}
            <div className="flex flex-col gap-3">
            {/* ⭐️ ĐÃ CẬP NHẬT: Thay border-secondaryBrown bằng border-primaryAccent */}
            <h3 className="text-xl font-bold text-gray-800 max-sm:text-lg border-b border-primaryAccent inline-block pb-1 max-[800px]:mx-auto">Danh Mục Sản Phẩm</h3>
            {/* ⭐️ ĐÃ CẬP NHẬT: Thay hover:text-secondaryBrown bằng hover:text-primaryAccent */}
            <Link to="/shop/dien-thoai" className="text-base text-gray-600 hover:text-primaryAccent transition-colors cursor-pointer max-sm:text-sm">Điện thoại</Link>
            <Link to="/shop/laptop" className="text-base text-gray-600 hover:text-primaryAccent transition-colors cursor-pointer max-sm:text-sm">Laptop & PC</Link>
            <Link to="/shop/tai-nghe" className="text-base text-gray-600 hover:text-primaryAccent transition-colors cursor-pointer max-sm:text-sm">Tai nghe</Link>
            <Link to="/shop/phu-kien" className="text-base text-gray-600 hover:text-primaryAccent transition-colors cursor-pointer max-sm:text-sm">Nhà thông minh</Link>
            </div>
            
            {/* Cột 4: Language/Region Selector and Logo */}
            <div className="flex flex-col gap-4 max-[800px]:mx-auto max-[800px]:text-center">
                <div className="flex flex-col gap-8">
                    {/* ⭐️ ĐÃ CẬP NHẬT: Thay hover:text-secondaryBrown bằng hover:text-primaryAccent */}
                    <p className="flex justify-start items-center text-lg gap-2 text-gray-700 cursor-pointer hover:text-primaryAccent transition-colors max-sm:text-base max-[800px]:justify-center">
                        Worldwide / English <HiChevronDown className="text-xl" />
                    </p>
                    {/* ⭐️ ĐÃ CẬP NHẬT: Thay text-secondaryBrown bằng text-primaryAccent */}
                    <h2 className="text-5xl font-extrabold text-primaryAccent tracking-[2.5px] max-sm:text-4xl max-[800px]:text-center">ZazelStore</h2>
                    <p className="text-sm text-gray-500 max-sm:text-xs max-[800px]:text-center">
                        All rights reserved ©2024
                    </p>
                </div>
            </div>
            
          </div>
          
          {/* Bản quyền */}
          <div className="border-t border-gray-200 mt-12 pt-6">
              <p className="text-center text-xs text-gray-500">
                  Lưu ý: Đây là dự án mẫu, không phải website thương mại điện tử thực tế. 
                  Vui lòng không nhập thông tin cá nhân.
              </p>
          </div>
        </footer>
      </>
    );
  };
  export default Footer;