const Contact = () => {
  return (
    <div className="max-w-screen-2xl mx-auto pt-20 px-5 max-[400px]:px-3 min-h-[60vh] flex flex-col justify-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Liên Hệ Với Chúng Tôi</h1>
      <p className="text-lg text-gray-600 mb-6 leading-relaxed max-w-3xl">
        Bạn có câu hỏi, thắc mắc hay cần hỗ trợ? Đừng ngần ngại liên hệ với đội ngũ ZazelStore. Chúng tôi luôn sẵn sàng lắng nghe!
      </p>

      <div className="space-y-4 text-lg">
        <div className="flex items-center gap-3">
          <span className="font-semibold w-24">Email:</span>
          <a href="mailto:support@zazelstore.com" className="text-indigo-600 hover:underline">
            support@zazelstore.com
          </a>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold w-24">Điện thoại:</span>
          <span className="text-gray-700">(+84) 123 456 789</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold w-24">Địa chỉ:</span>
          <span className="text-gray-700">123 Đường Công Nghệ, Quận 1, TP. Hồ Chí Minh, Việt Nam</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-semibold w-24">Giờ làm việc:</span>
          <span className="text-gray-700">Thứ 2 - Thứ 7: 8:00 AM - 6:00 PM</span>
        </div>
      </div>

      <p className="text-lg text-gray-600 mt-8">
        Hoặc gửi tin nhắn cho chúng tôi qua các kênh mạng xã hội!
      </p>
    </div>
  );
};
export default Contact;