// src/components/index.tsx (Defining the Button and its Props)

import React from 'react';

// Định nghĩa props cho component Button
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    mode: 'brown' | 'white' | 'red' | 'green';
    className?: string;
    // Thêm isLoading và disabled vào ButtonProps để TypeScript không báo lỗi
    isLoading?: boolean;
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
    text, 
    mode, 
    className = '', 
    isLoading = false, 
    disabled: propDisabled = false, // Đổi tên để tránh xung đột với HTML disabled
    ...rest 
}) => {
    // Logic để xác định style dựa trên mode
    let baseStyle = 'py-3 px-6 rounded-lg font-semibold transition-all duration-200 shadow-md flex items-center justify-center min-h-[44px]';
    let modeStyle = '';

    // Nếu đang loading, nút sẽ luôn bị disable và có giao diện mờ
    const isDisabled = propDisabled || isLoading;
    
    switch (mode) {
        case 'brown':
            modeStyle = isDisabled 
                ? 'bg-brown-300 text-white' 
                : 'bg-brown-600 text-white hover:bg-brown-700 active:bg-brown-800';
            break;
        case 'white':
            modeStyle = isDisabled 
                ? 'bg-gray-100 text-gray-400 border border-gray-300'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 active:bg-gray-100';
            break;
        case 'red':
            modeStyle = isDisabled 
                ? 'bg-red-300 text-white' 
                : 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800';
            break;
        case 'green':
            modeStyle = isDisabled 
                ? 'bg-green-300 text-white' 
                : 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800';
            break;
        default:
            modeStyle = '';
    }

    const finalClassName = `${baseStyle} ${modeStyle} ${isDisabled ? 'cursor-not-allowed opacity-75' : ''} ${className}`;

    return (
        <button
            className={finalClassName}
            disabled={isDisabled}
            {...rest}
        >
            {isLoading ? (
                // Hiển thị loading spinner (giả định dùng SVG inline hoặc thư viện icon)
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
                text
            )}
        </button>
    );
};