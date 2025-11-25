import {
  HiCheck as CheckIcon,
  HiXMark as XMarkIcon,
  HiQuestionMarkCircle as QuestionMarkCircleIcon,
} from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Link } from "react-router-dom";
import {
  removeProductFromTheCart,
  updateProductQuantity,
} from "../features/cart/cartSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleRemoveProduct = (id: string, color: string, storage: string) => {
    dispatch(removeProductFromTheCart({ id, color, storage })); // Sử dụng 'storage'
    toast.error("Product removed from cart");
  };

  const handleUpdateQuantity = (
    id: string,
    quantity: number,
    color: string,
    storage: string // Sử dụng 'storage'
  ) => {
    if (quantity > 0) {
      dispatch(updateProductQuantity({ id, quantity, color, storage }));
    } else {
      // Nếu số lượng về 0, xóa sản phẩm khỏi giỏ hàng
      handleRemoveProduct(id, color, storage); 
    }
  };

  return (
    <div className="bg-white mx-auto max-w-screen-2xl px-5 max-[400px]:px-3">
      <div className="pb-24 pt-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl border-b pb-3">
          Giỏ hàng
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Sản phẩm trong giỏ hàng của bạn
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {productsInCart.map((product) => (
                <li key={`${product.id}-${product.color}-${product.storage}`} className="flex py-8 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={`/assets/${product.image}`}
                      alt={product.title}
                      // Cải thiện: Tăng kích thước hình ảnh trên desktop
                      className="h-32 w-32 rounded-lg object-cover object-center sm:h-48 sm:w-48 shadow-md"
                    />
                  </div>

                  <div className="ml-6 flex flex-1 flex-col justify-between sm:ml-8">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-xl max-[450px]:text-lg">
                            <Link
                              to={`/product/${product.id}`}
                              className="font-bold text-gray-800 hover:text-secondaryBrown transition-colors"
                            >
                              {product.title}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-2 text-lg font-bold text-secondaryBrown max-[450px]:text-base">
                          ${product.price}
                        </p>
                        
                        {/* Hiển thị tùy chọn rõ ràng hơn */}
                        <div className="mt-2 space-y-1">
                          <p className="text-sm text-gray-500 max-[450px]:text-xs">
                            Dung lượng: <span className="font-medium text-gray-700">{product.storage || 'Không áp dụng'}</span>
                          </p>
                          <p className="text-sm text-gray-500 max-[450px]:text-xs">
                            Màu sắc: <span className="font-medium text-gray-700">{product.color || 'Không áp dụng'}</span>
                          </p>
                        </div>
                        
                      </div>

                      <div className="mt-4 sm:mt-0 flex flex-col items-end">
                        {/* INPUT SỐ LƯỢNG: Giữ lại logic cập nhật */}
                        <div className="flex items-center space-x-2">
                           <label htmlFor={`quantity-${product.id}`} className="sr-only">
                              Số lượng
                            </label>
                            <input
                                id={`quantity-${product.id}`}
                                name={`quantity-${product.id}`}
                                type="number"
                                min="1"
                                value={product.quantity}
                                onChange={(e) =>
                                    handleUpdateQuantity(
                                    product.id,
                                    parseInt(e.target.value),
                                    product.color,
                                    product.storage
                                    )
                                }
                                className="w-20 text-center border border-gray-300 rounded-md py-1 text-base focus:border-secondaryBrown focus:ring-secondaryBrown"
                            />
                        </div>

                        {/* Tình trạng còn hàng */}
                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                            {product.stock > 0 ? (
                              <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-600" aria-hidden="true" />
                            ) : (
                              <XMarkIcon className="h-5 w-5 flex-shrink-0 text-red-500" aria-hidden="true" />
                            )}
                            <span className={`${product.stock > 0 ? 'text-green-600' : 'text-red-500'} font-medium`}>
                                {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
                            </span>
                        </p>
                        
                        {/* Nút xóa */}
                        <div className="absolute right-0 top-0">
                          <button
                            type="button"
                            onClick={() => handleRemoveProduct(product.id, product.color, product.storage)}
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <span className="sr-only">Xóa</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Tóm tắt Đơn hàng */}
          {/* Cải thiện: Thêm rounded-xl, shadow-lg, border dày cho Total */}
          <section aria-labelledby="summary-heading" className="mt-16 rounded-xl bg-gray-50 px-6 py-8 sm:p-8 lg:col-span-5 lg:mt-0 shadow-lg">
            <h2 id="summary-heading" className="text-2xl font-bold tracking-tight text-gray-900 border-b pb-3 mb-6">
              Tóm tắt Đơn hàng
            </h2>

            <dl className="space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-base text-gray-600">Tổng phụ</dt>
                <dd className="text-base font-medium text-gray-900">${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-base text-gray-600">
                  Phí vận chuyển
                  <a href="#" className="ml-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Tìm hiểu thêm</span>
                    <QuestionMarkCircleIcon className="h-5 w-5 text-secondaryBrown" aria-hidden="true" />
                  </a>
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  ${subtotal ? 5.00.toFixed(2) : 0}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-base text-gray-600">
                  Thuế (20%)
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  ${(subtotal / 5).toFixed(2)}
                </dd>
              </div>
              
              {/* Tổng cộng: Nổi bật hơn */}
              <div className="flex items-center justify-between border-t border-secondaryBrown pt-6 text-xl font-bold text-gray-900">
                <dt>Tổng cộng</dt>
                <dd>
                  ${subtotal === 0 ? 0.00.toFixed(2) : (subtotal + subtotal / 5 + 5).toFixed(2)}
                </dd>
              </div>
            </dl>

            {productsInCart.length > 0 && (
              <div className="mt-8">
                {/* Sử dụng giao diện nút đã cải thiện */}
                <Link
                  to="/checkout"
                  className="text-white bg-secondaryBrown text-center text-xl font-medium w-full h-12 flex items-center justify-center rounded-lg hover:bg-[#6c4e40] transition-colors max-md:text-base shadow-lg"
                >
                  Thanh toán
                </Link>
              </div>
            )}
          </section>
        </form>
      </div>
    </div>
  );
};
export default Cart;