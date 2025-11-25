import React from "react";
// Không cần nanoid() vì ta có thể dùng index hoặc option string làm key

// Định nghĩa Props cần thiết cho component Select Input
interface StandardSelectInputProps {
  // Thay đổi từ selectList: ISelectElement[] sang options: string[] 
  // để khớp với dữ liệu từ SingleProduct.tsx
  options: string[]; 
  value: string; // Giá trị đang được chọn (e.g., "256GB")
  setValue: React.Dispatch<React.SetStateAction<string>>; // Hàm để cập nhật giá trị
  // Các prop khác như inputTitle, v.v., sẽ được HOC xử lý
}

const StandardSelectInput = ({
  options,
  value,
  setValue,
  ...props
}: StandardSelectInputProps) => {
  return (
    <select
      className="w-full py-2 border-black/30 border text-black/70 outline-none"
      value={value} // Gán giá trị hiện tại
      onChange={(e) => setValue(e.target.value)} // Xử lý sự kiện thay đổi
      {...props}
    >
      {/* Lỗi đã được sửa tại đây: Lặp qua mảng chuỗi (string[]) */}
      {options &&
        options.map((option: string, index: number) => (
          <option 
            key={index} // Sử dụng index làm key an toàn trong trường hợp này
            value={option} // Gán giá trị option là chính chuỗi đó (e.g., "256GB")
          >
            {option}
          </option>
        ))}
    </select>
  );
};
export default StandardSelectInput;

