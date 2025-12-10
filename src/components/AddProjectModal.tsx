import { useState } from "react";
import { Button } from "./page/button";
import { Input } from "./page/input";
import { Textarea } from "./page/textarea";
import { Label } from "./page/label";
import { X, Briefcase, Calendar, Users, Target } from "lucide-react";

interface AddProjectModalProps {
  onClose: () => void;
  onAdd: (project: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    team: string[];
    status: "planning" | "active" | "completed";
    budget?: string;
  }) => void;
}

export function AddProjectModal({ onClose, onAdd }: AddProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    team: ["NA"] as string[],
    status: "planning" as "planning" | "active" | "completed",
    budget: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert("Vui lòng nhập tên dự án");
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      alert("Vui lòng chọn ngày bắt đầu và kết thúc");
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      alert("Ngày kết thúc phải sau ngày bắt đầu");
      return;
    }

    onAdd(formData);
    onClose();
  };

  const teamMembers = [
    { id: "NA", name: "Nguyễn Văn A" },
    { id: "PT", name: "Phạm Thị B" },
    { id: "LM", name: "Lê Văn C" },
    { id: "TH", name: "Trần Hoàng D" },
    { id: "NH", name: "Ngô Hải E" },
  ];

  const toggleTeamMember = (memberId: string) => {
    if (formData.team.includes(memberId)) {
      setFormData({ 
        ...formData, 
        team: formData.team.filter(id => id !== memberId) 
      });
    } else {
      setFormData({ 
        ...formData, 
        team: [...formData.team, memberId] 
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Briefcase className="size-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-neutral-900">Thêm dự án mới</h3>
              <p className="text-sm text-neutral-500">Tạo dự án mới và phân công team</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Tên dự án <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="VD: Website thương mại điện tử"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả dự án</Label>
            <Textarea
              id="description"
              placeholder="Mô tả mục tiêu, phạm vi và yêu cầu của dự án..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Grid for dates and status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Start Date */}
            <div className="space-y-2">
              <Label htmlFor="startDate" className="flex items-center gap-2">
                <Calendar className="size-4 text-neutral-500" />
                Ngày bắt đầu <span className="text-red-500">*</span>
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <Label htmlFor="endDate" className="flex items-center gap-2">
                <Calendar className="size-4 text-neutral-500" />
                Ngày kết thúc <span className="text-red-500">*</span>
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status" className="flex items-center gap-2">
                <Target className="size-4 text-neutral-500" />
                Trạng thái
              </Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-3 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="planning">Đang lên kế hoạch</option>
                <option value="active">Đang thực hiện</option>
                <option value="completed">Hoàn thành</option>
              </select>
            </div>
          </div>

          {/* Budget (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="budget">Ngân sách (VND)</Label>
            <Input
              id="budget"
              type="text"
              placeholder="VD: 100,000,000"
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            />
          </div>

          {/* Team Selection */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Users className="size-4 text-neutral-500" />
              Thành viên team ({formData.team.length} người)
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.team.includes(member.id)
                      ? "border-purple-600 bg-purple-50"
                      : "border-neutral-200 hover:border-neutral-300"
                  }`}
                  onClick={() => toggleTeamMember(member.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center">
                      {member.id}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-neutral-900">{member.name}</p>
                      <p className="text-xs text-neutral-500">
                        {member.id === "NA" ? "Project Manager" : "Developer"}
                      </p>
                    </div>
                    {formData.team.includes(member.id) && (
                      <div className="size-5 rounded-full bg-purple-600 flex items-center justify-center">
                        <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info box */}
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-800">
              💡 <span className="font-medium">Mẹo:</span> Chọn đúng thành viên phù hợp và đặt mốc thời gian rõ ràng để dự án thành công.
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
            className="bg-purple-600 hover:bg-purple-700"
            onClick={handleSubmit}
          >
            Tạo dự án
          </Button>
        </div>
      </div>
    </div>
  );
}
