import { useState } from "react";
import { Button } from "./page/button";
import { Input } from "./page/input";
import { Label } from "./page/label";
import { Checkbox } from "./page/checkbox";
import { ArrowLeft, User, Mail, Lock, CheckCircle2 } from "lucide-react";

interface RegisterPageProps {
  onNavigate: (page: string) => void;
}

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (!formData.email.includes("@")) {
      setError("Email không hợp lệ");
      return;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (!agreeToTerms) {
      setError("Bạn cần đồng ý với điều khoản sử dụng");
      return;
    }

    // Mock registration - in real app, this would call an API
    setSuccess(true);
    setTimeout(() => {
      onNavigate("login");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Left side - Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-12 flex-col justify-between text-white">
        <div>
          <h1 className="text-white mb-2">TaskFlow Pro</h1>
          <p className="text-blue-100">Bắt đầu hành trình quản lý công việc hiệu quả</p>
        </div>

        <div className="space-y-6">
          <h3 className="text-white mb-4">Tại sao chọn TaskFlow Pro?</h3>
          
          {[
            "Giao diện thân thiện, dễ sử dụng",
            "Đồng bộ đa nền tảng",
            "Báo cáo thống kê chi tiết",
            "Hỗ trợ làm việc nhóm",
            "Bảo mật dữ liệu tuyệt đối",
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="size-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="size-4" />
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="text-sm text-blue-100">
          <p>Đã có tài khoản?{" "}
            <button 
              onClick={() => onNavigate("login")}
              className="text-white underline hover:no-underline"
            >
              Đăng nhập ngay
            </button>
          </p>
        </div>
      </div>

      {/* Right side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <button
            onClick={() => onNavigate("welcome")}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-8"
          >
            <ArrowLeft className="size-4" />
            Quay lại
          </button>

          <div className="mb-8">
            <h2 className="text-neutral-900 mb-2">Tạo tài khoản mới</h2>
            <p className="text-neutral-600">
              Điền thông tin bên dưới để bắt đầu sử dụng TaskFlow Pro
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
                Đăng ký thành công! Đang chuyển đến trang đăng nhập...
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="fullName">Họ và tên</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Tối thiểu 6 ký tự"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
                Tôi đồng ý với{" "}
                <button type="button" className="text-blue-600 hover:underline">
                  Điều khoản sử dụng
                </button>
                {" "}và{" "}
                <button type="button" className="text-blue-600 hover:underline">
                  Chính sách bảo mật
                </button>
              </Label>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12">
              Tạo tài khoản
            </Button>

            <div className="text-center text-sm text-neutral-600">
              Đã có tài khoản?{" "}
              <button
                type="button"
                onClick={() => onNavigate("login")}
                className="text-blue-600 hover:underline"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile logo */}
      <div className="lg:hidden absolute top-6 left-6">
        <h1 className="text-blue-600">TaskFlow Pro</h1>
      </div>
    </div>
  );
}
