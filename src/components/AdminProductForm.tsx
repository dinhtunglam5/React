import React, { useState, useEffect } from 'react';
import customFetch from '../axios/custom'; // Sử dụng customFetch thực tế
import toast from 'react-hot-toast';
import Button from './Button'; // Giả định import component Button

// Định nghĩa Interface cho Product (đầy đủ)
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

// Hàm tiện ích: Array storage sang string (ví dụ: "1TB SSD:0, 2TB SSD:500")
const storageArrayToString = (storage: StorageOption[]): string => {
    if (!storage || storage.length === 0) return '';
    return storage.map(s => `${s.name.trim()}:${s.price_diff}`).join(', ');
};

// Hàm tiện ích: String sang array storage (Dùng để parse input)
const stringToStorageArray = (storageStr: string): StorageOption[] => {
    if (!storageStr) return [];
    return storageStr.split(',').map(item => {
        const parts = item.trim().split(':');
        const name = parts[0]?.trim();
        const diffStr = parts[1]?.trim() || '0';
        return { name: name || '', price_diff: parseInt(diffStr) || 0 };
    }).filter(s => s.name);
};

// Hàm tiện ích: Array colors sang string
const colorsArrayToString = (colors: string[]): string => {
    return colors.join(', ');
};

// Hàm tiện ích: String colors sang array
const stringToColorsArray = (colorsStr: string): string[] => {
    if (!colorsStr) return [];
    return colorsStr.split(',').map(c => c.trim()).filter(c => c.length > 0);
};


interface AdminProductFormProps {
    productToEdit: Product | null;
    onSubmitSuccess: () => void;
    onClose: () => void;
}

const AdminProductForm: React.FC<AdminProductFormProps> = ({ 
    productToEdit, 
    onSubmitSuccess, 
    onClose 
}) => {
    const initialFormState = {
        title: '',
        price: 0,
        category: '',
        image: '',
        description: '',
        stock: 0,
        popularity: 0,
        colors: '', // string
        storage: '', // string
    };
    
    const [formData, setFormData] = useState(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (productToEdit) {
            setFormData({
                title: productToEdit.title || '',
                price: productToEdit.price || 0,
                category: productToEdit.category || '',
                image: productToEdit.image || '',
                description: productToEdit.description || '',
                stock: productToEdit.stock || 0,
                popularity: productToEdit.popularity || 0,
                colors: colorsArrayToString(productToEdit.colors || []),
                storage: storageArrayToString(productToEdit.storage || []),
            });
        } else {
             setFormData(initialFormState);
        }
    }, [productToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' || name === 'stock' || name === 'popularity' ? (parseFloat(value) || 0) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Chuẩn hóa dữ liệu trước khi gửi
        const payload = {
            ...formData,
            colors: stringToColorsArray(formData.colors),
            storage: stringToStorageArray(formData.storage),
            price: Number(formData.price),
            stock: Number(formData.stock),
            popularity: Number(formData.popularity),
        };
        
        try {
            if (productToEdit) {
                // UPDATE: Sử dụng PUT hoặc PATCH
                await customFetch.put(`/products/${productToEdit.id}`, payload);
                toast.success('Cập nhật sản phẩm thành công!');
            } else {
                // CREATE: Sử dụng POST
                await customFetch.post('/products', payload);
                toast.success('Thêm sản phẩm mới thành công!');
            }
            onSubmitSuccess();
        } catch (error) {
            toast.error(productToEdit ? 'Cập nhật thất bại!' : 'Thêm sản phẩm thất bại!');
            console.error('Submit Product Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto z-50 flex items-center justify-center p-4">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-3xl w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                    {productToEdit ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        {/* Title */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Tên Sản Phẩm (*):</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500" required />
                        </div>
                        {/* Price */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Giá ($) (*):</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full border p-2 rounded-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500" min="0" required />
                        </div>
                        {/* Category */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Danh Mục (Slug) (*):</label>
                            <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full border p-2 rounded-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Ví dụ: dien-thoai" required />
                        </div>
                        {/* Stock */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Tồn Kho (Stock) (*):</label>
                            <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="w-full border p-2 rounded-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500" min="0" required />
                        </div>
                         {/* Image */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Tên File Ảnh:</label>
                            <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full border p-2 rounded-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Ví dụ: iphone-15-pro-max.jpg" />
                        </div>
                        {/* Popularity */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Độ Phổ Biến (0-5) (*):</label>
                            <input type="number" name="popularity" value={formData.popularity} onChange={handleChange} className="w-full border p-2 rounded-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500" min="0" max="5" required />
                        </div>
                        {/* Colors */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Màu Sắc (Phân cách bằng dấu phẩy):</label>
                            <input type="text" name="colors" value={formData.colors} onChange={handleChange} className="w-full border p-2 rounded-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder="Ví dụ: Đỏ, Xanh, Trắng" />
                            <p className="text-xs text-gray-500 mt-1">Sử dụng dấu phẩy để phân cách giữa các giá trị.</p>
                        </div>
                        {/* Storage/Options */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Dung Lượng/Tùy Chọn (Định dạng: Tên:Giá_khác_biệt, ...):</label>
                            <input type="text" name="storage" value={formData.storage} onChange={handleChange} className="w-full border p-2 rounded-lg mt-1 focus:ring-indigo-500 focus:border-indigo-500" placeholder='Ví dụ: 1TB SSD:0, 2TB SSD:500' />
                            <p className="text-xs text-gray-500 mt-1">Giá khác biệt là số tiền **cộng thêm** vào giá gốc.</p>
                        </div>
                        {/* Description */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">Mô Tả Sản Phẩm:</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full border p-2 rounded-lg mt-1 resize-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                    </div>
                    
                    <div className="flex gap-4 pt-6 border-t mt-4">
                        <Button 
                            type="submit" 
                            text={isSubmitting ? (productToEdit ? 'Đang Lưu...' : 'Đang Thêm...') : (productToEdit ? 'Lưu Thay Đổi' : 'Thêm Sản Phẩm')} 
                            mode="brown" 
                            className="flex-1" 
                            disabled={isSubmitting}
                        />
                        <Button type="button" text="Hủy" mode="white" className="flex-1" onClick={onClose} disabled={isSubmitting} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProductForm;