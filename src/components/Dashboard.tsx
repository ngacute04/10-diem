import { Card, CardContent, CardHeader, CardTitle } from "./page/card";
import { Progress } from "./page/progress";
import { Badge } from "./page/badge";
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from "lucide-react";
import { useState } from "react";
import { TaskDetail } from "./TaskDetail";

export function Dashboard() {
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const stats = [
    {
      title: "Hoàn thành",
      value: "24",
      change: "+12%",
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      title: "Đang làm",
      value: "8",
      change: "+3",
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Quá hạn",
      value: "3",
      change: "-2",
      icon: AlertCircle,
      color: "text-red-600",
      bg: "bg-red-50"
    },
    {
      title: "Năng suất",
      value: "87%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
  ];

  const tasks = [
    { id: 1, title: "Thiết kế UI Dashboard", project: "Website mới", priority: "high", deadline: "Hôm nay", progress: 75 },
    { id: 2, title: "Review code Backend API", project: "Mobile App", priority: "medium", deadline: "Ngày mai", progress: 50 },
    { id: 3, title: "Họp với khách hàng", project: "Dự án A", priority: "high", deadline: "14:00", progress: 0 },
    { id: 4, title: "Viết tài liệu kỹ thuật", project: "Website mới", priority: "low", deadline: "3 ngày", progress: 30 },
  ];

  const projects = [
    { name: "Website mới", tasks: 12, completed: 8, progress: 67 },
    { name: "Mobile App", tasks: 20, completed: 15, progress: 75 },
    { name: "Dự án A", tasks: 8, completed: 3, progress: 38 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-neutral-900 mb-1">Xin chào, Lê Quang Phúc</h2>
        <p className="text-neutral-600">Đây là tổng quan công việc của bạn hôm nay</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-neutral-500 mb-1">{stat.title}</p>
                    <p className="text-neutral-900">{stat.value}</p>
                    <p className={`text-xs mt-1 ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bg}`}>
                    <Icon className={`size-5 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Công việc gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="flex items-start gap-4 p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedTask({ ...task, description: `Mô tả chi tiết cho ${task.title}`, assignee: "NA" })}
                >
                  <input type="checkbox" className="mt-1" onClick={(e) => e.stopPropagation()} />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-neutral-900">{task.title}</p>
                        <p className="text-sm text-neutral-500">{task.project}</p>
                      </div>
                      <Badge
                        variant={task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"}
                      >
                        {task.priority === "high" ? "Cao" : task.priority === "medium" ? "Trung bình" : "Thấp"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <Progress value={task.progress} className="h-2" />
                      </div>
                      <span className="text-xs text-neutral-500">{task.deadline}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dự án đang chạy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-neutral-900">{project.name}</p>
                    <span className="text-sm text-neutral-500">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} />
                  <p className="text-xs text-neutral-500">
                    {project.completed}/{project.tasks} công việc hoàn thành
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedTask && (
        <TaskDetail
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}