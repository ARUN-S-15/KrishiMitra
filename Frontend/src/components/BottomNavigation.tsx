import { Home, Info, MessageCircle, Users, Wrench, UserPlus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Info, label: "Info", path: "/information" },
    { icon: MessageCircle, label: "Ask", path: "/chatbot" },
    { icon: Wrench, label: "Tractor", path: "/equipments" },
    { icon: Users, label: "Community", path: "/community" },
    { icon: UserPlus, label: "Labour", path: "/labour" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border shadow-float">
      <div className="grid grid-cols-6 gap-1 px-2 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Button
              key={item.path}
              variant="ghost"
              size="sm"
              onClick={() => navigate(item.path)}
              className={`flex flex-col gap-1 h-auto py-3 px-2 rounded-lg transition-all duration-300 ${
                isActive 
                  ? "bg-primary text-primary-foreground shadow-card" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "animate-float" : ""}`} />
              <span className="text-xs font-medium leading-none">
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;