import React from "react";
import ProductItem from "./ProductItem";
import { nanoid } from "nanoid";

const ProductGrid = ({ products }: { products?: Product[] }) => {
    
  // Bổ sung logic hiển thị thông báo khi không có sản phẩm
  if (!products || products.length === 0) {
    return (
        <div className="text-center w-full mt-12 p-4 text-gray-600">
            <h3 className="text-xl font-semibold">Không tìm thấy sản phẩm nào phù hợp.</h3>
            <p className="mt-2">Vui lòng thử tìm kiếm hoặc bộ lọc khác.</p>
        </div>
    );
  }
    
  return (
    <div
      id="gridTop"
      className="max-w-screen-2xl flex flex-wrap justify-between items-center gap-y-8 mx-auto mt-12 max-xl:justify-start max-xl:gap-5 px-5 max-[400px]:px-3"
    >
      {/* Không cần kiểm tra products && products.map nữa vì đã kiểm tra ở trên */}
      {products.map((product: Product) => (
          <ProductItem
            key={nanoid()}
            id={product.id}
            image={product.image}
            title={product.title}
            category={product.category}
            price={product.price}
            popularity={product.popularity}
            stock={product.stock}
          />
        ))}
    </div>
  );
};
// Memoize the component to prevent unnecessary re-renders because of React.cloneElement
export default React.memo(ProductGrid);