import {
  LoaderFunctionArgs,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { ShopBanner, ShopPageContent } from "../components";

// ⭐️ Đảm bảo từ khóa 'export' được sử dụng và luôn trả về null thay vì undefined.
export const shopCategoryLoader = async ({ params }: LoaderFunctionArgs) => {
  const { category } = params;

  // Trả về category (string) hoặc null.
  return category || null; 
};

const Shop = () => {
  // useLoaderData sẽ trả về category string hoặc null
  const category = useLoaderData() as string | null; 
  const [searchParams] = useSearchParams();
  
  // Kiểm tra nếu category là null, sử dụng một giá trị mặc định cho banner
  const bannerCategory = category === null ? "" : category;

  return (
    <div className="max-w-screen-2xl mx-auto pt-10">
      <ShopBanner category={bannerCategory} /> 
      <ShopPageContent
        category={bannerCategory}
        page={parseInt(searchParams.get("page") || "1")}
      />
    </div>
  );
};
export default Shop;