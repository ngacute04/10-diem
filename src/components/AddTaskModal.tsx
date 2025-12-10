import { useState } from "react";
import { Button } from "./page/button";
import { Input } from "./page/input";
import { Textarea } from "./page/textarea";
import { Label } from "./page/label";
import { X, Calendar, Flag, User } from "lucide-react";

interface AddTaskModalProps {
  onClose: () => void;
  onAdd: (task: {
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    deadline: string;
    assignee: string;
    status: "todo" | "doing" | "done";
  }) => void;
}

export function AddTaskModal({ onClose, onAdd }: AddTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as "high" | "medium" | "low",
    deadline: "",
    assignee: "NA",
    status: "todo" as "todo" | "doing" | "done",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert("Vui lòng nhập tên công việc");
      return;
    }

    if (!formData.deadline) {
      alert("Vui lòng chọn deadline");
      return;
    }

    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Calendar className="size-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-neutral-900">Thêm công việc mới</h3>
              <p className="text-sm text-neutral-500">Tạo công việc mới cho dự án</p>
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
              Tên công việc <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              placeholder="VD: Thiết kế giao diện Dashboard"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              placeholder="Mô tả chi tiết công việc..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Grid for other fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Deadline */}
            <div className="space-y-2">
              <Label htmlFor="deadline" className="flex items-center gap-2">
                <Calendar className="size-4 text-neutral-500" />
                Deadline <span className="text-red-500">*</span>
              </Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                required
              />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority" className="flex items-center gap-2">
                <Flag className="size-4 text-neutral-500" />
                Mức ưu tiên
              </Label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Thấp</option>
                <option value="medium">Trung bình</option>
                <option value="high">Cao</option>
              </select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Trạng thái</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todo">Chưa làm</option>
                <option value="doing">Đang làm</option>
                <option value="done">Hoàn thành</option>
              </select>
            </div>

            {/* Assignee */}
            <div className="space-y-2">
              <Label htmlFor="assignee" className="flex items-center gap-2">
                <User className="size-4 text-neutral-500" />
                Người thực hiện
              </Label>
              <select
                id="assignee"
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="NA">Nguyễn Văn A</option>
                <option value="PT">Phạm Thị B</option>
                <option value="LM">Lê Văn C</option>
                <option value="TH">Trần Hoàng D</option>
              </select>
            </div>
          </div>

          {/* Info box */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              💡 <span className="font-medium">Mẹo:</span> Đặt deadline rõ ràng và mức ưu tiên phù hợp giúp quản lý công việc hiệu quả hơn.
            </p>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-200 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Tạo công việc
          </Button>
        </div>
      </div>
    </div>
  );
}
