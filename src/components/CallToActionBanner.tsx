import { Link } from "react-router-dom";

const CallToActionBanner = () => {
  return (
    // Đã Sửa: Loại bỏ max-w-screen-2xl và mx-auto. Giữ lại px-5 cho khoảng thở hai bên.
    <div className="px-5 my-24">
      {/* Đã Sửa: Loại bỏ shadow-2xl và rounded-2xl để banner trông liền mạch khi chiếm full width. */}
      <div className="relative isolate overflow-hidden bg-indigo-700 px-6 py-24 text-center sm:px-16">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Khám Phá Thế Giới Gaming
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-100">
          Từ Laptop Gaming hiệu năng cao, chuột, bàn phím cơ đến tai nghe chuyên dụng. Nâng tầm trải nghiệm của bạn ngay hôm nay.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/shop/laptop" // (Hoặc /shop/gaming-gear nếu bạn có)
            className="rounded-md bg-white px-5 py-2.5 text-base font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 transition-colors"
          >
            Xem Ngay
          </Link>
          <Link
            to="/shop"
            className="text-base font-semibold leading-6 text-white hover:text-indigo-100"
          >
            Xem tất cả <span aria-hidden="true">→</span>
          </Link>
        </div>
        {/* Lớp trang trí mờ */}
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx={512}
            cy={512}
            r={512}
            fill="url(#8d958450-c69f-4251-94bc-4e091a32336B)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="8d958450-c69f-4251-94bc-4e091a32336B">
              <stop stopColor="#7775D6" />
              <stop offset={1} stopColor="#E935C1" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default CallToActionBanner;