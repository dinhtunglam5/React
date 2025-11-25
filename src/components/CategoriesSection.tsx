import CategoryItem from "./CategoryItem";

const CategoriesSection = () => {
  return (
    <div className="max-w-screen-2xl px-5 mx-auto mt-24">
      <h2 className="text-black text-5xl font-normal tracking-[1.56px] max-sm:text-4xl mb-12">
        Our Categories
      </h2>
      <div className="flex justify-between flex-wrap gap-y-10">
        <CategoryItem
          categoryTitle="Sản phẩm Mới" // Đã Sửa
          image="image_9565e7.png" // ⬅️ Cập nhật tên file ảnh thực tế
          link="san-pham-moi" // Đã Sửa
        />
        <CategoryItem
          categoryTitle="Hàng Cao Cấp" // Đã Sửa
          image="image_956606.png" // ⬅️ Cập nhật tên file ảnh thực tế
          link="hang-cao-cap" // Đã Sửa
        />
        <CategoryItem
          categoryTitle="Giảm Giá Lớn" // Đã Sửa
          image="image_95660f.png" // ⬅️ Cập nhật tên file ảnh thực tế
          link="giam-gia-lon" // Đã Sửa
        />
        <CategoryItem
          categoryTitle="Bán Chạy Nhất" // Đã Sửa
          image="image_95662e.png" // ⬅️ Cập nhật tên file ảnh thực tế
          link="ban-chay-nhat" // Đã Sửa
        />
      </div>
    </div>
  );
};
export default CategoriesSection;