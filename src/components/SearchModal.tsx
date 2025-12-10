import { useState } from "react";
import { Search, X, FileText, Briefcase, Calendar, User, ArrowRight } from "lucide-react";
import { Input } from "./page/input";
import { Badge } from "./page/badge";
import { Button } from "./page/button";

interface SearchResult {
  id: number;
  type: "task" | "project" | "event" | "member";
  title: string;
  subtitle?: string;
  status?: string;
  date?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const allResults: SearchResult[] = [
    {
      id: 1,
      type: "task",
      title: "Thiết kế giao diện Dashboard",
      subtitle: "Website Thương mại điện tử",
      status: "Đang làm",
      date: "30/11/2025"
    },
    {
      id: 2,
      type: "task",
      title: "Review code Backend API",
      subtitle: "Hệ thống CRM",
      status: "Chưa làm",
      date: "01/12/2025"
    },
    {
      id: 3,
      type: "task",
      title: "Implement Login feature",
      subtitle: "Website Thương mại điện tử",
      status: "Đang làm",
      date: "29/11/2025"
    },
    {
      id: 4,
      type: "project",
      title: "Website Thương mại điện tử",
      subtitle: "Xây dựng website bán hàng online",
      status: "Đang thực hiện",
      date: "15/01/2026"
    },
    {
      id: 5,
      type: "project",
      title: "Mobile App iOS",
      subtitle: "Ứng dụng quản lý tài chính",
      status: "Đang thực hiện",
      date: "28/02/2026"
    },
    {
      id: 6,
      type: "project",
      title: "Hệ thống CRM",
      subtitle: "CRM quản lý khách hàng",
      status: "Đang thực hiện",
      date: "10/12/2025"
    },
    {
      id: 7,
      type: "event",
      title: "Sprint Planning Meeting",
      subtitle: "Meeting Room A",
      date: "05/12/2025 09:00"
    },
    {
      id: 8,
      type: "event",
      title: "Design Review",
      subtitle: "Online via Zoom",
      date: "06/12/2025 14:00"
    },
    {
      id: 9,
      type: "member",
      title: "Nguyễn Văn A",
      subtitle: "Project Manager"
    },
    {
      id: 10,
      type: "member",
      title: "Phạm Thị B",
      subtitle: "Developer"
    },
  ];

  const filteredResults = searchQuery.trim() === "" 
    ? [] 
    : allResults.filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (result.subtitle && result.subtitle.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const getIcon = (type: string) => {
    switch (type) {
      case "task":
        return <FileText className="size-5 text-blue-600" />;
      case "project":
        return <Briefcase className="size-5 text-purple-600" />;
      case "event":
        return <Calendar className="size-5 text-green-600" />;
      case "member":
        return <User className="size-5 text-orange-600" />;
      default:
        return <Search className="size-5 text-neutral-600" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "task":
        return "Công việc";
      case "project":
        return "Dự án";
      case "event":
        return "Sự kiện";
      case "member":
        return "Thành viên";
      default:
        return "";
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "task":
        return "bg-blue-100 text-blue-700";
      case "project":
        return "bg-purple-100 text-purple-700";
      case "event":
        return "bg-green-100 text-green-700";
      case "member":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-neutral-100 text-neutral-700";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 pt-20">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[70vh] overflow-hidden flex flex-col">
        {/* Search Input */}
        <div className="p-4 border-b border-neutral-200">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-neutral-400" />
            <Input
              placeholder="Tìm kiếm công việc, dự án, sự kiện, thành viên..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 h-12 text-base"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={onClose}
            >
              <X className="size-5" />
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto">
          {searchQuery.trim() === "" ? (
            <div className="p-12 text-center">
              <Search className="size-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-neutral-900 mb-2">Tìm kiếm nhanh</h3>
              <p className="text-neutral-500">
                Nhập từ khóa để tìm kiếm công việc, dự án, sự kiện hoặc thành viên
              </p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="p-12 text-center">
              <Search className="size-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-neutral-900 mb-2">Không tìm thấy kết quả</h3>
              <p className="text-neutral-500">
                Không có kết quả nào cho "{searchQuery}"
              </p>
            </div>
          ) : (
            <div className="p-2">
              <div className="px-4 py-2">
                <p className="text-sm text-neutral-500">
                  Tìm thấy {filteredResults.length} kết quả
                </p>
              </div>
              {filteredResults.map((result) => (
                <div
                  key={`${result.type}-${result.id}`}
                  className="p-4 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className={`size-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      result.type === "task" ? "bg-blue-100" :
                      result.type === "project" ? "bg-purple-100" :
                      result.type === "event" ? "bg-green-100" :
                      "bg-orange-100"
                    }`}>
                      {getIcon(result.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={`text-xs ${getTypeBadgeColor(result.type)}`}>
                          {getTypeLabel(result.type)}
                        </Badge>
                        {result.status && (
                          <Badge variant="outline" className="text-xs">
                            {result.status}
                          </Badge>
                        )}
                      </div>
                      <h4 className="text-neutral-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {result.title}
                      </h4>
                      {result.subtitle && (
                        <p className="text-sm text-neutral-600 mb-1">
                          {result.subtitle}
                        </p>
                      )}
                      {result.date && (
                        <p className="text-xs text-neutral-500">
                          <Calendar className="size-3 inline mr-1" />
                          {result.date}
                        </p>
                      )}
                    </div>

                    <ArrowRight className="size-5 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50">
          <div className="flex items-center justify-between text-xs text-neutral-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white border border-neutral-200 rounded">↑</kbd>
                <kbd className="px-2 py-1 bg-white border border-neutral-200 rounded">↓</kbd>
                <span>di chuyển</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white border border-neutral-200 rounded">Enter</kbd>
                <span>chọn</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-white border border-neutral-200 rounded">Esc</kbd>
              <span>đóng</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
