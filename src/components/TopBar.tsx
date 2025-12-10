import { Search, Bell, User, Plus } from "lucide-react";
import { Input } from "./page/input";
import { Button } from "./page/button";
import { Avatar, AvatarFallback } from "./page/avatar";
import { useState } from "react";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { SearchModal } from "./SearchModal";

interface TopBarProps {
  onAddTask?: () => void;
}

export function TopBar({ onAddTask }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-neutral-200 bg-white flex items-center justify-between px-6">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
            <Input
              placeholder="Tìm kiếm công việc, dự án..."
              className="pl-10 cursor-pointer"
              onFocus={() => setShowSearch(true)}
              readOnly
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={onAddTask}>
            <Plus className="size-4 mr-2" />
            Thêm công việc
          </Button>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="size-5" />
              <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full" />
            </Button>

            <NotificationsDropdown
              isOpen={showNotifications}
              onClose={() => setShowNotifications(false)}
            />
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-neutral-200">
            <div className="text-right">
              <p className="text-sm text-neutral-900">Lê Quang Phúc</p>
              <p className="text-xs text-neutral-500">dev and mõm</p>
            </div>
            <Avatar>
              <AvatarFallback className="bg-blue-600 text-white">
                QP
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <SearchModal isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </>
  );
}