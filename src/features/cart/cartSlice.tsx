import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa lại ProductInCart để phù hợp với sản phẩm điện tử
export type ProductInCart = {
  id: string;
  image: string;
  title: string;
  category: string;
  price: number;
  popularity: number;
  stock: number;
  // Thay thế 'size' bằng 'storage'
  storage: string; 
  color: string;
  quantity: number;
};

type CartState = {
  productsInCart: ProductInCart[];
  subtotal: number;
};

const initialState: CartState = {
  productsInCart: [],
  subtotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToTheCart: (state, action: PayloadAction<ProductInCart>) => {
      // Tìm kiếm sản phẩm đã tồn tại trong giỏ hàng (kiểm tra cả storage và color)
      const product = state.productsInCart.find(
        (product) =>
          product.id === action.payload.id &&
          product.color === action.payload.color &&
          product.storage === action.payload.storage // Kiểm tra storage
      );
      
      if (product) {
        state.productsInCart = state.productsInCart.map((product) => {
          if (
            product.id === action.payload.id &&
            product.color === action.payload.color &&
            product.storage === action.payload.storage
          ) {
            return {
              ...product,
              quantity: product.quantity + action.payload.quantity,
            };
          }
          return product;
        });
      } else {
        state.productsInCart.push(action.payload);
      }
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    removeProductFromTheCart: (
      state,
      // Có thể cần truyền ID và thuộc tính (storage/color) để xóa chính xác hơn
      action: PayloadAction<{ id: string; color: string; storage: string }> 
    ) => {
      state.productsInCart = state.productsInCart.filter(
        (product) => 
            !(product.id === action.payload.id && 
              product.color === action.payload.color &&
              product.storage === action.payload.storage)
      );
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    updateProductQuantity: (
      state,
      // Cập nhật ProductInCart để bao gồm cả storage và color
      action: PayloadAction<{ id: string; quantity: number; color: string; storage: string }>
    ) => {
      state.productsInCart = state.productsInCart.map((product) => {
        if (
            product.id === action.payload.id &&
            product.color === action.payload.color &&
            product.storage === action.payload.storage
        ) {
          return {
            ...product,
            quantity: action.payload.quantity,
          };
        }
        return product;
      });
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    calculateTotalPrice: (state) => {
      state.subtotal = state.productsInCart.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
    },
  },
});

export const {
  addProductToTheCart,
  removeProductFromTheCart,
  updateProductQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;