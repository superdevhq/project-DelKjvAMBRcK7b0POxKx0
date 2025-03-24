
import { Navbar } from "@/components/layout/Navbar";
import { AppSidebar, SidebarToggle } from "@/components/layout/AppSidebar";
import { SidebarOverlay } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "lucide-react";

export default function Analytics() {
  return (
    <>
      <AppSidebar />
      <SidebarOverlay />
      <div className="flex min-h-screen flex-col lg:pl-[280px]">
        <SidebarToggle />
        <Navbar />
        <main className="flex-1 p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="hover:shadow-md transition-all duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Comments
                    </CardTitle>
                    <div className="rounded-full bg-primary/10 p-2">
                      <BarChart className="h-4 w-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">74</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                    <div className="mt-4 h-[80px] w-full bg-muted/50 rounded-md flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Chart placeholder</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-all duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Response Rate
                    </CardTitle>
                    <div className="rounded-full bg-primary/10 p-2">
                      <LineChart className="h-4 w-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">92%</div>
                    <p className="text-xs text-muted-foreground">
                      +5% from last month
                    </p>
                    <div className="mt-4 h-[80px] w-full bg-muted/50 rounded-md flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Chart placeholder</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-all duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Response Time
                    </CardTitle>
                    <div className="rounded-full bg-primary/10 p-2">
                      <PieChart className="h-4 w-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5.2 min</div>
                    <p className="text-xs text-muted-foreground">
                      -15% from last month
                    </p>
                    <div className="mt-4 h-[80px] w-full bg-muted/50 rounded-md flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Chart placeholder</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle>Monthly Activity</CardTitle>
                  <CardDescription>
                    Comment volume and response metrics over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/50 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Monthly activity chart placeholder</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="comments" className="space-y-6">
              <Card className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle>Comment Analytics</CardTitle>
                  <CardDescription>
                    Detailed metrics about comment engagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/50 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Comment analytics chart placeholder</p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <CardTitle>Comment Sentiment</CardTitle>
                    <CardDescription>
                      Analysis of comment sentiment over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full bg-muted/50 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Sentiment chart placeholder</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <CardTitle>Comment Categories</CardTitle>
                    <CardDescription>
                      Distribution of comment types
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] w-full bg-muted/50 rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Categories chart placeholder</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="performance" className="space-y-6">
              <Card className="hover:shadow-md transition-all duration-200">
                <CardHeader>
                  <CardTitle>AI Performance</CardTitle>
                  <CardDescription>
                    Metrics on AI response quality and efficiency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full bg-muted/50 rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">AI performance chart placeholder</p>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="hover:shadow-md transition-all duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Response Quality</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4.8/5.0</div>
                    <p className="text-xs text-muted-foreground">
                      Based on automated sentiment analysis
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-all duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Success Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">98.5%</div>
                    <p className="text-xs text-muted-foreground">
                      Responses successfully delivered
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-all duration-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Processing Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1.2s</div>
                    <p className="text-xs text-muted-foreground">
                      Average AI generation time
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}
