import { useState } from "react";
import { Calendar } from "./page/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "./page/card";
import { Badge } from "./page/badge";
import { Button } from "./page/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./page/tabs";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { AddEventModal } from "./AddEventModal";

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);

  const [events, setEvents] = useState([
    { id: 1, title: "Họp với khách hàng", time: "09:00 - 10:00", date: "30/11/2025", type: "meeting", color: "blue" },
    { id: 2, title: "Deadline: Thiết kế UI", time: "17:00", date: "30/11/2025", type: "deadline", color: "red" },
    { id: 3, title: "Review code", time: "14:00 - 15:30", date: "01/12/2025", type: "task", color: "green" },
    { id: 4, title: "Sprint Planning", time: "10:00 - 11:00", date: "02/12/2025", type: "meeting", color: "blue" },
    { id: 5, title: "1-on-1 meeting", time: "15:00 - 16:00", date: "30/11/2025", type: "meeting", color: "purple" },
  ]);

  const handleAddEvent = (newEvent: any) => {
    const event = {
      id: Math.max(0, ...events.map(e => e.id)) + 1,
      title: newEvent.title,
      time: newEvent.endTime ? `${newEvent.startTime} - ${newEvent.endTime}` : newEvent.startTime,
      date: newEvent.date,
      type: newEvent.type,
      color: newEvent.type === "meeting" ? "blue" : newEvent.type === "deadline" ? "red" : "green"
    };
    setEvents([...events, event]);
  };

  const todayEvents = events.filter(e => e.date === "30/11/2025");

  const daysOfWeek = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
  const weekDates = ["25", "26", "27", "28", "29", "30", "01"];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-neutral-900 mb-1">Lịch làm việc</h2>
          <p className="text-neutral-600">Quản lý lịch trình và sự kiện của bạn</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setShowAddModal(true)}>
          <Plus className="size-4 mr-2" />
          Thêm sự kiện
        </Button>
      </div>

      <Tabs defaultValue="month" className="space-y-4">
        <TabsList>
          <TabsTrigger value="day">Ngày</TabsTrigger>
          <TabsTrigger value="week">Tuần</TabsTrigger>
          <TabsTrigger value="month">Tháng</TabsTrigger>
        </TabsList>

        <TabsContent value="day" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Thứ 7, 30 tháng 11, 2025</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <ChevronLeft className="size-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {Array.from({ length: 24 }, (_, i) => (
                    <div key={i} className="flex items-start border-b border-neutral-100 py-2">
                      <span className="text-xs text-neutral-500 w-16">{i.toString().padStart(2, '0')}:00</span>
                      <div className="flex-1">
                        {todayEvents.filter(e => e.time.startsWith(i.toString().padStart(2, '0'))).map(event => (
                          <div key={event.id} className={`p-2 bg-${event.color}-50 border-l-4 border-${event.color}-500 rounded mb-2`}>
                            <p className="text-sm text-neutral-900">{event.title}</p>
                            <p className="text-xs text-neutral-500">{event.time}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )).slice(8, 19)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sự kiện hôm nay</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todayEvents.map(event => (
                    <div key={event.id} className="p-3 border border-neutral-200 rounded-lg">
                      <Badge variant={event.type === 'meeting' ? 'default' : event.type === 'deadline' ? 'destructive' : 'secondary'} className="mb-2">
                        {event.type === 'meeting' ? 'Họp' : event.type === 'deadline' ? 'Deadline' : 'Công việc'}
                      </Badge>
                      <p className="text-sm text-neutral-900 mb-1">{event.title}</p>
                      <p className="text-xs text-neutral-500">{event.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="week" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tuần 48, Tháng 11 2025</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-8 gap-px bg-neutral-200">
                <div className="bg-white p-2 text-sm text-neutral-500">Giờ</div>
                {daysOfWeek.map((day, idx) => (
                  <div key={idx} className="bg-white p-2 text-center">
                    <p className="text-xs text-neutral-500">{day}</p>
                    <p className="text-sm text-neutral-900">{weekDates[idx]}</p>
                  </div>
                ))}
                
                {Array.from({ length: 12 }, (_, i) => (
                  <>
                    <div key={`time-${i}`} className="bg-white p-2 text-xs text-neutral-500">
                      {(i + 8).toString().padStart(2, '0')}:00
                    </div>
                    {daysOfWeek.map((_, dayIdx) => (
                      <div key={`cell-${i}-${dayIdx}`} className="bg-white p-2 min-h-[60px]">
                        {dayIdx === 5 && i === 1 && (
                          <div className="p-1 bg-blue-50 border-l-2 border-blue-500 rounded text-xs">
                            Họp khách hàng
                          </div>
                        )}
                        {dayIdx === 5 && i === 7 && (
                          <div className="p-1 bg-purple-50 border-l-2 border-purple-500 rounded text-xs">
                            1-on-1 meeting
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="month" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardContent className="p-6">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sự kiện sắp tới</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {events.map(event => (
                    <div key={event.id} className="pb-3 border-b border-neutral-100 last:border-0">
                      <div className="flex items-start gap-3">
                        <div className="text-center">
                          <p className="text-xs text-neutral-500">{event.date.split('/')[0]}</p>
                          <p className="text-xs text-neutral-500">Th{event.date.split('/')[1]}</p>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-neutral-900 mb-1">{event.title}</p>
                          <p className="text-xs text-neutral-500">{event.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {showAddModal && (
        <AddEventModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddEvent}
        />
      )}
    </div>
  );
}