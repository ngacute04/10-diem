import { useState } from "react";
import { Card, CardContent, CardHeader } from "./page/card";
import { Badge } from "./page/badge";
import { Button } from "./page/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./page/tabs";
import { Plus, MoreVertical, Calendar, Paperclip, MessageSquare, User } from "lucide-react";
import { TaskDetail } from "./TaskDetail";
import { AddTaskModal } from "./AddTaskModal";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  deadline: string;
  assignee: string;
  comments: number;
  attachments: number;
  status: "todo" | "doing" | "done";
}

export function TaskManagement() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Thiết kế giao diện Dashboard",
      description: "Tạo mockup và prototype cho trang dashboard",
      priority: "high",
      deadline: "30/11/2025",
      assignee: "NA",
      comments: 3,
      attachments: 2,
      status: "todo"
    },
    {
      id: 2,
      title: "Review code Backend API",
      description: "Kiểm tra và review các API endpoints mới",
      priority: "medium",
      deadline: "01/12/2025",
      assignee: "PT",
      comments: 5,
      attachments: 0,
      status: "todo"
    },
    {
      id: 3,
      title: "Implement Login feature",
      description: "Xây dựng tính năng đăng nhập với JWT",
      priority: "high",
      deadline: "29/11/2025",
      assignee: "NA",
      comments: 2,
      attachments: 1,
      status: "doing"
    },
    {
      id: 4,
      title: "Viết Unit Tests",
      description: "Viết test cases cho module payment",
      priority: "medium",
      deadline: "02/12/2025",
      assignee: "LM",
      comments: 0,
      attachments: 0,
      status: "doing"
    },
    {
      id: 5,
      title: "Setup CI/CD Pipeline",
      description: "Cấu hình GitHub Actions cho auto deploy",
      priority: "low",
      deadline: "28/11/2025",
      assignee: "PT",
      comments: 1,
      attachments: 3,
      status: "done"
    },
  ]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleSaveTask = (updatedTask: Task) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  const handleAddTask = (newTask: Omit<Task, "id" | "comments" | "attachments">) => {
    const task: Task = {
      ...newTask,
      id: Math.max(0, ...tasks.map(t => t.id)) + 1,
      comments: 0,
      attachments: 0,
    };
    setTasks([...tasks, task]);
  };

  const renderTaskCard = (task: Task) => (
    <Card 
      key={task.id} 
      className="mb-3 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => handleTaskClick(task)}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <Badge
            variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}
            className="text-xs"
          >
            {task.priority === "high" ? "Cao" : task.priority === "medium" ? "Trung bình" : "Thấp"}
          </Badge>
          <Button variant="ghost" size="icon" className="size-6 -mr-2">
            <MoreVertical className="size-4" />
          </Button>
        </div>

        <div>
          <h4 className="text-neutral-900 mb-1">{task.title}</h4>
          <p className="text-sm text-neutral-600">{task.description}</p>
        </div>

        <div className="flex items-center gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-1">
            <Calendar className="size-3" />
            {task.deadline}
          </div>
          {task.attachments > 0 && (
            <div className="flex items-center gap-1">
              <Paperclip className="size-3" />
              {task.attachments}
            </div>
          )}
          {task.comments > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="size-3" />
              {task.comments}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
              {task.assignee}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-neutral-900 mb-1">Quản lý công việc</h2>
          <p className="text-neutral-600">Theo dõi và quản lý tất cả công việc của bạn</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddModal(true)}>
          <Plus className="size-4 mr-2" />
          Thêm công việc
        </Button>
      </div>

      <Tabs defaultValue="kanban" className="space-y-4">
        <TabsList>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="list">Danh sách</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-neutral-100 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="size-2 bg-neutral-500 rounded-full" />
                  <span className="text-neutral-900">Cần làm</span>
                  <Badge variant="secondary" className="ml-2">
                    {tasks.filter(t => t.status === "todo").length}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="size-6">
                  <Plus className="size-4" />
                </Button>
              </div>
              {tasks.filter(t => t.status === "todo").map(renderTaskCard)}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="size-2 bg-blue-500 rounded-full" />
                  <span className="text-neutral-900">Đang làm</span>
                  <Badge variant="secondary" className="ml-2">
                    {tasks.filter(t => t.status === "doing").length}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="size-6">
                  <Plus className="size-4" />
                </Button>
              </div>
              {tasks.filter(t => t.status === "doing").map(renderTaskCard)}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="size-2 bg-green-500 rounded-full" />
                  <span className="text-neutral-900">Hoàn thành</span>
                  <Badge variant="secondary" className="ml-2">
                    {tasks.filter(t => t.status === "done").length}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="size-6">
                  <Plus className="size-4" />
                </Button>
              </div>
              {tasks.filter(t => t.status === "done").map(renderTaskCard)}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                {tasks.map(task => (
                  <div key={task.id} className="flex items-center gap-4 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                    <input type="checkbox" checked={task.status === "done"} readOnly />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-neutral-900">{task.title}</h4>
                        <Badge
                          variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {task.priority === "high" ? "Cao" : task.priority === "medium" ? "TBình" : "Thấp"}
                        </Badge>
                      </div>
                      <p className="text-sm text-neutral-600">{task.description}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-neutral-500">
                      <span>{task.deadline}</span>
                      <div className="size-8 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                        {task.assignee}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedTask && (
        <TaskDetail
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
        />
      )}

      {showAddModal && (
        <AddTaskModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTask}
        />
      )}
    </div>
  );
}