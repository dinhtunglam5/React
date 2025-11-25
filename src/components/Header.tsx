import { HiBars3 } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Link } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import { useState } from "react";

const Header = () => {
  const [ isSidebarOpen, setIsSidebarOpen ] = useState(false);
  return (
    <>
    {/* Cải thiện: Thêm sticky, z-index, border-b, shadow để header nổi bật và cố định */}
    <header className="sticky top-0 z-50 bg-white max-w-screen-2xl flex text-center justify-between items-center py-5 px-5 text-black mx-auto max-sm:px-5 max-[400px]:px-3 border-b border-gray-100 shadow-sm">
      <HiBars3 className="text-3xl max-sm:text-2xl mr-20 max-lg:mr-0 cursor-pointer text-gray-700 hover:text-black transition-colors" onClick={() => setIsSidebarOpen(true)} />
      <Link
        to="/"
        // Cải thiện: Tăng font-weight và tracking cho logo để trông chuyên nghiệp hơn
        className="text-4xl font-extrabold tracking-[2.5px] max-sm:text-3xl max-[400px]:text-2xl text-secondaryBrown"
      >
        ZazelStore 
      </Link>
      <div className="flex gap-6 items-center max-sm:gap-3">
        {/* Cải thiện: Tăng kích thước icon và thêm hover effect */}
        <Link to="/search" className="text-gray-700 hover:text-secondaryBrown transition-colors">
          <HiOutlineMagnifyingGlass className="text-3xl max-sm:text-2xl" />
        </Link>
        <Link to="/login" className="text-gray-700 hover:text-secondaryBrown transition-colors">
          <HiOutlineUser className="text-3xl max-sm:text-2xl" />
        </Link>
        <Link to="/cart" className="text-gray-700 hover:text-secondaryBrown transition-colors">
          <HiOutlineShoppingBag className="text-3xl max-sm:text-2xl" />
        </Link>
      </div>
    </header>
    <SidebarMenu isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
    </>
  );
};
export default Header;