import { Card, CardContent, CardHeader, CardTitle } from "./page/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./page/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Award, Target } from "lucide-react";

export function ReportsView() {
  const weeklyData = [
    { day: "T2", completed: 4, inProgress: 3, todo: 5 },
    { day: "T3", completed: 6, inProgress: 2, todo: 4 },
    { day: "T4", completed: 5, inProgress: 4, todo: 3 },
    { day: "T5", completed: 8, inProgress: 2, todo: 2 },
    { day: "T6", completed: 7, inProgress: 3, todo: 4 },
    { day: "T7", completed: 3, inProgress: 1, todo: 2 },
    { day: "CN", completed: 2, inProgress: 0, todo: 1 },
  ];

  const productivityData = [
    { month: "T7", productivity: 65 },
    { month: "T8", productivity: 72 },
    { month: "T9", productivity: 78 },
    { month: "T10", productivity: 85 },
    { month: "T11", productivity: 87 },
  ];

  const taskDistribution = [
    { name: "Hoàn thành", value: 45, color: "#10b981" },
    { name: "Đang làm", value: 20, color: "#3b82f6" },
    { name: "Chưa làm", value: 15, color: "#6b7280" },
    { name: "Quá hạn", value: 10, color: "#ef4444" },
  ];

  const timeData = [
    { category: "Development", hours: 32 },
    { category: "Meetings", hours: 12 },
    { category: "Design", hours: 18 },
    { category: "Planning", hours: 8 },
    { category: "Review", hours: 10 },
  ];

  const stats = [
    { title: "Năng suất trung bình", value: "87%", change: "+5%", trend: "up", icon: TrendingUp },
    { title: "Công việc hoàn thành", value: "156", change: "+12", trend: "up", icon: Award },
    { title: "Tỷ lệ đúng hạn", value: "92%", change: "-2%", trend: "down", icon: Target },
    { title: "Giờ làm việc", value: "168h", change: "+8h", trend: "up", icon: TrendingUp },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-neutral-900 mb-1">Báo cáo & Phân tích</h2>
        <p className="text-neutral-600">Theo dõi năng suất và hiệu quả làm việc</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-2 rounded-lg ${stat.trend === 'up' ? 'bg-green-50' : 'bg-red-50'}`}>
                    <Icon className={`size-5 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                  <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm text-neutral-500 mb-1">{stat.title}</p>
                <p className="text-neutral-900">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="time">Thời gian</TabsTrigger>
          <TabsTrigger value="performance">Hiệu suất</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Công việc theo tuần</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#10b981" name="Hoàn thành" />
                    <Bar dataKey="inProgress" fill="#3b82f6" name="Đang làm" />
                    <Bar dataKey="todo" fill="#6b7280" name="Chưa làm" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Phân bố công việc</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={taskDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {taskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="time" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Phân bổ thời gian</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={timeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="category" type="category" width={100} />
                    <Tooltip />
                    <Bar dataKey="hours" fill="#3b82f6" name="Giờ" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nhật ký làm việc</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "30/11/2025", hours: "8h 30m", tasks: 6, productivity: "High" },
                    { date: "29/11/2025", hours: "7h 45m", tasks: 5, productivity: "High" },
                    { date: "28/11/2025", hours: "6h 15m", tasks: 4, productivity: "Medium" },
                    { date: "27/11/2025", hours: "8h 00m", tasks: 7, productivity: "High" },
                    { date: "26/11/2025", hours: "5h 30m", tasks: 3, productivity: "Low" },
                  ].map((log, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                      <div>
                        <p className="text-sm text-neutral-900">{log.date}</p>
                        <p className="text-xs text-neutral-500">{log.tasks} công việc</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-neutral-900">{log.hours}</p>
                        <p className={`text-xs ${
                          log.productivity === 'High' ? 'text-green-600' : 
                          log.productivity === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {log.productivity === 'High' ? 'Cao' : log.productivity === 'Medium' ? 'TB' : 'Thấp'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Xu hướng năng suất</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={productivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="productivity" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Năng suất (%)"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-neutral-500 mb-2">Gợi ý cải thiện</p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li>• Tập trung vào công việc ưu tiên cao</li>
                  <li>• Giảm số lượng meeting</li>
                  <li>• Chia nhỏ công việc lớn</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-neutral-500 mb-2">Điểm mạnh</p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li>• Tỷ lệ hoàn thành cao</li>
                  <li>• Đúng deadline</li>
                  <li>• Năng suất tăng đều</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-neutral-500 mb-2">Cần cải thiện</p>
                <ul className="space-y-2 text-sm text-neutral-700">
                  <li>• Quản lý thời gian meeting</li>
                  <li>• Giảm công việc quá hạn</li>
                  <li>• Cân bằng workload</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
