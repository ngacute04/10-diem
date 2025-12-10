import { Card, CardContent, CardHeader, CardTitle } from "./page/card";
import { Progress } from "./page/progress";
import { Badge } from "./page/badge";
import { Button } from "./page/button";
import { Plus, Users, Calendar, FileText, MoreVertical } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./page/tabs";
import { useState } from "react";
import { AddProjectModal } from "./AddProjectModal";

export function ProjectManagement() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Thương mại điện tử",
      description: "Xây dựng website bán hàng online với đầy đủ tính năng",
      progress: 67,
      status: "active",
      deadline: "15/01/2026",
      members: ["NA", "PT", "LM", "HT"],
      tasks: { total: 45, completed: 30 },
      color: "blue"
    },
    {
      id: 2,
      name: "Mobile App iOS",
      description: "Ứng dụng quản lý tài chính cá nhân",
      progress: 45,
      status: "active",
      deadline: "28/02/2026",
      members: ["PT", "HT"],
      tasks: { total: 32, completed: 14 },
      color: "green"
    },
    {
      id: 3,
      name: "Hệ thống CRM",
      description: "CRM quản lý khách hàng và bán hàng",
      progress: 89,
      status: "active",
      deadline: "10/12/2025",
      members: ["NA", "LM", "KT"],
      tasks: { total: 28, completed: 25 },
      color: "purple"
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddProject = (newProject: any) => {
    const project = {
      id: Math.max(0, ...projects.map(p => p.id)) + 1,
      name: newProject.name,
      description: newProject.description,
      progress: 0,
      status: newProject.status,
      deadline: newProject.endDate,
      members: newProject.team,
      tasks: { total: 0, completed: 0 },
      color: "blue"
    };
    setProjects([...projects, project]);
  };

  const timeline = [
    { date: "01/12", project: "Website TMĐT", task: "Hoàn thành UI Dashboard", status: "upcoming" },
    { date: "03/12", project: "Mobile App", task: "Release Beta version", status: "upcoming" },
    { date: "05/12", project: "Hệ thống CRM", task: "Testing và QA", status: "upcoming" },
    { date: "10/12", project: "Hệ thống CRM", task: "Bàn giao khách hàng", status: "milestone" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-neutral-900 mb-1">Quản lý dự án</h2>
          <p className="text-neutral-600">Theo dõi tiến độ và quản lý các dự án đang chạy</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddModal(true)}>
          <Plus className="size-4 mr-2" />
          Tạo dự án mới
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="team">Thành viên</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`size-3 rounded-full bg-${project.color}-500`} />
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                      </div>
                      <p className="text-sm text-neutral-600">{project.description}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreVertical className="size-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-600">Tiến độ</span>
                      <span className="text-sm text-neutral-900">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-neutral-500 mb-1">Công việc</p>
                      <p className="text-neutral-900">
                        {project.tasks.completed}/{project.tasks.total}
                      </p>
                    </div>
                    <div>
                      <p className="text-neutral-500 mb-1">Deadline</p>
                      <p className="text-neutral-900">{project.deadline}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                    <div className="flex -space-x-2">
                      {project.members.map((member, idx) => (
                        <div
                          key={idx}
                          className="size-8 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center border-2 border-white"
                        >
                          {member}
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm">
                      Chi tiết
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Timeline dự án</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeline.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`size-4 rounded-full ${item.status === 'milestone' ? 'bg-yellow-500' : 'bg-blue-500'} border-4 border-blue-100`} />
                      {idx < timeline.length - 1 && (
                        <div className="w-0.5 h-12 bg-neutral-200 my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="text-sm text-neutral-900">{item.task}</p>
                          <p className="text-xs text-neutral-500">{item.project}</p>
                        </div>
                        <Badge variant="outline">{item.date}</Badge>
                      </div>
                      {item.status === 'milestone' && (
                        <Badge variant="default" className="mt-2 bg-yellow-500">
                          Milestone
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Nguyễn Văn A", "Phạm Thị B", "Lê Minh C", "Hoàng Thị D", "Trần Văn E"].map((name, idx) => (
              <Card key={idx}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      {name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <p className="text-neutral-900">{name}</p>
                      <p className="text-sm text-neutral-500">
                        {["Developer", "Designer", "PM", "QA", "Developer"][idx]}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <p className="text-xs text-neutral-500 mb-1">Công việc đang làm</p>
                    <p className="text-sm text-neutral-900">{Math.floor(Math.random() * 5) + 2} tasks</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {showAddModal && (
        <AddProjectModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProject}
        />
      )}
    </div>
  );
}