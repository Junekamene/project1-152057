import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, BarChart3, Users, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (isAuthPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  const navItems = [
    { path: "/dashboard", icon: Shield, label: "Detection" },
    { path: "/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/community", icon: Users, label: "Community" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-cyber-blue" />
              <span className="text-xl font-bold text-primary">PhishGuard AI</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={isHomePage ? "/login" : item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {!isHomePage && (
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;