import { useState } from "react";
import {
  Button,
  ProductGrid,
  ProductGridWrapper,
  ShowingSearchPagination,
} from "../components";
import { Form, useSearchParams } from "react-router-dom";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get("page") || "1")
  );

  return (
    <div className="max-w-screen-2xl mx-auto">

      {/* Thanh tìm kiếm sản phẩm điện tử */}
      <Form
        method="post"
        className="flex items-center mt-24 px-5 max-[400px]:px-3"
      >
        <input
          type="text"
          placeholder="Tìm kiếm điện thoại, laptop, phụ kiện..." 
          className="border border-gray-300 focus:border-gray-400 h-12 text-xl px-3 w-full outline-none max-sm:text-lg rounded-l-md"
          name="searchInput"
        />

        <div className="w-52 max-sm:w-40">
          <Button
            mode="brown"
            text="Tìm kiếm"
            type="submit"
            className="h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-r-md rounded-l-none"
          />
        </div>
      </Form>

      {/* Tiêu đề kết quả */}
      <div className="px-5">
        <h2 className="text-2xl font-semibold mt-10 mb-5">
          Kết quả tìm kiếm cho:
          <span className="text-indigo-600 ml-2">
            "{searchParams.get("query") || "Tất cả sản phẩm"}"
          </span>
        </h2>
      </div>

      {/* Danh sách sản phẩm điện tử theo từ khóa */}
      <ProductGridWrapper searchQuery={searchParams.get("query")!} page={currentPage}>
        <ProductGrid />
      </ProductGridWrapper>

      {/* Phân trang cho kết quả tìm kiếm */}
      <ShowingSearchPagination 
        page={currentPage} 
        setCurrentPage={setCurrentPage} 
      />

    </div>
  );
};

export default Search;
