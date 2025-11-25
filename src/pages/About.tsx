import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-screen-2xl mx-auto pt-20 px-5 max-[400px]:px-3 min-h-[60vh] flex flex-col justify-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">
        Về ZazelStore
      </h1>
      <p className="text-lg text-gray-600 mb-4 leading-relaxed max-w-3xl">
        Chào mừng bạn đến với ZazelStore! Chúng tôi tự hào là điểm đến hàng đầu cho những người đam mê công nghệ, cung cấp các sản phẩm điện tử mới nhất và sáng tạo nhất trên thị trường.
      </p>
      <p className="text-lg text-gray-600 mb-4 leading-relaxed max-w-3xl">
        Từ điện thoại thông minh, laptop hiệu năng cao, đến các phụ kiện thông minh và thiết bị gia dụng, sứ mệnh của chúng tôi là mang đến cho bạn sản phẩm chất lượng với dịch vụ khách hàng vượt trội.
      </p>
      <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-3xl">
        Đội ngũ của chúng tôi luôn nỗ lực tìm kiếm và cập nhật những xu hướng công nghệ mới nhất để đảm bảo bạn luôn có được trải nghiệm mua sắm tốt nhất.
      </p>
      <Link
        to="/shop"
        className="text-white bg-indigo-600 hover:bg-indigo-700 text-center text-lg font-medium py-3 px-8 rounded-lg transition duration-300 w-fit"
      >
        Khám phá cửa hàng
      </Link>
    </div>
  );
};
export default About;