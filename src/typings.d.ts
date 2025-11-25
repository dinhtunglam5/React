// typings.d.ts

interface Product {
  id: string;
  title: string;
  image: string;
  category: string;
  price: number;
  popularity: number;
  stock: number;
  // Thêm thuộc tính cho sản phẩm điện tử
  storage: string[]; 
  colors: string[];
  description: string;
}

interface ProductInCart extends Product {
  id: string;
  quantity: number;
  // Thay thế 'size' bằng 'storage'
  storage: string; 
  color: string;
  stock: number;
}

interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: string;
  password: string;
}

interface Order {
  id: number;
  orderStatus: string;
  orderDate: string;
  data: {
    email: string;
    // ... các trường khác trong data
  };
  products: ProductInCart[];
  subtotal: number;
  user: {
    email: string;
    id: number;
  };
}