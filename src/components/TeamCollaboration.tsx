import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./page/card";
import { Input } from "./page/input";
import { Button } from "./page/button";
import { Avatar, AvatarFallback } from "./page/avatar";
import { Badge } from "./page/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./page/tabs";
import { Send, Paperclip, Smile, AtSign, MessageSquare, Users, Bell } from "lucide-react";
import { TeamMemberModal } from "./TeamMemberModal";

export function TeamCollaboration() {
  const [message, setMessage] = useState("");
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const teamMembers = [
    { 
      id: "QP", 
      name: "Lê Quang Phúc", 
      role: "Dev and mỗm", 
      avatar: "QP", 
      status: "online" as const, 
      tasks: 5,
      email: "phuc@example.com",
      phone: "0901823901",
      location: "HCM, Vietnam",
      joinDate: "01/03/2025",
      tasksCompleted: 145,
      tasksInProgress: 5,
      projects: ["Website Thương mại điện tử", "Hệ thống CRM"],
      skills: ["Project Management", "Agile", "Scrum"]
    },
    { 
      id: "PT", 
      name: "Phạm Thị B", 
      role: "Designer", 
      avatar: "PT", 
      status: "online" as const, 
      tasks: 3,
      email: "phamthib@example.com",
      phone: "0902345678",
      location: "TP.HCM, Vietnam",
      joinDate: "15/03/2023",
      tasksCompleted: 98,
      tasksInProgress: 3,
      projects: ["Website Thương mại điện tử", "Mobile App iOS"],
      skills: ["UI/UX Design", "Figma", "Adobe XD"]
    },
    { 
      id: "LM", 
      name: "Lê Minh C", 
      role: "Developer", 
      avatar: "LM", 
      status: "offline" as const, 
      tasks: 7,
      email: "leminhc@example.com",
      phone: "0903456789",
      location: "Đà Nẵng, Vietnam",
      joinDate: "10/05/2023",
      tasksCompleted: 187,
      tasksInProgress: 7,
      projects: ["Website Thương mại điện tử", "Hệ thống CRM", "Mobile App iOS"],
      skills: ["React", "Node.js", "TypeScript", "MongoDB"]
    },
    { 
      id: "HT", 
      name: "Hoàng Thị D", 
      role: "QA", 
      avatar: "HT", 
      status: "busy" as const, 
      tasks: 4,
      email: "hoangthid@example.com",
      phone: "0904567890",
      location: "Hà Nội, Vietnam",
      joinDate: "20/06/2023",
      tasksCompleted: 76,
      tasksInProgress: 4,
      projects: ["Website Thương mại điện tử"],
      skills: ["Manual Testing", "Automation Testing", "Selenium"]
    },
  ];

  const chatMessages = [
    {
      id: 1,
      user: "Phạm Thị B",
      avatar: "PT",
      message: "Mọi người xem qua bản thiết kế mới của em nhé!",
      time: "10:30",
      attachments: ["design-v2.fig"]
    },
    {
      id: 2,
      user: "Nguyễn Văn A",
      avatar: "NA",
      message: "Đã xem rồi, trông rất đẹp! @Lê Minh C anh review code phần này được không?",
      time: "10:35",
      mentions: ["Lê Minh C"]
    },
    {
      id: 3,
      user: "Lê Minh C",
      avatar: "LM",
      message: "Ok anh, em sẽ xem trong chiều nay",
      time: "10:37"
    },
    {
      id: 4,
      user: "Hoàng Thị D",
      avatar: "HT",
      message: "Team mình họp lúc 14h nhé, em đã tạo link meeting",
      time: "11:00"
    },
  ];

  const taskComments = [
    {
      id: 1,
      task: "Thiết kế UI Dashboard",
      user: "Phạm Thị B",
      avatar: "PT",
      comment: "Em đã hoàn thành phần header, mọi người xem nhé",
      time: "2 giờ trước",
      replies: 3
    },
    {
      id: 2,
      task: "Review code Backend API",
      user: "Lê Minh C",
      avatar: "LM",
      comment: "@Nguyễn Văn A anh có thể review phần authentication không?",
      time: "3 giờ trước",
      replies: 1
    },
  ];

  const notifications = [
    { id: 1, type: "mention", user: "QP", message: "đã nhắc đến bạn trong Dự án Website", time: "5 phút trước" },
    { id: 2, type: "comment", user: "PT", message: "đã bình luận trong công việc của bạn", time: "10 phút trước" },
    { id: 3, type: "assign", user: "LM", message: "đã giao công việc mới cho bạn", time: "1 giờ trước" },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-neutral-900 mb-1">Cộng tác nhóm</h2>
        <p className="text-neutral-600">Giao tiếp và làm việc cùng team</p>
      </div>

      <Tabs defaultValue="chat" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chat">Chat nhóm</TabsTrigger>
          <TabsTrigger value="comments">Bình luận</TabsTrigger>
          <TabsTrigger value="team">Thành viên</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Nhóm dự án Website</CardTitle>
                  <Badge variant="secondary">{teamMembers.filter(m => m.status === 'online').length} online</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-[400px] overflow-y-auto space-y-4 p-4 bg-neutral-50 rounded-lg">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="flex gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-blue-600 text-white text-xs">
                          {msg.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm text-neutral-900">{msg.user}</span>
                          <span className="text-xs text-neutral-500">{msg.time}</span>
                        </div>
                        <p className="text-sm text-neutral-700 bg-white p-3 rounded-lg">
                          {msg.message}
                        </p>
                        {msg.attachments && (
                          <div className="mt-2 flex gap-2">
                            {msg.attachments.map((file, idx) => (
                              <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded text-xs">
                                <Paperclip className="size-3" />
                                {file}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    placeholder="Nhập tin nhắn... (@để tag người)"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="ghost" size="icon">
                    <Paperclip className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Smile className="size-4" />
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Send className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Thành viên online</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="size-10">
                          <AvatarFallback className="bg-blue-600 text-white text-xs">
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-white ${
                          member.status === 'online' ? 'bg-green-500' : 
                          member.status === 'away' ? 'bg-yellow-500' : 'bg-neutral-300'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-neutral-900">{member.name.split(" ").slice(-2).join(" ")}</p>
                        <p className="text-xs text-neutral-500">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bình luận công việc</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {taskComments.map((comment) => (
                  <div key={comment.id} className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-blue-600 text-white text-xs">
                          {comment.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="text-sm text-neutral-900">{comment.user}</span>
                            <span className="text-xs text-neutral-500 ml-2">{comment.time}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {comment.task}
                          </Badge>
                        </div>
                        <p className="text-sm text-neutral-700 mb-3">{comment.comment}</p>
                        <div className="flex items-center gap-4 text-xs text-neutral-500">
                          <button className="flex items-center gap-1 hover:text-blue-600">
                            <MessageSquare className="size-3" />
                            {comment.replies} trả lời
                          </button>
                          <button className="hover:text-blue-600">Trả lời</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member) => (
              <Card key={member.id}>
                <CardContent className="p-6 text-center">
                  <div className="relative inline-block mb-4">
                    <Avatar className="size-16">
                      <AvatarFallback className="bg-blue-600 text-white">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute bottom-0 right-0 size-4 rounded-full border-2 border-white ${
                      member.status === 'online' ? 'bg-green-500' : 
                      member.status === 'away' ? 'bg-yellow-500' : 'bg-neutral-300'
                    }`} />
                  </div>
                  <p className="text-sm text-neutral-900 mb-1">{member.name}</p>
                  <p className="text-xs text-neutral-500 mb-3">{member.role}</p>
                  <div className="pt-3 border-t border-neutral-200">
                    <p className="text-xs text-neutral-500 mb-1">Công việc đang làm</p>
                    <p className="text-sm text-neutral-900">{member.tasks} tasks</p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedMember(member)}>
                      <MessageSquare className="size-3 mr-1" />
                      Chat
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <AtSign className="size-3 mr-1" />
                      Tag
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông báo gần đây</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="flex items-start gap-3 p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
                    <div className={`p-2 rounded-lg ${
                      notif.type === 'mention' ? 'bg-blue-50' :
                      notif.type === 'comment' ? 'bg-green-50' : 'bg-purple-50'
                    }`}>
                      {notif.type === 'mention' ? <AtSign className="size-4 text-blue-600" /> :
                       notif.type === 'comment' ? <MessageSquare className="size-4 text-green-600" /> :
                       <Bell className="size-4 text-purple-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-neutral-900">
                        <span className="font-medium">{notif.user}</span> {notif.message}
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {selectedMember && <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
    </div>
  );
}