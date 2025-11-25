import {
  HiOutlineTruck,
  HiOutlineShieldCheck,
  HiOutlineChatBubbleLeftRight,
  HiOutlineClock,
} from "react-icons/hi2";

const features = [
  {
    name: "Miễn Phí Vận Chuyển",
    description: "Cho đơn hàng trên 2.000.000đ",
    icon: HiOutlineTruck,
  },
  {
    name: "Bảo Hành 12 Tháng",
    description: "Chính hãng từ nhà sản xuất",
    icon: HiOutlineShieldCheck,
  },
  {
    name: "Hỗ Trợ 24/7",
    description: "Luôn sẵn sàng giải đáp thắc mắc",
    icon: HiOutlineChatBubbleLeftRight,
  },
  {
    name: "Giao Hàng Nhanh",
    description: "Nội thành chỉ trong 2 giờ",
    icon: HiOutlineClock,
  },
];

const FeatureBar = () => {
  return (
    <div className="bg-gray-50 border-y border-gray-200">
      <div className="max-w-screen-2xl mx-auto px-5 py-8">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <feature.icon
                  className="h-10 w-10 text-indigo-600"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {feature.name}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureBar;