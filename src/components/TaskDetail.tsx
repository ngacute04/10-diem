import { useState } from "react";
import { Button } from "./page/button";
import { Input } from "./page/input";
import { Textarea } from "./page/textarea";
import { Badge } from "./page/badge";
import { Checkbox } from "./page/checkbox";
import { Label } from "./page/label";
import { 
  X, 
  Calendar, 
  Flag, 
  Edit2, 
  Trash2, 
  Plus,
  CheckCircle2,
  MessageSquare,
  Paperclip
} from "lucide-react";

interface SubTask {
  id: number;
  title: string;
  completed: boolean;
}

interface TaskDetailProps {
  task: {
    id: number;
    title: string;
    description: string;
    priority: "high" | "medium" | "low";
    deadline: string;
    status: string;
    assignee?: string;
  };
  onClose: () => void;
  onSave?: (task: any) => void;
  onDelete?: (id: number) => void;
}

export function TaskDetail({ task, onClose, onSave, onDelete }: TaskDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(task);
  const [note, setNote] = useState("Công việc này cần hoàn thành trong tuần để đảm bảo tiến độ dự án.");
  const [subTasks, setSubTasks] = useState<SubTask[]>([
    { id: 1, title: "Nghiên cứu và thu thập yêu cầu", completed: true },
    { id: 2, title: "Thiết kế wireframe", completed: true },
    { id: 3, title: "Review với team", completed: false },
    { id: 4, title: "Hoàn thiện và export", completed: false },
  ]);
  const [newSubTask, setNewSubTask] = useState("");

  const priorityConfig = {
    high: { label: "Cao", color: "bg-red-100 text-red-700 border-red-200" },
    medium: { label: "Trung bình", color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
    low: { label: "Thấp", color: "bg-green-100 text-green-700 border-green-200" },
  };

  const statusConfig = {
    todo: { label: "Chưa làm", color: "bg-neutral-100 text-neutral-700" },
    doing: { label: "Đang làm", color: "bg-blue-100 text-blue-700" },
    done: { label: "Hoàn thành", color: "bg-green-100 text-green-700" },
  };

  const handleToggleSubTask = (id: number) => {
    setSubTasks(subTasks.map(st => 
      st.id === id ? { ...st, completed: !st.completed } : st
    ));
  };

  const handleAddSubTask = () => {
    if (newSubTask.trim()) {
      setSubTasks([...subTasks, {
        id: Date.now(),
        title: newSubTask,
        completed: false
      }]);
      setNewSubTask("");
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(formData);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa công việc này?")) {
      if (onDelete) {
        onDelete(task.id);
      }
      onClose();
    }
  };

  const completedCount = subTasks.filter(st => st.completed).length;
  const progressPercent = Math.round((completedCount / subTasks.length) * 100);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <CheckCircle2 className="size-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-neutral-900">Chi tiết công việc</h3>
              <p className="text-sm text-neutral-500">ID: #{task.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing && (
              <>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit2 className="size-4 mr-2" />
                  Sửa
                </Button>
                <Button variant="outline" size="sm" onClick={handleDelete} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                  <Trash2 className="size-4 mr-2" />
                  Xóa
                </Button>
              </>
            )}
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="size-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label>Tên công việc</Label>
            {isEditing ? (
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="text-lg"
              />
            ) : (
              <h2 className="text-neutral-900">{formData.title}</h2>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label>Mô tả</Label>
            {isEditing ? (
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Nhập mô tả công việc..."
              />
            ) : (
              <p className="text-neutral-600">{formData.description || "Chưa có mô tả"}</p>
            )}
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Deadline */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="size-4 text-neutral-500" />
                Deadline
              </Label>
              {isEditing ? (
                <Input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              ) : (
                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200">
                  <p className="text-neutral-900">{formData.deadline}</p>
                </div>
              )}
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Flag className="size-4 text-neutral-500" />
                Mức ưu tiên
              </Label>
              {isEditing ? (
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="w-full p-2 border border-neutral-200 rounded-lg"
                >
                  <option value="low">Thấp</option>
                  <option value="medium">Trung bình</option>
                  <option value="high">Cao</option>
                </select>
              ) : (
                <div className={`p-3 rounded-lg border ${priorityConfig[formData.priority].color}`}>
                  <p>{priorityConfig[formData.priority].label}</p>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Trạng thái</Label>
              {isEditing ? (
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full p-2 border border-neutral-200 rounded-lg"
                >
                  <option value="todo">Chưa làm</option>
                  <option value="doing">Đang làm</option>
                  <option value="done">Hoàn thành</option>
                </select>
              ) : (
                <div className={`p-3 rounded-lg ${statusConfig[formData.status as keyof typeof statusConfig]?.color || statusConfig.todo.color}`}>
                  <p>{statusConfig[formData.status as keyof typeof statusConfig]?.label || "Chưa làm"}</p>
                </div>
              )}
            </div>

            {/* Assignee */}
            {formData.assignee && (
              <div className="space-y-2">
                <Label>Người thực hiện</Label>
                <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center gap-2">
                  <div className="size-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                    {formData.assignee}
                  </div>
                  <p className="text-neutral-900">Người dùng {formData.assignee}</p>
                </div>
              </div>
            )}
          </div>

          {/* Subtasks */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Checklist ({completedCount}/{subTasks.length})</Label>
              <span className="text-sm text-neutral-500">{progressPercent}%</span>
            </div>
            
            <div className="space-y-2">
              {subTasks.map((subTask) => (
                <div key={subTask.id} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                  <Checkbox
                    checked={subTask.completed}
                    onCheckedChange={() => handleToggleSubTask(subTask.id)}
                  />
                  <span className={`flex-1 ${subTask.completed ? "line-through text-neutral-500" : "text-neutral-900"}`}>
                    {subTask.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Add new subtask */}
            <div className="flex gap-2">
              <Input
                placeholder="Thêm subtask mới..."
                value={newSubTask}
                onChange={(e) => setNewSubTask(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddSubTask()}
              />
              <Button onClick={handleAddSubTask} size="icon">
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label>Ghi chú</Label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Thêm ghi chú..."
              className="resize-none"
            />
          </div>

          {/* Activity */}
          <div className="space-y-3">
            <Label>Hoạt động gần đây</Label>
            <div className="space-y-3">
              <div className="flex gap-3 text-sm">
                <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="size-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-neutral-900">Nguyễn Văn A đã thêm bình luận</p>
                  <p className="text-neutral-500 text-xs">2 giờ trước</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm">
                <div className="size-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="size-4 text-green-600" />
                </div>
                <div>
                  <p className="text-neutral-900">Hoàn thành subtask "Nghiên cứu và thu thập yêu cầu"</p>
                  <p className="text-neutral-500 text-xs">5 giờ trước</p>
                </div>
              </div>
              <div className="flex gap-3 text-sm">
                <div className="size-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Paperclip className="size-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-neutral-900">Đã thêm 2 file đính kèm</p>
                  <p className="text-neutral-500 text-xs">1 ngày trước</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {isEditing && (
          <div className="p-6 border-t border-neutral-200 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Hủy
            </Button>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              Lưu thay đổi
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
