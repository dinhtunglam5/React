import React, { ReactElement, useCallback, useEffect, useState } from "react";
import customFetch from "../axios/custom";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  setShowingProducts,
  setTotalProducts,
} from "../features/shop/shopSlice";

const ProductGridWrapper = ({
  searchQuery,
  sortCriteria,
  category,
  page,
  limit,
  children,
}: {
  searchQuery?: string;
  sortCriteria?: string;
  category?: string;
  page?: number;
  limit?: number;
  children:
    | ReactElement<{ products: Product[] }>
    | ReactElement<{ products: Product[] }>[];
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { totalProducts } = useAppSelector((state) => state.shop);
  const dispatch = useAppDispatch();

  // Memoize the function to prevent unnecessary re-renders
  // getSearchedProducts will be called only when searchQuery or sortCriteria changes
  const getSearchedProducts = useCallback(
    async (query: string, sort: string, page: number) => {
      if (!query || query.length === 0) {
        query = "";
      }
      // Dùng try...catch để bắt lỗi fetch nếu cần
      try {
        const response = await customFetch("/products");
        const allProducts = await response.data;
        let searchedProducts = allProducts.filter((product: Product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );

        if (category) {
          searchedProducts = searchedProducts.filter((product: Product) => {
            return product.category === category;
          });
        }

        if (totalProducts !== searchedProducts.length) {
          dispatch(setTotalProducts(searchedProducts.length));
        }

        // Sort the products based on the sortCriteria
        if (sort === "price-asc") {
          searchedProducts = searchedProducts.sort(
            (a: Product, b: Product) => a.price - b.price
          );
        } else if (sort === "price-desc") {
          searchedProducts = searchedProducts.sort(
            (a: Product, b: Product) => b.price - a.price
          );
        } else if (sort === "popularity") {
          searchedProducts = searchedProducts.sort(
            (a: Product, b: Product) => b.popularity - a.popularity
          );
        }
        
        // Logic cắt (slice) sản phẩm theo limit hoặc page
        let finalProducts: Product[] = [];
        if (limit) {
            finalProducts = searchedProducts.slice(0, limit);
        } else if (page) {
            finalProducts = searchedProducts.slice(0, page * 9);
        } else {
            finalProducts = searchedProducts;
        }

        setProducts(finalProducts);
        dispatch(setShowingProducts(finalProducts.length));
      } catch (error) {
          console.error("Lỗi khi fetch sản phẩm:", error);
          setProducts([]); // Đặt về mảng rỗng nếu có lỗi
          dispatch(setTotalProducts(0));
          dispatch(setShowingProducts(0));
      }
    },
    [category, dispatch, totalProducts] // Thêm dependencies cần thiết
  );

  useEffect(() => {
    getSearchedProducts(searchQuery || "", sortCriteria || "", page || 1);
  }, [getSearchedProducts, searchQuery, sortCriteria, page]);

  // Clone the children and pass the products as props to the children
  // BỎ ĐIỀU KIỆN `products.length > 0` để component con luôn được render.
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { products: products });
    }
    return null;
  });

  return childrenWithProps;
};
export default ProductGridWrapper;