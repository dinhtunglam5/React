import React from 'react';

// Định nghĩa các mode màu sắc
type ButtonMode = 'brown' | 'white' | 'red' | 'green' | 'indigo';

interface ButtonProps {
    text: string;
    mode?: ButtonMode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
    text, 
    mode = 'indigo', 
    onClick, 
    className = '', 
    type = 'button', 
    disabled = false,
    icon
}) => {
    let baseStyle = 'rounded-lg py-2 px-4 font-semibold transition duration-200 shadow-md transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';

    // Logic định nghĩa màu sắc cho các mode
    switch (mode) {
        case 'brown':
            // Màu nâu (Giữ lại màu amber cho sự phân biệt, nếu không dùng thì có thể xóa mode này)
            baseStyle += ' bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500';
            break;
        case 'red':
            // Màu đỏ (Dùng cho hành động xóa)
            baseStyle += ' bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
            break;
        case 'green':
            // Màu xanh (Dùng cho hành động thêm mới)
            baseStyle += ' bg-green-600 text-white hover:bg-green-700 focus:ring-green-500';
            break;
        case 'indigo':
            // ⭐️ CẬP NHẬT: Dùng primaryAccent cho màu nền và ring
            baseStyle += ' bg-primaryAccent text-white hover:bg-indigo-700 focus:ring-primaryAccent';
            break;
        case 'white':
        default:
            // Màu trắng/xám (Dùng cho hành động phụ, hủy)
            baseStyle += ' bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-primaryAccent'; // ⭐️ Cập nhật focus ring
            break;
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyle} ${className}`}
            disabled={disabled}
        >
            {icon}
            {text}
        </button>
    );
};

export default Button;