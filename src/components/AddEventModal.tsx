import { useState } from "react";
import { Button } from "./page/button";
import { Input } from "./page/input";
import { Textarea } from "./page/textarea";
import { Label } from "./page/label";
import { X, Calendar, Clock, MapPin, Users, Video } from "lucide-react";

interface AddEventModalProps {
  onClose: () => void;
  onAdd: (event: {
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
    location: string;
    type: "meeting" | "deadline" | "reminder" | "other";
    attendees: string[];
  }) => void;
}

export function AddEventModal({ onClose, onAdd }: AddEventModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    type: "meeting" as "meeting" | "deadline" | "reminder" | "other",
    attendees: [] as string[],
  });

  const teamMembers = [
    { id: "NA", name: "Nguyễn Văn A" },
    { id: "PT", name: "Phạm Thị B" },
    { id: "LM", name: "Lê Văn C" },
    { id: "TH", name: "Trần Hoàng D" },
    { id: "NH", name: "Ngô Hải E" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert("Vui lòng nhập tiêu đề sự kiện");
      return;
    }

    if (!formData.date) {
      alert("Vui lòng chọn ngày");
      return;
    }

    if (!formData.startTime) {
      alert("Vui lòng chọn giờ bắt đầu");
      return;
    }

    onAdd(formData);
    onClose();
  };

  const toggleAttendee = (memberId: string) => {
    if (formData.attendees.includes(memberId)) {
      setFormData({
        ...formData,
        attendees: formData.attendees.filter(id => id !== memberId)
      });
    } else {
      setFormData({
        ...formData,
        attendees: [...formData.attendees, memberId]
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Calendar className="size-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-neutral-900">Thêm sự kiện mới</h3>
              <p className="text-sm text-neutral-500">Tạo sự kiện hoặc cuộc họp mới</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Tiêu đề sự kiện <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="VD: Sprint Planning Meeting"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Event Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Loại sự kiện</Label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="meeting">Cuộc họp</option>
              <option value="deadline">Deadline</option>
              <option value="reminder">Nhắc nhở</option>
              <option value="other">Khác</option>
            </select>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2">
                <Calendar className="size-4 text-neutral-500" />
                Ngày <span className="text-red-500">*</span>
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="startTime" className="flex items-center gap-2">
                <Clock className="size-4 text-neutral-500" />
                Giờ bắt đầu <span className="text-red-500">*</span>
              </Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime" className="flex items-center gap-2">
                <Clock className="size-4 text-neutral-500" />
                Giờ kết thúc
              </Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="size-4 text-neutral-500" />
              Địa điểm
            </Label>
            <Input
              id="location"
              placeholder="VD: Meeting Room A hoặc Google Meet"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              placeholder="Nội dung chi tiết của sự kiện..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Attendees */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Users className="size-4 text-neutral-500" />
              Người tham gia ({formData.attendees.length} người)
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.attendees.includes(member.id)
                      ? "border-green-600 bg-green-50"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                  onClick={() => toggleAttendee(member.id)}
                >
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 text-white flex items-center justify-center text-xs">
                      {member.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-neutral-900 truncate">{member.name}</p>
                    </div>
                    {formData.attendees.includes(member.id) && (
                      <div className="size-4 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                        <svg className="size-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info box */}
          <div className="p-4 bg-green-50 rounded-lg border border-green-200 flex gap-3">
            <Video className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-green-900 mb-1">
                <span className="font-medium">Gợi ý:</span> Thêm link Google Meet hoặc Zoom vào phần địa điểm
              </p>
              <p className="text-xs text-green-700">
                Tất cả người tham gia sẽ nhận được thông báo tự động
              </p>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-200 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button 
            type="submit" 
            className="bg-green-600 hover:bg-green-700"
            onClick={handleSubmit}
          >
            Tạo sự kiện
          </Button>
        </div>
      </div>
    </div>
  );
}
