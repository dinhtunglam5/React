import {
  Button,
  Dropdown,
  ProductItem,
} from "../components"; 
import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { addProductToTheCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../hooks";
// ĐÃ XÓA imports HOC gây lỗi:
// import WithSelectInputWrapper from "../utils/withSelectInputWrapper";
// import WithNumberInputWrapper from "../utils/withNumberInputWrapper";
import toast from "react-hot-toast";

// >>> ĐỊNH NGHĨA KIỂU DỮ LIỆU MỚI <<<
interface StorageOption {
  name: string;
  price_diff: number;
}
interface ProductWithStorageOption extends Omit<Product, 'storage'> {
    storage: StorageOption[];
    colors: string[];
}
interface ProductInCartWithOption extends Omit<Product, 'storage' | 'colors'> {
    quantity: number;
    storage: string;
    color: string;
}
// >>> KẾT THÚC ĐỊNH NGHĨA KIỂU DỮ LIỆU MỚI <<<

const SingleProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<ProductWithStorageOption | null>(null);
  
  const [storage, setStorage] = useState<string>(""); 
  const [color, setColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  // BỎ QUA các định nghĩa HOC gây lỗi
  // const SelectInputUpgrade = WithSelectInputWrapper(StandardSelectInput);
  // const QuantityInputUpgrade = WithNumberInputWrapper(QuantityInput);

  // Hàm kiểm tra tùy chọn có ý nghĩa
  const hasMeaningfulOptions = (options: StorageOption[] | string[] | undefined) => {
    if (!options || options.length === 0) return false;
    if (typeof options[0] === 'object' && 'name' in options[0]) {
        return options.length > 1 || (options.length === 1 && options[0].name.toLowerCase() !== "n/a");
    }
    return options.length > 1 || (options.length === 1 && options[0].toLowerCase() !== "n/a");
  };
  
  // LOGIC TÍNH TOÁN GIÁ TIỀN MỚI
  const calculatedPrice = useMemo(() => {
    if (!singleProduct) return 0;
    const selectedStorageOption = singleProduct.storage.find(
      (option) => option.name === storage
    );
    const priceDiff = selectedStorageOption?.price_diff || 0;
    return (singleProduct.price + priceDiff).toFixed(2);
  }, [singleProduct, storage]);

  // useEffect (logic không đổi)
  useEffect(() => {
    const fetchSingleProduct = async () => {
      const response = await fetch(
        `http://localhost:3000/products/${params.id}`
      );
      const data: ProductWithStorageOption = await response.json();
      setSingleProduct(data);
      
      if (data) {
        if (data.storage && data.storage.length > 0) {
          setStorage(data.storage[0].name); 
        } else {
          setStorage("N/A"); 
        }
        if (data.colors && data.colors.length > 0) {
          setColor(data.colors[0]);
        } else {
          setColor("N/A");
        }
      }
    };
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
    fetchSingleProduct();
  }, [params.id]);

  // addProduct (logic không đổi)
  const addProduct = () => {
    if (!singleProduct) return;
    if (singleProduct.stock === 0) {
      toast.error("Sản phẩm đã hết hàng!");
      return;
    }

    const productInCart: ProductInCartWithOption = {
      ...singleProduct,
      price: singleProduct.price + (singleProduct.storage.find(opt => opt.name === storage)?.price_diff || 0),
      quantity: quantity,
      storage: storage,
      color: color,
    };

    dispatch(addProductToTheCart(productInCart));
    toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
  };

  // Nếu không tìm thấy sản phẩm
  if (!singleProduct) {
    return (
      <div className="max-w-screen-2xl mx-auto pt-24 px-5 max-[400px]:px-3">
        <h1 className="text-3xl font-bold text-center">Đang tải sản phẩm hoặc sản phẩm không tồn tại...</h1>
      </div>
    );
  }

  const similarProducts = products.filter(
    (product) =>
      product.category === singleProduct.category && product.id !== singleProduct.id
  );

  return (
    <div className="max-w-screen-2xl mx-auto pt-24 px-5 max-[400px]:px-3">
      <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-20 max-lg:gap-10">
        
        {/* Cột 1: Hình ảnh (UI không đổi) */}
        <div className="w-full bg-white p-8 rounded-xl shadow-xl">
          <div className="w-full aspect-square overflow-hidden">
            <img 
              src={`/assets/${singleProduct?.image}`} 
              alt={singleProduct?.title} 
              className="w-full h-full object-contain transition-transform duration-500 hover:scale-[1.03] cursor-zoom-in" 
            />
          </div>
        </div>
        
        {/* Cột 2: Thông tin sản phẩm (UI không đổi) */}
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-black/90 text-5xl font-extrabold max-md:text-4xl max-sm:text-3xl border-b pb-2">
            {singleProduct?.title}
          </h2>
          
          {/* Trạng thái kho hàng (UI không đổi) */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-base max-sm:text-sm">Tình trạng:</span>
            <p className="text-gray-500 max-sm:text-sm">
                {singleProduct?.stock > 0 ? (
                <span className="text-green-600 font-bold">Còn hàng ({singleProduct.stock} sản phẩm)</span>
                ) : (
                <span className="text-red-500 font-bold">Hết hàng</span>
                )}
            </p>
          </div>
          
          {/* Giá tiền (UI không đổi) */}
          <h3 className="text-5xl text-secondaryBrown font-bold my-4 max-md:text-4xl max-sm:text-3xl">
            ${calculatedPrice}
          </h3>
          
          {/* Mô tả (UI không đổi) */}
          <p className="text-gray-600 text-lg mb-4 max-sm:text-base leading-relaxed">
            {singleProduct?.description}
          </p>
          
          {/* Vùng tùy chọn và Số lượng */}
          <div className="flex flex-col gap-6 border-y border-gray-200 py-8">
            
            {/* INPUT CHỌN DUNG LƯỢNG (STORAGE) - Sử dụng <select> native */}
            {hasMeaningfulOptions(singleProduct.storage) && (
                <div className="w-full">
                    <label htmlFor="storage-select" className="text-lg font-semibold text-gray-700 block mb-2">
                        Dung lượng
                    </label>
                    <select
                        id="storage-select"
                        value={storage}
                        onChange={(e) => setStorage(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:ring-secondaryBrown focus:border-secondaryBrown transition-colors appearance-none bg-white"
                    >
                        {singleProduct.storage.map((s) => (
                            <option key={s.name} value={s.name}>
                                {s.name} {s.price_diff > 0 ? `(+$${s.price_diff})` : s.price_diff < 0 ? `(-$${Math.abs(s.price_diff)})` : ''}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* INPUT CHỌN MÀU SẮC (COLOR) - Sử dụng <select> native */}
            {hasMeaningfulOptions(singleProduct.colors) && (
                 <div className="w-full">
                    <label htmlFor="color-select" className="text-lg font-semibold text-gray-700 block mb-2">
                        Màu sắc
                    </label>
                    <select
                        id="color-select"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 text-lg focus:ring-secondaryBrown focus:border-secondaryBrown transition-colors appearance-none bg-white"
                    >
                        {singleProduct.colors.map((c) => (
                            <option key={c} value={c}>
                                {c}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            
            {/* INPUT CHỌN SỐ LƯỢNG - Sử dụng <input type="number"> native */}
            <div className="w-full flex flex-col gap-2">
                 <label htmlFor="quantity-input" className="text-lg font-semibold text-gray-700 block">
                    Số lượng
                </label>
                <div className="flex items-center space-x-3">
                    {/* Nút giảm */}
                    <button
                        type="button"
                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                        className="w-10 h-10 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center font-bold text-xl"
                    >
                        -
                    </button>
                    {/* Input */}
                    <input
                        id="quantity-input"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 text-center border border-gray-300 rounded-lg p-2 text-lg focus:border-secondaryBrown focus:ring-secondaryBrown"
                    />
                    {/* Nút tăng */}
                    <button
                        type="button"
                        onClick={() => setQuantity(prev => prev + 1)}
                        className="w-10 h-10 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center font-bold text-xl"
                    >
                        +
                    </button>
                </div>
            </div>
          </div>

          {/* Nút Thêm vào giỏ hàng (UI không đổi) */}
          <div className="flex flex-col justify-center gap-5 mt-4">
            <Button
              text="Thêm vào giỏ hàng"
              mode="brown"
              onClick={addProduct}
              disabled={singleProduct?.stock === 0}
            />
          </div>

          {/* Chi tiết sản phẩm & Giao hàng (UI không đổi) */}
          <div className="mt-8 flex flex-col gap-4">
            <Dropdown dropdownTitle="Chi tiết Sản phẩm">
              <div className="text-gray-700 text-base p-2">
                {singleProduct?.description}
              </div>
            </Dropdown>

            <Dropdown dropdownTitle="Chi tiết Giao hàng">
               <div className="text-gray-700 text-base p-2">
                 Thông tin chi tiết về vận chuyển, phí ship, và thời gian giao hàng. Miễn phí vận chuyển cho đơn hàng trên $100.
               </div>
            </Dropdown>
          </div>
        </div>
      </div>

      {/* similar products (UI không đổi) */}
      <div className="mt-24">
        <h2 className="text-black/90 text-4xl font-bold mb-10 text-center max-lg:text-3xl border-b-2 border-secondaryBrown inline-block mx-auto pb-1">
          Sản Phẩm Tương Tự
        </h2>
        <div className="flex flex-wrap justify-between items-center gap-y-8 mt-12 max-xl:justify-start max-xl:gap-5 ">
          {similarProducts.slice(0, 3).map((product: Product) => (
            <ProductItem
              key={product?.id}
              id={product?.id}
              image={product?.image}
              title={product?.title}
              category={product?.category}
              price={product?.price}
              popularity={product?.popularity}
              stock={product?.stock}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SingleProduct;