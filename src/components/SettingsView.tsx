import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./page/card";
import { Input } from "./page/input";
import { Button } from "./page/button";
import { Label } from "./page/label";
import { Switch } from "./page/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./page/tabs";
import { Avatar, AvatarFallback } from "./page/avatar";
import { Badge } from "./page/badge";
import { User, Bell, Moon, Globe, Lock, Target, LogOut } from "lucide-react";

interface SettingsViewProps {
  onLogout?: () => void;
}

export function SettingsView({ onLogout }: SettingsViewProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [taskReminders, setTaskReminders] = useState(true);

  // Form states for personal info
  const [fullname, setFullname] = useState("Nguyễn Văn Ngà");
  const [email, setEmail] = useState("ngaiuai1202@gmail.com");
  const [phone, setPhone] = useState("0368567750");
  const [position, setPosition] = useState("Project Manager");
  const [bio, setBio] = useState("Project Manager với 5 tháng kinh nghiệm trong quản lý dự án web và mobile app.");

  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveProfile = () => {
    alert("Thông tin cá nhân đã được lưu!");
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    if (newPassword.length < 6) {
      alert("Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }

    alert("Mật khẩu đã được thay đổi thành công!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleLogout = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      if (onLogout) {
        onLogout();
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-neutral-900 mb-1">Cài đặt</h2>
        <p className="text-neutral-600">Quản lý tài khoản và tùy chỉnh ứng dụng</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Hồ sơ</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="preferences">Tùy chỉnh</TabsTrigger>
          <TabsTrigger value="goals">Mục tiêu</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="size-24">
                  <AvatarFallback className="bg-blue-600 text-white text-2xl">
                    NA
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="mb-2">Thay đổi ảnh</Button>
                  <p className="text-xs text-neutral-500">JPG, PNG tối đa 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Họ và tên</Label>
                  <Input 
                    id="fullname" 
                    value={fullname} 
                    onChange={(e) => setFullname(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Chức vụ</Label>
                  <Input 
                    id="position" 
                    value={position} 
                    onChange={(e) => setPosition(e.target.value)} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Giới thiệu</Label>
                <textarea
                  id="bio"
                  className="w-full px-3 py-2 border border-neutral-200 rounded-md min-h-[100px]"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSaveProfile}>
                Lưu thay đổi
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt thông báo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm text-neutral-900">Email thông báo</p>
                  <p className="text-xs text-neutral-500">Nhận thông báo qua email</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm text-neutral-900">Thông báo đẩy</p>
                  <p className="text-xs text-neutral-500">Nhận thông báo trên trình duyệt</p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm text-neutral-900">Nhắc nhở công việc</p>
                  <p className="text-xs text-neutral-500">Nhắc nhở deadline và công việc</p>
                </div>
                <Switch checked={taskReminders} onCheckedChange={setTaskReminders} />
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <p className="text-sm text-neutral-900 mb-4">Loại thông báo</p>
                <div className="space-y-3">
                  {[
                    "Công việc được giao",
                    "Bình luận mới",
                    "Được tag (@mention)",
                    "Deadline sắp tới",
                    "Cập nhật dự án",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="size-4" />
                      <span className="text-sm text-neutral-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">Lưu cài đặt</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tùy chỉnh giao diện</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Moon className="size-4" />
                    <p className="text-sm text-neutral-900">Chế độ tối</p>
                  </div>
                  <p className="text-xs text-neutral-500">Chuyển sang giao diện tối</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <div className="space-y-2">
                <Label>Ngôn ngữ</Label>
                <select className="w-full px-3 py-2 border border-neutral-200 rounded-md">
                  <option>Tiếng Việt</option>
                  <option>English</option>
                  <option>日本語</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Múi giờ</Label>
                <select className="w-full px-3 py-2 border border-neutral-200 rounded-md">
                  <option>GMT+7 (Bangkok, Hanoi)</option>
                  <option>GMT+8 (Singapore)</option>
                  <option>GMT+9 (Tokyo)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Định dạng ngày</Label>
                <select className="w-full px-3 py-2 border border-neutral-200 rounded-md">
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Chế độ xem mặc định</Label>
                <select className="w-full px-3 py-2 border border-neutral-200 rounded-md">
                  <option>Dashboard</option>
                  <option>Công việc</option>
                  <option>Lịch</option>
                </select>
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">Lưu tùy chỉnh</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mục tiêu cá nhân</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Mục tiêu công việc hàng tuần</Label>
                <Input type="number" defaultValue="20" placeholder="Số công việc" />
                <p className="text-xs text-neutral-500">Số công việc bạn muốn hoàn thành mỗi tuần</p>
              </div>

              <div className="space-y-2">
                <Label>Mục tiêu năng suất</Label>
                <Input type="number" defaultValue="85" placeholder="%" />
                <p className="text-xs text-neutral-500">Tỷ lệ năng suất mục tiêu (%)</p>
              </div>

              <div className="space-y-4">
                <Label>Mục tiêu hiện tại</Label>
                {[
                  { goal: "Hoàn thành 20 tasks/tuần", progress: 75, current: 15, target: 20 },
                  { goal: "Đạt 85% năng suất", progress: 87, current: 87, target: 85 },
                  { goal: "Giảm tasks quá hạn", progress: 60, current: 3, target: 0 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-neutral-900">{item.goal}</p>
                      <Badge variant={item.progress >= 100 ? "default" : "secondary"}>
                        {item.current}/{item.target}
                      </Badge>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${item.progress >= 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min(item.progress, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700">Cập nhật mục tiêu</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Đổi mật khẩu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                <Input 
                  id="current-password" 
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Nhập mật khẩu hiện tại"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Mật khẩu mới</Label>
                <Input 
                  id="new-password" 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu mới"
                />
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleChangePassword}>
                Đổi mật khẩu
              </Button>

              <div className="pt-6 border-t border-neutral-200">
                <p className="text-sm text-neutral-900 mb-4">Phiên đăng nhập</p>
                <div className="space-y-3">
                  {[
                    { device: "Chrome - Windows", location: "Hà Nội, Vietnam", time: "Đang hoạt động", current: true },
                    { device: "Safari - iPhone", location: "TP.HCM, Vietnam", time: "2 giờ trước", current: false },
                  ].map((session, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                      <div>
                        <p className="text-sm text-neutral-900">{session.device}</p>
                        <p className="text-xs text-neutral-500">{session.location} • {session.time}</p>
                      </div>
                      {session.current ? (
                        <Badge variant="default">Hiện tại</Badge>
                      ) : (
                        <Button variant="outline" size="sm">Đăng xuất</Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-200">
                <Button variant="destructive" className="w-full" onClick={handleLogout}>
                  <LogOut className="size-4 mr-2" />
                  Đăng xuất khỏi tất cả thiết bị
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}