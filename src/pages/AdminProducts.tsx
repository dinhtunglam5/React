import { useState, useEffect, useCallback } from 'react';
import customFetch from '../axios/custom';
import toast from 'react-hot-toast';
import AdminProductList from '../components/AdminProductList';
import AdminProductForm from '../components/AdminProductForm';
import Button from '../components/Button'; // Component Button mới (chỉ có 'brown', 'white', 'transparent')
import { HiExclamationTriangle as ExclamationTriangleIcon } from 'react-icons/hi2'; 

// Định nghĩa Interfaces đầy đủ
interface StorageOption { name: string; price_diff: number; }
interface Product {
    id: string; title: string; price: number; category: string; image: string;
    description: string; stock: number; popularity: number; colors: string[]; storage: StorageOption[];
}

// Component Modal xác nhận tùy chỉnh
const ConfirmationModal: React.FC<{
    isOpen: boolean; onClose: () => void; onConfirm: (id: string) => void;
    productId: string | null; title: string; message: string;
}> = ({ isOpen, onClose, onConfirm, productId, title, message }) => {
    if (!isOpen || !productId) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="relative p-8 bg-white w-full max-w-sm m-auto rounded-xl shadow-2xl transform transition-all">
                <div className="flex flex-col items-center">
                    <ExclamationTriangleIcon className="w-12 h-12 text-red-500 mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{title}</h3>
                    <p className="text-sm text-gray-500 text-center mb-6">{message}</p>
                    <div className="flex gap-3 w-full">
                        {/* Hủy: dùng mode white */}
                        <Button text="Hủy" mode="white" onClick={onClose} className="flex-1 text-base h-10" /> 
                        
                        {/* ⚠️ FIX: Thay mode="red" bằng mode="brown" và dùng Tailwind Class để override màu đỏ */}
                        <Button 
                            text="Xác Nhận Xóa" 
                            mode="brown" 
                            onClick={() => { onConfirm(productId); onClose(); }} 
                            // Override màu nâu mặc định của mode="brown" thành màu đỏ
                            className="flex-1 !bg-red-600 hover:!bg-red-700 text-base h-10" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};


const AdminProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);

    // --- READ: Fetch danh sách sản phẩm ---
    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await customFetch.get('/products');
            const fetchedData = Array.isArray(response.data) ? response.data : [];
            setProducts(fetchedData as Product[]); 
        } catch (error) {
            toast.error('Không thể tải sản phẩm. Vui lòng kiểm tra API Server.');
            console.error('LỖI FETCH SẢN PHẨM:', error);
        } finally {
            setIsLoading(false); 
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // --- DELETE: Mở Modal xác nhận xóa ---
    const handleDelete = (id: string) => {
        setProductIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    // --- DELETE: Logic xác nhận xóa ---
    const handleConfirmDelete = async (id: string) => {
        try {
            await customFetch.delete(`/products/${id}`);
            toast.success('Xóa sản phẩm thành công!');
            setProducts(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            toast.error('Xóa sản phẩm thất bại');
            console.error(error);
        } finally {
            setProductIdToDelete(null);
        }
    };

    // --- CREATE & UPDATE: Xử lý submit Form thành công ---
    const handleFormSubmit = () => {
        setIsFormOpen(false);
        setEditingProduct(null);
        fetchProducts(); 
    };

    // --- EDIT: Mở form để sửa ---
    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    // Render
    return (
        <div className="max-w-screen-2xl mx-auto pt-8 px-5">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Quản Lý Sản Phẩm</h1>

            <Button 
                onClick={() => { setEditingProduct(null); setIsFormOpen(true); }}
                // ⚠️ FIX: Thay mode="green" bằng mode="brown"
                mode="brown" 
                text="Thêm Sản Phẩm Mới"
                className="mb-6 shadow-md max-w-xs h-10 text-base"
                disabled={isLoading} 
            />
            
            {/* --- Hiển thị dựa trên trạng thái tải --- */}
            
            {isLoading && (
                <div className="text-center p-10 text-xl text-indigo-600">Đang tải danh sách sản phẩm...</div>
            )}
            
            {!isLoading && products.length === 0 && (
                <div className="text-center p-10 text-xl text-gray-500 border rounded-lg">
                    Chưa có sản phẩm nào trong hệ thống.
                </div>
            )}
            
            {!isLoading && products.length > 0 && (
                /* Product List */
                <AdminProductList 
                    products={products} 
                    onEdit={handleEdit} 
                    onDelete={handleDelete} 
                />
            )}
            
            {/* Product Form Modal */}
            {isFormOpen && (
                <AdminProductForm
                    productToEdit={editingProduct}
                    onSubmitSuccess={handleFormSubmit}
                    onClose={() => setIsFormOpen(false)}
                />
            )}
            
            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                productId={productIdToDelete}
                title="Xác nhận xóa sản phẩm"
                message={`Bạn có chắc chắn muốn xóa sản phẩm có ID: ${productIdToDelete}? Hành động này không thể hoàn tác.`}
            />
        </div>
    );
};

export default AdminProducts;