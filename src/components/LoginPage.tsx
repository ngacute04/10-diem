import { useState } from "react";
import { Button } from "./page/button";
import { Input } from "./page/input";
import { Label } from "./page/label";
import { Checkbox } from "./page/checkbox";
import { ArrowLeft, CheckCircle2, Mail, Lock } from "lucide-react";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLogin: () => void;
}

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (!email.includes("@")) {
      setError("Email không hợp lệ");
      return;
    }

    // Mock login - in real app, this would call an API
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex">
      {/* Left side - Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-12 flex-col justify-between text-white">
        <div>
          <h1 className="text-white mb-2">10 điểm</h1>
          <p className="text-blue-100">Quản lý công việc thông minh</p>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <p className="text-lg mb-4">
              "10 điểm đã giúp tôi tăng năng suất làm việc lên 40%. Công cụ tuyệt vời cho mọi người!"
            </p>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-white/20 flex items-center justify-center">
                <span>NT</span>
              </div>
              <div>
                <p className="text-white">Nguyễn Thị B</p>
                <p className="text-sm text-blue-100">Product Manager</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-blue-100">
          <CheckCircle2 className="size-5" />
          <span>An toàn & bảo mật</span>
          <span>•</span>
          <span>Miễn phí dùng thử</span>
        </div>
      </div>

      {/* Right side - Login Form */}
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
            <h2 className="text-neutral-900 mb-2">Đăng nhập</h2>
            <p className="text-neutral-600">
              Chào mừng bạn quay trở lại! Vui lòng nhập thông tin đăng nhập.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm cursor-pointer">
                  Ghi nhớ đăng nhập
                </Label>
              </div>
              <button
                type="button"
                onClick={() => onNavigate("forgot-password")}
                className="text-sm text-blue-600 hover:underline"
              >
                Quên mật khẩu?
              </button>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12">
              Đăng nhập
            </Button>

            <div className="text-center text-sm text-neutral-600">
              Chưa có tài khoản?{" "}
              <button
                type="button"
                onClick={() => onNavigate("register")}
                className="text-blue-600 hover:underline"
              >
                Đăng ký ngay
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
