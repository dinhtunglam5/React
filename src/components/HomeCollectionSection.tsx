import ProductGrid from "./ProductGrid";
import ProductGridWrapper from "./ProductGridWrapper";

// ⭐️ Đã cập nhật để nhận props linh hoạt
interface HomeCollectionProps {
  title: string;
  limit: number;
  sortCriteria?: "popularity" | "newest" | string; // Cho phép mở rộng
}

const HomeCollectionSection = ({
  title,
  limit,
  sortCriteria,
}: HomeCollectionProps) => {
  return (
    <div className="max-w-screen-2xl mx-auto mt-24 px-5 max-[400px]:px-3">
      <div className="flex items-center justify-between">
        <h2 className="text-black text-4xl font-bold tracking-tight max-sm:text-3xl">
          {title} {/* ⭐️ Dùng title từ prop */}
        </h2>
        {/* (Bạn có thể thêm nút "Xem tất cả" ở đây nếu muốn) */}
      </div>
      {/* ⭐️ Truyền sortCriteria và limit xuống Wrapper */}
      <ProductGridWrapper limit={limit} sortCriteria={sortCriteria}>
        <ProductGrid />
      </ProductGridWrapper>
    </div>
  );
};
export default HomeCollectionSection;