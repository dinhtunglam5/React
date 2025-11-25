import React from 'react';
// Giả định bạn có thể thay thế bằng import từ file utils của mình
// import { formatCategoryName, formatCurrency } from '../utils/formats'; 

// --- UTILS MOCK (Nếu chưa có file utils riêng) ---
const formatCategoryName = (slug: string) => {
    if (slug === 'dien-thoai') return 'Điện Thoại';
    if (slug === 'laptop') return 'Laptop';
    if (slug === 'phu-kien') return 'Phụ Kiện';
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'USD' }).format(amount);
};
// --- END UTILS MOCK ---


// Định nghĩa Interface đầy đủ cho Product
interface StorageOption {
    name: string;
    price_diff: number;
}
interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    image: string;
    description: string;
    stock: number; 
    popularity: number;
    colors: string[];
    storage: StorageOption[];
}

interface AdminProductListProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
}

const AdminProductList: React.FC<AdminProductListProps> = ({ products, onEdit, onDelete }) => {
    if (products.length === 0) {
        return <p className="text-center text-xl mt-10 text-gray-500">Chưa có sản phẩm nào.</p>;
    }

    return (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên Sản Phẩm</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh Mục</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tồn Kho</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá Gốc</th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Hành Động</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                {formatCategoryName(product.category)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                <span className={`font-semibold ${product.stock <= 5 ? 'text-red-600' : 'text-green-600'}`}>
                                    {product.stock}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                                {formatCurrency(product.price)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                <button 
                                    onClick={() => onEdit(product)}
                                    className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-150"
                                >
                                    Sửa
                                </button>
                                <button 
                                    onClick={() => onDelete(product.id)}
                                    className="text-red-600 hover:text-red-900 transition duration-150"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProductList;