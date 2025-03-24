
import { Link, useLocation } from "react-router-dom";
import { BarChart, MessageSquare, Settings, LayoutDashboard, Target, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();
  
  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/",
      active: location.pathname === "/",
    },
    {
      label: "Campaigns",
      icon: Target,
      href: "/campaigns",
      active: location.pathname === "/campaigns",
    },
    {
      label: "Comments",
      icon: MessageSquare,
      href: "/comments",
      active: location.pathname === "/comments",
    },
    {
      label: "Analytics",
      icon: BarChart,
      href: "/analytics",
      active: location.pathname === "/analytics",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: location.pathname === "/settings",
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-5">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">FB Comment AI</h2>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 py-4">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
                route.active ? "bg-primary/10 text-primary" : "text-muted-foreground"
              )}
            >
              <route.icon className="h-5 w-5" />
              <span>{route.label}</span>
            </Link>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export function SidebarToggle() {
  return (
    <SidebarTrigger asChild>
      <Button variant="outline" size="icon" className="fixed left-4 top-4 z-50 lg:hidden">
        <Menu className="h-5 w-5" />
      </Button>
    </SidebarTrigger>
  );
}
