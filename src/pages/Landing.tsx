import {
  Banner,
  CategoriesSection,
  HomeCollectionSection,
  FeatureBar,         // ⭐️ Component mới
  CallToActionBanner, // ⭐️ Component mới
} from "../components";

const Landing = () => {
  return (
    <>
      {/* 1. Banner Chính */}
      <Banner />

      {/* 2. Thanh Tính Năng (Mới) */}
      <FeatureBar />

      {/* 3. Danh Mục Nổi Bật (Đã có, di chuyển lên) */}
      <CategoriesSection />

      {/* 4. Sản Phẩm Bán Chạy Nhất (Tái sử dụng HomeCollectionSection) */}
      <HomeCollectionSection
        title="Sản Phẩm Bán Chạy Nhất"
        limit={4} // Hiển thị 4 sản phẩm
        sortCriteria="popularity" // (Cần logic trong ProductGridWrapper để xử lý 'popularity')
      />

      {/* 5. Banner Kêu Gọi Hành Động (Mới) */}
      <CallToActionBanner />

      {/* 6. Hàng Mới Về (Tái sử dụng HomeCollectionSection) */}
      <HomeCollectionSection
        title="Hàng Mới Về"
        limit={4} // Hiển thị 4 sản phẩm
        sortCriteria="newest" // (Cần logic trong ProductGridWrapper để xử lý 'newest')
      />
    </>
  );
};

export default Landing;