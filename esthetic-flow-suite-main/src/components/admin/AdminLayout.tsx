import { useState, ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar, Home, User, Users, Settings, Image, LogOut, Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import NotificationCenter from "./NotificationCenter";

interface AdminLayoutProps {
  children: ReactNode;
}

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { toast } = useToast();
  const { logout, profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  const navItems: NavItem[] = [
    { label: "Dashboard", icon: Home, href: "/admin" },
    { label: "Agenda", icon: Calendar, href: "/admin/calendar" },
    { label: "Clientes", icon: Users, href: "/admin/clients" },
    { label: "Serviços", icon: Image, href: "/admin/services" },
    { label: "Configurações", icon: Settings, href: "/admin/settings" },
  ];
  
  const isCurrentPage = (href: string) => {
    if (href === "/admin" && location.pathname === "/admin") {
      return true;
    }
    return location.pathname === href;
  };
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Handle appointment notification click
  const handleAppointmentClick = (appointmentId: string) => {
    navigate("/admin/calendar");
    toast({
      title: "Navegando para agendamento",
      description: "Redirecionando para os detalhes do agendamento.",
    });
  };

  return (
    <div className="flex min-h-screen bg-beige-light/30">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0 border-r bg-white">
        <div className="flex items-center justify-center h-16 border-b">
          <Link to="/" className="text-xl font-bold text-gold-dark">Realle</Link>
        </div>
        
        <nav className="flex flex-col flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                isCurrentPage(item.href)
                  ? "bg-gold text-white"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex flex-col md:ml-64 flex-1">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden mr-2"
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold md:hidden">Realle</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <NotificationCenter onAppointmentClick={handleAppointmentClick} />
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="font-medium hidden sm:inline-block">
                    {profile?.nome || "Admin"}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="space-y-2">
                  <Link 
                    to="/admin/profile" 
                    className="flex items-center p-2 rounded-md hover:bg-muted transition-colors text-sm"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Meu Perfil
                  </Link>
                  <Link 
                    to="/admin/settings" 
                    className="flex items-center p-2 rounded-md hover:bg-muted transition-colors text-sm"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </Link>
                  <hr />
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-sm p-2 h-auto font-normal"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>
        
        {/* Mobile Navigation */}
        {isMobileNavOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setIsMobileNavOpen(false)}>
            <div 
              className="fixed inset-y-0 left-0 w-64 bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between h-16 border-b px-4">
                <Link to="/" className="text-xl font-bold text-gold-dark">Realle</Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <nav className="flex flex-col py-6 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                      isCurrentPage(item.href)
                        ? "bg-gold text-white"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                ))}
              </nav>
              
              <div className="p-4 border-t">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Page Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
