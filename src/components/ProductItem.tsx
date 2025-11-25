import { Link } from "react-router-dom";
import { formatCategoryName } from "../utils/formatCategoryName";

const ProductItem = ({
  id,
  image,
  title,
  category,
  price,
  popularity: _popularity,
  stock: _stock,
}: {
  id: string;
  image: string;
  title: string;
  category: string;
  price: number;
  popularity: number;
  stock: number;
}) => {
  return (
    // Cải thiện: Thêm card style (shadow, rounded) và hover effect cho toàn bộ item
    <div className="w-[400px] flex flex-col gap-3 max-md:w-[300px] bg-white p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
      <Link
        to={`/product/${id}`}
        // Cải thiện: Sử dụng aspect-square (1:1), thêm transition và hiệu ứng hover
        className="w-full aspect-square overflow-hidden rounded-lg block"
      >
        <img 
          src={`/assets/${image}`} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>
      
      <div className="flex flex-col items-center justify-center gap-1 mt-2">
        <Link
          to={`/product/${id}`}
          // ⭐️ ĐÃ CẬP NHẬT: Thay hover:text-secondaryBrown bằng hover:text-primaryAccent
          className="text-black text-center text-xl font-semibold tracking-wide max-md:text-lg hover:text-primaryAccent transition-colors"
        >
          <h2>{title}</h2>
        </Link>
        <p className="text-gray-500 text-sm tracking-wide text-center max-md:text-xs">
          {formatCategoryName(category)}{" "}
        </p>
        <p className="text-black text-2xl text-center font-bold max-md:text-xl mt-1">
          ${price}
        </p>
      </div>

      <div className="w-full flex flex-col gap-1 mt-2">
        {/* Sử dụng giao diện nút đã cải thiện */}
        <Link
          // ⭐️ ĐÃ CẬP NHẬT: Thay bg-secondaryBrown và hover:bg-[#6c4e40] bằng primaryAccent
          to={`/product/${id}`}
          className="text-white bg-primaryAccent text-center text-lg font-medium w-full h-10 flex items-center justify-center rounded-lg hover:bg-primaryAccent/90 transition-colors max-md:text-base"
        >
          Xem sản phẩm
        </Link>
        {/* Đã xóa nút "Add to cart" thứ hai để giữ giao diện clean, vì việc thêm hàng thường xảy ra ở trang chi tiết */}
      </div>
    </div>
  );
};

export default ProductItem;