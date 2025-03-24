
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sidebarVariants = cva(
  "fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col bg-background shadow-lg transition-transform duration-300 ease-in-out",
  {
    variants: {
      collapsed: {
        true: "translate-x-[-100%]",
        false: "translate-x-0",
      },
    },
    defaultVariants: {
      collapsed: false,
    },
  }
);

interface SidebarContextProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = React.createContext<SidebarContextProps>({
  collapsed: false,
  setCollapsed: () => null,
});

export function useSidebar() {
  return React.useContext(SidebarContext);
}

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}

export function SidebarProvider({
  children,
  defaultCollapsed = false,
}: SidebarProviderProps) {
  const [collapsed, setCollapsed] = React.useState(defaultCollapsed);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const { collapsed } = useSidebar();

  return (
    <div
      className={cn(sidebarVariants({ collapsed }), className)}
      {...props}
    />
  );
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return <div className={cn("", className)} {...props} />;
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return <div className={cn("flex-1 overflow-auto", className)} {...props} />;
}

interface SidebarTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export function SidebarTrigger({
  className,
  asChild = false,
  ...props
}: SidebarTriggerProps) {
  const { collapsed, setCollapsed } = useSidebar();
  const Comp = asChild ? React.Fragment : "button";

  return (
    <Comp
      onClick={() => setCollapsed(!collapsed)}
      className={cn(className)}
      {...props}
    />
  );
}

// Overlay that appears when sidebar is open on mobile
export function SidebarOverlay() {
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300",
        collapsed ? "pointer-events-none opacity-0" : "opacity-100 lg:pointer-events-none lg:opacity-0"
      )}
      onClick={() => setCollapsed(true)}
    />
  );
}
