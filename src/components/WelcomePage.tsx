import { Button } from "./page/button";
import { CheckCircle2, BarChart3, Calendar, Users } from "lucide-react";

interface WelcomePageProps {
  onNavigate: (page: string) => void;
}

export function WelcomePage({ onNavigate }: WelcomePageProps) {
  const features = [
    { icon: CheckCircle2, title: "Quản lý công việc hiệu quả", desc: "Tổ chức và theo dõi mọi task một cách dễ dàng" },
    { icon: BarChart3, title: "Thống kê năng suất", desc: "Báo cáo chi tiết giúp bạn cải thiện hiệu suất" },
    { icon: Calendar, title: "Lịch thông minh", desc: "Lên kế hoạch và không bao giờ bỏ lỡ deadline" },
    { icon: Users, title: "Cộng tác nhóm", desc: "Làm việc nhóm hiệu quả với team của bạn" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Left side - Illustration & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-12 flex-col justify-between text-white">
        <div>
          <h1 className="text-white mb-2">10 điểm</h1>
          <p className="text-blue-100">Nền tảng quản lý công việc & năng suất cá nhân</p>
        </div>

        <div className="space-y-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                  <Icon className="size-6" />
                </div>
                <div>
                  <h3 className="text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-blue-100">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-8 text-sm text-blue-100">
          <div>
            <p className="text-2xl text-white mb-1">1k+</p>
            <p>Người dùng</p>
          </div>
          <div>
            <p className="text-2xl text-white mb-1">7K+</p>
            <p>Công việc hoàn thành</p>
          </div>
          <div>
            <p className="text-2xl text-white mb-1">4.2★</p>
            <p>Đánh giá</p>
          </div>
        </div>
      </div>

      {/* Right side - Welcome CTA */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="inline-block p-4 bg-blue-600 rounded-2xl mb-4">
              <CheckCircle2 className="size-12 text-white" />
            </div>
            <h2 className="text-neutral-900 mb-3">Chào mừng đến với 10 điểm</h2>
            <p className="text-neutral-600">
              Quản lý công việc thông minh, nâng cao năng suất làm việc của bạn
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
              onClick={() => onNavigate("login")}
            >
              Đăng nhập
            </Button>
            <Button 
              variant="outline" 
              className="w-full h-12 border-2"
              onClick={() => onNavigate("register")}
            >
              Tạo tài khoản mới
            </Button>
          </div>

          <div className="pt-6 text-center">
            <p className="text-xs text-neutral-500">
              Bằng việc tiếp tục, bạn đồng ý với{" "}
              <button className="text-blue-600 hover:underline">Điều khoản sử dụng</button>
              {" "}và{" "}
              <button className="text-blue-600 hover:underline">Chính sách bảo mật</button>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile logo */}
      <div className="lg:hidden absolute top-6 left-6">
        <h1 className="text-blue-600">10 điểm</h1>
      </div>
    </div>
  );
}
