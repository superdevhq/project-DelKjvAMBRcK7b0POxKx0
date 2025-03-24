
import { Link, useLocation } from "react-router-dom";
import { BarChart, MessageSquare, Settings, LayoutDashboard, List, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const location = useLocation();
  
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
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Star className="h-6 w-6 text-primary" />
          <span>CommentAI</span>
        </div>
      </div>
      
      <div className="flex flex-col h-[calc(100%-8rem)]">
        {routes.map((section, i) => (
          <div key={i} className="flex-1">
            <div className="sidebar-section">{section.section}</div>
            <nav className="space-y-1 px-2">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "sidebar-link",
                    item.active && "active"
                  )}
                >
                  <item.icon className={cn("sidebar-icon")} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        ))}
      </div>
      
      <div className="sidebar-footer">
        <div className="flex flex-col space-y-1">
          <div className="text-sm font-medium">Free plan</div>
          <Link to="/settings" className="text-xs text-primary hover:underline">
            Upgrade for advanced features
          </Link>
        </div>
      </div>
    </div>
  );
}

export function SidebarToggle() {
  return null; // We're not using a toggle in this design
}
