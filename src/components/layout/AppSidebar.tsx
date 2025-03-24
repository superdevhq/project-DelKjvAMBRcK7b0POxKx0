
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart, MessageSquare, Settings, LayoutDashboard, List, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  
  const routes = [
    {
      section: "MAIN",
      items: [
        {
          label: "Dashboard",
          icon: LayoutDashboard,
          href: "/",
          active: location.pathname === "/",
        },
        {
          label: "Ad Campaigns",
          icon: List,
          href: "/campaigns",
          active: location.pathname === "/campaigns",
        },
        {
          label: "Settings",
          icon: Settings,
          href: "/settings",
          active: location.pathname === "/settings",
        }
      ]
    }
  ];

  return (
    <>
      <div className={cn(
        "sidebar transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}>
        <div className="sidebar-header">
          <div className={cn(
            "sidebar-logo",
            collapsed ? "justify-center" : "justify-start"
          )}>
            <Star className="h-6 w-6 text-primary" />
            {!collapsed && <span>CommentAI</span>}
          </div>
        </div>
        
        <div className="flex flex-col h-[calc(100%-8rem)]">
          {routes.map((section, i) => (
            <div key={i} className="flex-1">
              {!collapsed && <div className="sidebar-section">{section.section}</div>}
              <nav className="space-y-1 px-2">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "sidebar-link",
                      collapsed ? "justify-center" : "",
                      item.active && "active"
                    )}
                    title={collapsed ? item.label : ""}
                  >
                    <item.icon className={cn("sidebar-icon")} />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
        
        <div className="sidebar-footer">
          {!collapsed ? (
            <div className="flex flex-col space-y-1">
              <div className="text-sm font-medium">Free plan</div>
              <Link to="/settings" className="text-xs text-primary hover:underline">
                Upgrade for advanced features
              </Link>
            </div>
          ) : (
            <div className="flex justify-center">
              <Star className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-[-12px] top-[72px] h-6 w-6 rounded-full border bg-background shadow-md"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </div>
      
      {/* Mobile overlay */}
      <div className="md:hidden">
        {/* Mobile sidebar toggle would go here */}
      </div>
    </>
  );
}
