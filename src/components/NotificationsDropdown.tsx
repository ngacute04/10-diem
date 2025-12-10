import { useState } from "react";
import { Bell, CheckCircle2, MessageSquare, UserPlus, AlertCircle, Calendar, X } from "lucide-react";
import { Button } from "./page/button";
import { Badge } from "./page/badge";

interface Notification {
  id: number;
  type: "task" | "comment" | "mention" | "deadline" | "team";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "task",
      title: "Công việc mới được giao",
      message: "Bạn được giao công việc 'Review code Backend API'",
      time: "5 phút trước",
      read: false,
    },
    {
      id: 2,
      type: "comment",
      title: "Bình luận mới",
      message: "Phạm Thị B đã bình luận trong công việc 'Thiết kế UI Dashboard'",
      time: "1 giờ trước",
      read: false,
    },
    {
      id: 3,
      type: "mention",
      title: "Được nhắc đến",
      message: "Lê Văn C đã tag bạn trong dự án 'Website mới'",
      time: "2 giờ trước",
      read: false,
    },
    {
      id: 4,
      type: "deadline",
      title: "Deadline sắp tới",
      message: "Công việc 'Implement Login feature' sẽ đến hạn trong 1 ngày",
      time: "3 giờ trước",
      read: true,
    },
    {
      id: 5,
      type: "team",
      title: "Thành viên mới",
      message: "Trần Hoàng D đã tham gia dự án 'Mobile App'",
      time: "1 ngày trước",
      read: true,
    },
    {
      id: 6,
      type: "task",
      title: "Công việc hoàn thành",
      message: "Công việc 'Setup CI/CD Pipeline' đã được đánh dấu hoàn thành",
      time: "2 ngày trước",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "task":
        return <CheckCircle2 className="size-5 text-green-600" />;
      case "comment":
        return <MessageSquare className="size-5 text-blue-600" />;
      case "mention":
        return <MessageSquare className="size-5 text-purple-600" />;
      case "deadline":
        return <AlertCircle className="size-5 text-orange-600" />;
      case "team":
        return <UserPlus className="size-5 text-indigo-600" />;
      default:
        return <Bell className="size-5 text-neutral-600" />;
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />
      
      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-neutral-200 z-50 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <h3 className="text-neutral-900">Thông báo</h3>
              {unreadCount > 0 && (
                <Badge className="bg-red-500">{unreadCount}</Badge>
              )}
            </div>
            <Button variant="ghost" size="icon" className="size-8" onClick={onClose}>
              <X className="size-4" />
            </Button>
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-600 hover:text-blue-700 h-7 px-2"
              onClick={markAllAsRead}
            >
              Đánh dấu tất cả đã đọc
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="max-h-[500px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="size-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-neutral-500">Không có thông báo mới</p>
            </div>
          ) : (
            <div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-neutral-100 hover:bg-neutral-50 transition-colors cursor-pointer group ${
                    !notification.read ? "bg-blue-50/50" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`size-10 rounded-lg flex items-center justify-center ${
                        notification.type === "task" ? "bg-green-100" :
                        notification.type === "comment" ? "bg-blue-100" :
                        notification.type === "mention" ? "bg-purple-100" :
                        notification.type === "deadline" ? "bg-orange-100" :
                        "bg-indigo-100"
                      }`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className={`text-sm ${!notification.read ? "font-medium text-neutral-900" : "text-neutral-700"}`}>
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="size-2 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
                        )}
                      </div>
                      <p className="text-sm text-neutral-600 mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-500">{notification.time}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-6 px-2 text-red-600 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-neutral-200 bg-neutral-50">
            <Button 
              variant="ghost" 
              className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              Xem tất cả thông báo
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
