import { 
  LayoutDashboard, 
  CheckSquare, 
  FolderKanban, 
  Calendar, 
  BarChart3, 
  Users, 
  Settings,
  Bell,
  Search,
  Plus
} from "lucide-react";
import { Button } from "./page/button";

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { id: "tasks", label: "Công việc", icon: CheckSquare },
    { id: "projects", label: "Dự án", icon: FolderKanban },
    { id: "calendar", label: "Lịch", icon: Calendar },
    { id: "reports", label: "Báo cáo", icon: BarChart3 },
    { id: "team", label: "Nhóm", icon: Users },
  ];

  return (
    <aside className="w-64 bg-neutral-900 text-white flex flex-col h-screen">
      <div className="p-4 border-b border-neutral-800">
        <h1 className="text-white mb-1">10 điểm</h1>
        <p className="text-xs text-neutral-400">Quản lý công việc thông minh</p>
      </div>

      <div className="p-4">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="size-4 mr-2" />
          Tạo công việc mới
        </Button>
      </div>

      <nav className="flex-1 px-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                currentView === item.id
                  ? "bg-blue-600 text-white"
                  : "text-neutral-300 hover:bg-neutral-800"
              }`}
            >
              <Icon className="size-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <button
          onClick={() => onViewChange("settings")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
            currentView === "settings"
              ? "bg-blue-600 text-white"
              : "text-neutral-300 hover:bg-neutral-800"
          }`}
        >
          <Settings className="size-5" />
          <span>Cài đặt</span>
        </button>
      </div>
    </aside>
  );
}
