import { useState } from "react";
import { Button } from "./page/button";
import { Input } from "./page/input";
import { Label } from "./page/label";
import { ArrowLeft, Mail, CheckCircle2, Lock } from "lucide-react";

interface ForgotPasswordPageProps {
  onNavigate: (page: string) => void;
}

export function ForgotPasswordPage({ onNavigate }: ForgotPasswordPageProps) {
  const [step, setStep] = useState<"email" | "code" | "reset">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Vui lòng nhập email hợp lệ");
      return;
    }

    // Mock send code
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setStep("code");
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code || code.length !== 6) {
      setError("Mã xác thực phải có 6 ký tự");
      return;
    }

    // Mock verify
    setStep("reset");
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!newPassword || newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    // Mock reset
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
          <p className="text-blue-100">Khôi phục quyền truy cập tài khoản của bạn</p>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <h3 className="text-white mb-4">Hướng dẫn khôi phục mật khẩu</h3>
            <div className="space-y-3 text-sm text-blue-100">
              <div className="flex items-start gap-3">
                <div className="size-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <p>Nhập email đã đăng ký tài khoản</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="size-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <p>Kiểm tra email và nhập mã xác thực</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="size-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <p>Tạo mật khẩu mới và đăng nhập</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-blue-100">
          <p>Cần trợ giúp?{" "}
            <button className="text-white underline hover:no-underline">
              Liên hệ hỗ trợ
            </button>
          </p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <button
            onClick={() => step === "email" ? onNavigate("login") : setStep("email")}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-8"
          >
            <ArrowLeft className="size-4" />
            {step === "email" ? "Quay lại đăng nhập" : "Quay lại"}
          </button>

          {/* Step 1: Enter Email */}
          {step === "email" && (
            <div>
              <div className="mb-8">
                <div className="size-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Lock className="size-8 text-blue-600" />
                </div>
                <h2 className="text-neutral-900 mb-2">Quên mật khẩu?</h2>
                <p className="text-neutral-600">
                  Nhập email của bạn và chúng tôi sẽ gửi mã xác thực để đặt lại mật khẩu
                </p>
              </div>

              <form onSubmit={handleSendCode} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
                    Mã xác thực đã được gửi đến email của bạn!
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

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12">
                  Gửi mã khôi phục
                </Button>

                <div className="text-center text-sm text-neutral-600">
                  <button
                    type="button"
                    onClick={() => onNavigate("login")}
                    className="text-blue-600 hover:underline"
                  >
                    Quay lại đăng nhập
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 2: Enter Verification Code */}
          {step === "code" && (
            <div>
              <div className="mb-8">
                <div className="size-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Mail className="size-8 text-blue-600" />
                </div>
                <h2 className="text-neutral-900 mb-2">Nhập mã xác thực</h2>
                <p className="text-neutral-600">
                  Chúng tôi đã gửi mã 6 ký tự đến <span className="font-medium">{email}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyCode} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="code">Mã xác thực</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    maxLength={6}
                    className="text-center tracking-widest text-lg"
                  />
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12">
                  Xác thực
                </Button>

                <div className="text-center text-sm text-neutral-600">
                  Không nhận được mã?{" "}
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="text-blue-600 hover:underline"
                  >
                    Gửi lại
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Step 3: Reset Password */}
          {step === "reset" && (
            <div>
              <div className="mb-8">
                <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <CheckCircle2 className="size-8 text-green-600" />
                </div>
                <h2 className="text-neutral-900 mb-2">Đặt mật khẩu mới</h2>
                <p className="text-neutral-600">
                  Mật khẩu mới phải có ít nhất 6 ký tự
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-6">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-600">
                    Đặt lại mật khẩu thành công! Đang chuyển đến trang đăng nhập...
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mật khẩu mới</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Tối thiểu 6 ký tự"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12">
                  Đặt lại mật khẩu
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Mobile logo */}
      <div className="lg:hidden absolute top-6 left-6">
        <h1 className="text-blue-600">TaskFlow Pro</h1>
      </div>
    </div>
  );
}
