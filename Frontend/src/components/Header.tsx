import { Bell, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌱</span>
          <div>
            <h1 className="text-lg font-semibold text-primary">Welcome, Farmer</h1>
            <p className="text-sm text-muted-foreground">Let's grow together</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-secondary-bright text-xs rounded-full flex items-center justify-center text-secondary-foreground font-medium">
              3
            </span>
          </Button>
          
          <Avatar 
            className="h-9 w-9 cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300" 
            onClick={() => navigate('/profile')}
          >
            <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;