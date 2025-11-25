import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaPinterestP } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";


const SocialMediaFooter = () => {
  return (
    // Sử dụng w-full để chiếm toàn bộ chiều rộng
    <div className="bg-primaryAccent w-full flex justify-center items-center flex-col py-12 gap-5 mt-24">
      <p className="text-xl text-white font-medium">Follow us on:</p>
      
      {/* Container chứa các icon: Tăng khoảng cách và sử dụng nền bo tròn cho mỗi icon */}
      <div className="flex gap-4 text-primaryAccent"> 
        
        {/* Cấu trúc Icon: w-9 h-9, nền trắng, bo tròn, đổ bóng và hiệu ứng hover */}
        <a 
          href="#" 
          aria-label="Facebook" 
          className="bg-white p-2 rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <FaFacebookF className="w-10 h-10" />
        </a>

        <a 
          href="#" 
          aria-label="Instagram" 
          className="bg-white p-2 rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <FaInstagram className="w-10 h-10" />
        </a>

        <a 
          href="#" 
          aria-label="Tiktok" 
          className="bg-white p-2 rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <FaTiktok className="w-10 h-10" />
        </a>

        <a 
          href="#" 
          aria-label="LinkedIn" 
          className="bg-white p-2 rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <FaLinkedinIn className="w-10 h-10" />
        </a>

        <a 
          href="#" 
          aria-label="Pinterest" 
          className="bg-white p-2 rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <FaPinterestP className="w-10 h-10" />
        </a>

        <a 
          href="#" 
          aria-label="Youtube" 
          className="bg-white p-2 rounded-full shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <FaYoutube className="w-10 h-10" />
        </a>

      </div>
    </div>
  )
}
export default SocialMediaFooter