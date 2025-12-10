import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { Dashboard } from "./components/Dashboard";
import { TaskManagement } from "./components/TaskManagement";
import { ProjectManagement } from "./components/ProjectManagement";
import { CalendarView } from "./components/CalendarView";
import { ReportsView } from "./components/ReportsView";
import { TeamCollaboration } from "./components/TeamCollaboration";
import { SettingsView } from "./components/SettingsView";
import { WelcomePage } from "./components/WelcomePage";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authPage, setAuthPage] = useState<"welcome" | "login" | "register" | "forgot-password">("welcome");
  const [currentView, setCurrentView] = useState("dashboard");

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView("dashboard");
  };

  const handleAddTask = () => {
    // Navigate to tasks view
    setCurrentView("tasks");
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "tasks":
        return <TaskManagement />;
      case "projects":
        return <ProjectManagement />;
      case "calendar":
        return <CalendarView />;
      case "reports":
        return <ReportsView />;
      case "team":
        return <TeamCollaboration />;
      case "settings":
        return <SettingsView onLogout={() => setIsAuthenticated(false)} />;
      default:
        return <Dashboard />;
    }
  };

  // Show authentication pages if not logged in
  if (!isAuthenticated) {
    switch (authPage) {
      case "welcome":
        return <WelcomePage onNavigate={setAuthPage} />;
      case "login":
        return <LoginPage onNavigate={setAuthPage} onLogin={handleLogin} />;
      case "register":
        return <RegisterPage onNavigate={setAuthPage} />;
      case "forgot-password":
        return <ForgotPasswordPage onNavigate={setAuthPage} />;
      default:
        return <WelcomePage onNavigate={setAuthPage} />;
    }
  }

  // Show main app if authenticated
  return (
    <div className="flex h-screen bg-neutral-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onAddTask={handleAddTask} />
        <main className="flex-1 overflow-y-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}