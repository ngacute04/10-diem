import { X, Mail, Phone, MapPin, Calendar, Briefcase, CheckCircle2, Clock, MessageSquare } from "lucide-react";
import { Button } from "./page/button";
import { Badge } from "./page/badge";
import { Progress } from "./page/progress";

interface Member {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  avatar: string;
  status: "online" | "offline" | "busy";
  tasksCompleted: number;
  tasksInProgress: number;
  projects: string[];
  skills: string[];
}

interface TeamMemberModalProps {
  member: Member;
  onClose: () => void;
}

export function TeamMemberModal({ member, onClose }: TeamMemberModalProps) {
  const recentActivities = [
    {
      id: 1,
      action: "Hoàn thành công việc",
      task: "Thiết kế UI Dashboard",
      time: "2 giờ trước",
      type: "completed"
    },
    {
      id: 2,
      action: "Bình luận trong",
      task: "Review code Backend API",
      time: "5 giờ trước",
      type: "comment"
    },
    {
      id: 3,
      action: "Bắt đầu làm",
      task: "Implement Login feature",
      time: "1 ngày trước",
      type: "started"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "busy":
        return "bg-orange-500";
      case "offline":
        return "bg-neutral-400";
      default:
        return "bg-neutral-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Đang hoạt động";
      case "busy":
        return "Đang bận";
      case "offline":
        return "Không hoạt động";
      default:
        return "Không xác định";
    }
  };

  const totalTasks = member.tasksCompleted + member.tasksInProgress;
  const completionRate = totalTasks > 0 ? (member.tasksCompleted / totalTasks) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600" />
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Profile Section */}
          <div className="flex items-start gap-6 -mt-16 mb-6">
            <div className="relative">
              <div className="size-24 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-2xl border-4 border-white shadow-lg">
                {member.id}
              </div>
              <div className={`absolute bottom-1 right-1 size-5 rounded-full ${getStatusColor(member.status)} border-2 border-white`} />
            </div>

            <div className="flex-1 pt-12">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h2 className="text-2xl text-neutral-900 mb-1">{member.name}</h2>
                  <p className="text-neutral-600">{member.role}</p>
                </div>
                <Badge className={
                  member.status === "online" ? "bg-green-100 text-green-700" :
                  member.status === "busy" ? "bg-orange-100 text-orange-700" :
                  "bg-neutral-100 text-neutral-700"
                }>
                  {getStatusText(member.status)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-neutral-50 rounded-lg flex items-center gap-3">
              <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Mail className="size-5 text-blue-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-neutral-500 mb-0.5">Email</p>
                <p className="text-sm text-neutral-900 truncate">{member.email}</p>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg flex items-center gap-3">
              <div className="size-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                <Phone className="size-5 text-green-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-neutral-500 mb-0.5">Điện thoại</p>
                <p className="text-sm text-neutral-900">{member.phone}</p>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg flex items-center gap-3">
              <div className="size-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="size-5 text-purple-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-neutral-500 mb-0.5">Địa điểm</p>
                <p className="text-sm text-neutral-900">{member.location}</p>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg flex items-center gap-3">
              <div className="size-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                <Calendar className="size-5 text-orange-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-neutral-500 mb-0.5">Ngày tham gia</p>
                <p className="text-sm text-neutral-900">{member.joinDate}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-6">
            <h3 className="text-neutral-900 mb-4">Thống kê công việc</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-green-700">Đã hoàn thành</p>
                  <CheckCircle2 className="size-5 text-green-600" />
                </div>
                <p className="text-2xl text-green-900">{member.tasksCompleted}</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-blue-700">Đang thực hiện</p>
                  <Clock className="size-5 text-blue-600" />
                </div>
                <p className="text-2xl text-blue-900">{member.tasksInProgress}</p>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-neutral-600">Tỷ lệ hoàn thành</p>
                <p className="text-sm text-neutral-900">{Math.round(completionRate)}%</p>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
          </div>

          {/* Projects */}
          <div className="mb-6">
            <h3 className="text-neutral-900 mb-3">Dự án đang tham gia</h3>
            <div className="flex flex-wrap gap-2">
              {member.projects.map((project, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1">
                  <Briefcase className="size-3 mr-1" />
                  {project}
                </Badge>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="text-neutral-900 mb-3">Kỹ năng</h3>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill, index) => (
                <Badge key={index} className="bg-blue-100 text-blue-700 px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div>
            <h3 className="text-neutral-900 mb-3">Hoạt động gần đây</h3>
            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-neutral-50 rounded-lg">
                  <div className={`size-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    activity.type === "completed" ? "bg-green-100" :
                    activity.type === "comment" ? "bg-blue-100" :
                    "bg-orange-100"
                  }`}>
                    {activity.type === "completed" && <CheckCircle2 className="size-4 text-green-600" />}
                    {activity.type === "comment" && <MessageSquare className="size-4 text-blue-600" />}
                    {activity.type === "started" && <Clock className="size-4 text-orange-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-900">
                      {activity.action} <span className="font-medium">"{activity.task}"</span>
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-200 flex gap-3">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
            <MessageSquare className="size-4 mr-2" />
            Gửi tin nhắn
          </Button>
          <Button variant="outline" className="flex-1">
            <Mail className="size-4 mr-2" />
            Gửi email
          </Button>
        </div>
      </div>
    </div>
  );
}
