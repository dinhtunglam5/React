import { HiTrash as TrashIcon } from "react-icons/hi2";
import { Button } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeProductFromTheCart } from "../features/cart/cartSlice";
import customFetch from "../axios/custom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { checkCheckoutFormData } from "../utils/checkCheckoutFormData";

/*
address: "Marka Markovic 22"
apartment: "132"
cardNumber: "21313"
city: "Belgrade"
company: "Bojan Cesnak"
country: "United States"
cvc: "122"
emailAddress: "kuzma@gmail.com"
expirationDate: "12312"
firstName: "Aca22"
lastName: "Kuzma"
nameOnCard: "Aca JK"
paymentType: "on"
phone: "06123123132"
postalCode: "11080"
region: "Serbia"
*/

const paymentMethods = [
  { id: "credit-card", title: "Credit card" },
  { id: "paypal", title: "PayPal" },
  { id: "etransfer", title: "eTransfer" },
];

const Checkout = () => {
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Định nghĩa lại class CSS cho input để trông hiện đại hơn
  const inputClass = "bg-white border border-gray-300 text-lg py-2 px-3 w-full outline-none rounded-lg focus:border-secondaryBrown focus:ring-1 focus:ring-secondaryBrown transition-colors max-[450px]:text-base";


  const handleCheckoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Fix: Cần đảm bảo tất cả các input radio có cùng 'name' nhưng chỉ một 'value' được chọn.
    // Nếu bạn không chọn radio nào, 'paymentType' sẽ không có trong data. 
    // Tôi giả định bạn đã có logic kiểm tra trong checkCheckoutFormData.
    const data = Object.fromEntries(formData);
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user.id) {
      toast.error("Please login to proceed with checkout");
      return;
    }

    if (!productsInCart.length) {
      toast.error("Your cart is empty");
      return;
    }

    if (!checkCheckoutFormData({ data, products: productsInCart as any, subtotal })) return;

    try {
      const orderData = {
        data,
        products: productsInCart,
        subtotal: subtotal,
        user: { email: user.email, id: user.id },
        orderStatus: "Processing",
        orderDate: new Date().toISOString(),
      };
      await customFetch.post("/orders", orderData);
      toast.success("Order placed successfully");
      navigate("/order-confirmation");
    } catch (error) {
      toast.error("Checkout failed");
    }
  };

  const handleRemoveProduct = (id: string, color: string, storage: string) => {
    dispatch(removeProductFromTheCart({ id, color, storage }));
    toast.error("Product removed from cart");
  };

  return (
    <div className="max-w-screen-2xl mx-auto pt-20 px-5 max-[400px]:px-3">
      
      {/* KHẮC PHỤC LỖI: Bọc toàn bộ bố cục hai cột bằng thẻ <form> */}
      <form onSubmit={handleCheckoutSubmit} className="lg:grid lg:grid-cols-2 lg:gap-x-16 xl:gap-x-20">

        {/* CỘT 1: THÔNG TIN FORM (Địa chỉ, Thanh toán) */}
        {/* Đặt Form ở order-1 (bên trái desktop) để người dùng điền trước */}
        <div className="max-w-xl lg:order-1">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-10 border-b pb-3">
            Checkout
          </h1>
          
          {/* Thông tin Liên hệ */}
          <h2 className="text-2xl font-bold mt-10 mb-5 border-b pb-2">
            Contact information
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="emailAddress" className="text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                className={inputClass}
                placeholder="Enter email address"
                id="emailAddress"
                name="emailAddress"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First name</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Enter first name"
                  id="firstName"
                  name="firstName"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last name</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Enter last name"
                  id="lastName"
                  name="lastName"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone number</label>
              <input
                type="tel"
                className={inputClass}
                placeholder="Enter phone number"
                id="phone"
                name="phone"
              />
            </div>
          </div>
          
          {/* Địa chỉ Giao hàng */}
          <h2 className="text-2xl font-bold mt-10 mb-5 border-b pb-2">
            Shipping Address
          </h2>
          <div className="flex flex-col gap-4">
               <div className="flex flex-col gap-1">
                  <label htmlFor="country" className="text-sm font-medium text-gray-700">Country</label>
                  <input type="text" className={inputClass} placeholder="Country" id="country" name="country" />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="address" className="text-sm font-medium text-gray-700">Address (Street, House No.)</label>
                  <input type="text" className={inputClass} placeholder="Address" id="address" name="address" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="city" className="text-sm font-medium text-gray-700">City</label>
                    <input type="text" className={inputClass} placeholder="City" id="city" name="city" />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="region" className="text-sm font-medium text-gray-700">Region / State</label>
                    <input type="text" className={inputClass} placeholder="Region / State" id="region" name="region" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="postalCode" className="text-sm font-medium text-gray-700">Postal code</label>
                    <input type="text" className={inputClass} placeholder="Postal code" id="postalCode" name="postalCode" />
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="apartment" className="text-sm font-medium text-gray-700">Apartment/Suite (Optional)</label>
                    <input type="text" className={inputClass} placeholder="Apartment/Suite" id="apartment" name="apartment" />
                  </div>
                </div>
          </div>
          
          {/* Phương thức Thanh toán */}
          <h2 className="text-2xl font-bold mt-10 mb-5 border-b pb-2">Payment Method</h2>
          <div className="flex flex-col gap-4">
              <fieldset className="mt-4">
                  <legend className="sr-only">Payment Method</legend>
                  <div className="space-y-4">
                      {paymentMethods.map((method) => (
                          <div key={method.id} className="flex items-center">
                              <input
                                  id={method.id}
                                  name="paymentType"
                                  type="radio"
                                  defaultChecked={method.id === paymentMethods[0].id}
                                  className="h-4 w-4 border-gray-300 text-secondaryBrown focus:ring-secondaryBrown"
                                  value={method.id}
                              />
                              <label htmlFor={method.id} className="ml-3 block text-base font-medium text-gray-700">
                                  {method.title}
                              </label>
                          </div>
                      ))}
                  </div>
              </fieldset>
              
              {/* Chi tiết thẻ: Cải thiện UI */}
              <h3 className="text-xl font-semibold mt-4 mb-2">Card Details</h3>
              <div className="flex flex-col gap-4 border p-4 rounded-lg bg-white shadow-md">
                  <div className="flex flex-col gap-1">
                      <label htmlFor="nameOnCard" className="text-sm font-medium text-gray-700">Name on card</label>
                      <input type="text" className={inputClass} placeholder="Name on card" id="nameOnCard" name="nameOnCard" />
                  </div>
                  <div className="flex flex-col gap-1">
                      <label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">Card number</label>
                      <input type="text" className={inputClass} placeholder="Card number" id="cardNumber" name="cardNumber" />
                  </div>
                  <div className="flex items-center gap-4">
                      <div className="flex flex-col gap-1 w-full">
                      <label htmlFor="expirationDate" className="text-sm font-medium text-gray-700">Expiration date (MM/YY)</label>
                      <input type="text" className={inputClass} placeholder="MM/YY" id="expirationDate" name="expirationDate" />
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                      <label htmlFor="cvc" className="text-sm font-medium text-gray-700">CVC</label>
                      <input type="text" className={inputClass} placeholder="CVC" id="cvc" name="cvc" />
                      </div>
                  </div>
              </div>
          </div>
        </div>

        {/* CỘT 2: TÓM TẮT ĐƠN HÀNG VÀ TỔNG CỘNG */}
        {/* Đặt Summary ở order-2 (bên phải desktop) */}
        <div className="max-w-xl lg:order-2"> 
          <div className="bg-gray-50 rounded-xl p-6 shadow-xl mb-10 mt-10 lg:mt-0"> 
            <h2 className="text-2xl font-bold mb-5 border-b pb-2">Order Summary</h2>

            {/* Danh sách sản phẩm */}
            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {productsInCart.map((product) => (
                <li
                  key={`${product.id}-${product.color}-${product.storage}`}
                  className="flex py-6"
                >
                  <div className="flex-shrink-0">
                    <img
                      src={`/assets/${product.image}`}
                      alt={product.title}
                      className="h-24 w-24 rounded-lg object-cover object-center sm:h-24 sm:w-24 shadow-sm"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-lg font-bold text-gray-800">
                          {product.title}
                        </h3>
                        <button
                          type="button"
                          className="-m-2 inline-flex p-2 text-gray-400 hover:text-red-500 transition-colors"
                          onClick={() =>
                            handleRemoveProduct(
                              product.id,
                              product.color,
                              product.storage 
                            )
                          }
                        >
                          <span className="sr-only">Remove</span>
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-1 space-y-0.5">
                        <p className="text-sm text-gray-500">
                          Storage: <span className="font-medium">{product.storage}</span> 
                        </p>
                        <p className="text-sm text-gray-500">
                          Color: <span className="font-medium">{product.color}</span>
                        </p>
                        <p className="mt-2 text-base font-bold text-gray-900">
                          ${product.price} x {product.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            
            {/* Tóm tắt tính toán giá */}
            <div className="mt-6">
                <dl className="space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-base">Subtotal</dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${subtotal.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-base">Shipping</dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${subtotal ? 5.00.toFixed(2) : 0}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-base">Taxes (20%)</dt>
                    <dd className="text-base font-medium text-gray-900">
                      ${subtotal ? (subtotal / 5).toFixed(2) : 0}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-secondaryBrown pt-6 text-xl font-bold">
                    <dt className="text-xl font-bold">Total</dt>
                    <dd className="text-xl font-bold text-gray-900">
                      ${subtotal ? (subtotal + 5 + subtotal / 5).toFixed(2) : 0}
                    </dd>
                  </div>
                </dl>
                
                {productsInCart.length > 0 && (
                    <div className="mt-8">
                       {/* Nút submit: Đã nằm trong <form> và sẽ submit form */}
                       <Button text="Confirm Order" mode="brown" type="submit" />
                    </div>
                )}
            </div>
          </div>
        </div>

      </form> {/* <--- THẺ FORM KẾT THÚC Ở ĐÂY */}
    </div>
  );
};
export default Checkout;