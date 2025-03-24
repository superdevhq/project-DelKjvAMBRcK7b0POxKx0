
import { Navbar } from "@/components/layout/Navbar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "lucide-react";

export default function Analytics() {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1">
        <Navbar />
        <main className="flex-1 p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-8">Analytics</h1>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="settings-tabs mb-6">
              <TabsTrigger value="overview" className="settings-tab">Overview</TabsTrigger>
              <TabsTrigger value="comments" className="settings-tab">Comments</TabsTrigger>
              <TabsTrigger value="performance" className="settings-tab">Performance</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
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
                <Card>
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
                <Card>
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

              <Card>
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
              <Card>
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
                <Card>
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
                <Card>
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
              <Card>
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
                <Card>
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
                <Card>
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
                <Card>
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
    </div>
  );
}
